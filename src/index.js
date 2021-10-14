const {Command, flags} = require('@oclif/command');
const app = require('parseApp');

class VoicesParserCommand extends Command {
  static args = [
    {
      name: 'file',               // name of arg to show in help and reference with args[name]
      required: true,            // make the arg required with `required: true`
      description: 'your markdown file', // help description
      hidden: false,               // hide this arg from help
    }
  ]

  async run() {
    const {flags} = this.parse(VoicesParserCommand);
    const {args} = this.parse(VoicesParserCommand);

    const file = args.file;
    //const directory = __dirname;
    const directory = process.cwd();
    console.log(directory);
    const path = directory + '/' + file;

    app(path, directory);
  }
}

VoicesParserCommand.description = `Describe the command here
...
Extra documentation goes here
`

VoicesParserCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = VoicesParserCommand;