const {Command, flags} = require('@oclif/command');
// const parse = require('@ahl389/markdoctor-parser');
const parse = require('../parser');
const gd = require('../gdriver');
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

  async gDriver(credentials) {
    const driver = new gd(this.directory, this.title, credentials[0]);
    return driver;
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
      const resp = await parse(`${this.directory}/${this.filename}`);
      cli.action.stop(resp);

      cli.action.start(chalk.cyan('Installing pandoc if needed'))
      execSync(`brew install pandoc`);
      cli.action.stop();

      cli.action.start(chalk.cyan('Converting .md to .docx'));
      execSync(`pandoc --reference-doc='${this.stylePath}' parsed.md -o ${this.filename.split('.')[0]}.docx -f markdown-auto_identifiers+hard_line_breaks --no-highlight`);
      cli.action.stop();

      cli.action.start(chalk.cyan('Authorizing and uploading with Google Drive'));
      const driver = await this.gDriver(credentials);

      try {
        const code = await driver.authorize();
        const resp = await driver.upload(code);
        cli.action.stop(resp);
      } catch (err) {
        cli.error(err);
      } 
    } else {
      this.log(`Please login with command: ${chalk.cyan('markdoctor login')}`);
    }
  }
}

RunCommand.description = `Parses .md file for formatting, converts it to a .docx, uploads it to your google drive. Requires path to your markdown file as argument, for example ${chalk.cyan('markdoctor run myfile.md')}`

RunCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = RunCommand;