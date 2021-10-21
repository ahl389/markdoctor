const {Command, flags} = require('@oclif/command');
const parse = require('@ahl389/markdoctor-parser');
const gd = require('gDriver');
const { execSync } = require("child_process");
const keytar = require('keytar');
const {cli} = require('cli-ux');
const chalk = require('chalk');

class RunCommand extends Command {
  static args = [
    {
      name: 'file',               // name of arg to show in help and reference with args[name]
      required: true,            // make the arg required with `required: true`
      description: 'your markdown file', // help description
      hidden: false,               // hide this arg from help
    }
  ]

  async authorize() {
    const credentials = await keytar.findCredentials('markdoctor');
    return credentials.length == 0 ? null : credentials;
  }

  async gDriver() {
    const credentials = await keytar.findCredentials('markdoctor');
    const driver = new gd(this.directory, this.title, credentials);
    const resp = await driver.go(credentials);
    return resp;
  }

  async run() {
    const credentials = await this.authorize();

    if (credentials) {
      const {args} = this.parse(RunCommand);

      this.filename = args.file;
      this.title = args.file.split('.')[0];
      this.directory = process.cwd();
      this.stylePath = `${__dirname}/style/custom-style-reference.docx`;

      cli.action.start(chalk.cyan('Parsing'))
      parse(`${this.directory}/${this.filename}`);
      cli.action.stop();

      cli.action.start(chalk.cyan('Installing pandoc if needed'))
      execSync(`brew install pandoc`);
      cli.action.stop();

      cli.action.start(chalk.cyan('Converting .md to .docx'));
      execSync(`pandoc --reference-doc='${this.stylePath}' parsed.md -o ${this.filename.split('.')[0]}.docx -f markdown-auto_identifiers+hard_line_breaks --no-highlight`);
      cli.action.stop();

      cli.action.start(chalk.cyan('Connecting with Google Drive'));
      const resp = await this.gDriver();
      cli.action.stop(resp);
    } else {
      this.log(`Please login with command: ${chalk.cyan('markdoctor login')}`);
    }
  }
}

RunCommand.description = `Parses .md file for formatting, converts it to a .docx, uploads it to your google drive. Requires path to your markdown file as argument.`


RunCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = RunCommand;