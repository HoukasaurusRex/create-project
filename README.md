# Create Project

[![NPM Total Downloads](https://img.shields.io/npm/dt/create-project.svg)](https://www.npmjs.com/package/create-project)
[![David Dependencies Status](https://david-dm.org/pterobyte/create-project.svg)](https://david-dm.org/pterobyte/create-project)
[![devDependencies Status](https://david-dm.org/pterobyte/create-project/dev-status.svg)](https://david-dm.org/pterobyte/create-project?type=dev)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Pterobyte/create-project.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Pterobyte/create-project/context:javascript)
[![prs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/pterobyte/create-project)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CLI tool to generate projects from github templates

![npm](https://raw.githubusercontent.com/Pterobyte/create-project/master/assets/npm.jpg)
![vuepress](https://raw.githubusercontent.com/Pterobyte/create-project/master/assets/vuepress.png)

Downloads boilerplates from specified github templates and configurations

## Contents  

- [Getting Started](#getting-started)
- [Examples](#examples)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Install

- With NPM

  ```sh
  npm install -g create-project
  ```

- With Yarn

  ```sh
  yarn global add create-project
  ```

### Arguments

| Arguments       | Description                                                 |
|--------------   |------------------------------------------------------------ |
| --git, -g       | Specify if create-project should initialize a new git repo  |
| --yes, -y       | Skip prompts and continue with defaults                     |
| --install, -i   | Specify if create-project should install dependencies       |

## Examples

```sh
`create-project --git --install`
```

## Limitations

create-project is limited to creating projects from github templates written by [Pterobyte](https://github.com/pterobyte). For template submissions or suggestions, please refer to [CONTRIBUTING.md](https://github.com/pterobyte/create-project/.github/CONTRIBUTING.md).

## Contributing

Please read [CONTRIBUTING.md](https://github.com/pterobyte/create-project/.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **JT Houk** - [Pterobyte](https://github.com/pterobyte)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/pterobyte/create-project/LICENSE) file for details

## Acknowledgments

This module was heavily inspired by an [article](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js) written by [Dominik Kundel](https://www.twilio.com/blog/author/dkundel)
