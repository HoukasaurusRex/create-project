/**
 * @typedef {import('./cli').options} options
 */
import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'
import execa from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'

const access = promisify(fs.access)
const copy = promisify(ncp)

/**
 * Init Git
 * @param {options} options
 * @returns {execa.ExecaReturns} Result
 */
async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }
  return result
}

/**
 * Clone Repo
 * @param {String} templatesPath Path to templates directory
 * @param {String} repo name of repo to clone
 * @returns {execa.ExecaReturns} Result
 */
async function cloneRepo(templatesPath, repo) {
  const result = await execa(
    'git',
    ['poop', `https://github.com/Pterobyte/${repo}.git`, repo.split('-')[0]],
    {
      cwd: templatesPath
    }
  )
  if (result.failed) {
    return Promise.reject(new Error(`Failed to clone ${repo}`))
  }
  return result
}

/**
 * Copy Template Files
 * @param {options} options
 * @returns {Promise<>}
 */
async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  })
}

/**
 * Clean Dir
 * @param {String} templatesPath Path to templates directory
 * @param {String} template Name of template folder to clean
 */
async function cleanDir(templatesPath, template) {
  const result = await execa('rm', ['-rf', template], {
    cwd: templatesPath
  })
  if (result.failed) {
    return Promise.reject(new Error(`Failed to clean ${templatesPath}`))
  }
  return result
}

/**
 * Create Project
 * @param {options} options
 * @returns {true}
 */
export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  }
  const currentFileUrl = new URL(`file://${__filename}`)
  const templatesPath = path.resolve(currentFileUrl.pathname, '../../templates')
  const template = options.template.toLowerCase()
  const templateDir = path.resolve(templatesPath, template)
  options.templateDirectory = templateDir
  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined
    }
  ])
  try {
    console.log(`Downloading ${chalk.green(template)} template...`)
    await cloneRepo(templatesPath, `${template}-boilerplate`)
    await access(templateDir, fs.constants.R_OK)
    await copyTemplateFiles(options)
    await tasks.run()
    await cleanDir(templatesPath, template)
    console.log(`${chalk.green.bold('DONE')} Project ready`)
    return true
  } catch (err) {
    console.error(`${chalk.red.bold('ERROR')} ${err.message}`)
    process.exit(1)
  }
}
