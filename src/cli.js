/**
 * @typedef {{skipPrompts:boolean, git:boolean, template:string, runInstall:boolean}} options
 */
import arg from 'arg'
import inquirer from 'inquirer'
import { createProject } from './main'

/**
 * Parse Arguments Into Options
 * @param {[String]} rawArgs Arguments passed into CLI
 * @returns {options}
 */
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install'
    },
    {
      argv: rawArgs.slice(2)
    }
  )
  return {
    skipPrompts: !!args['--yes'],
    git: !!args['--git'],
    template: args._[0],
    runInstall: !!args['--install']
  }
}

/**
 * Prompt for Missing Options
 * @param {options} options
 * @returns {options} Options
 */
async function promptForMissingOptions(options) {
  console.log(options)
  const defaultTemplate = 'Module'
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate
    }
  }
  const questions = []
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['Module', 'Vuepress'],
      default: defaultTemplate
    })
  }
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false
    })
  }
  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git
  }
}

/**
 * CLI
 * @param {[string]} args
 */
export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  await createProject(options)
}
