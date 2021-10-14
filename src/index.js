const {Command, flags} = require('@oclif/command');
const Markdoctor = require('./markdoctor');

class MarkdoctorCommand extends Command {
  static args = [
    {
      name: 'file',               // name of arg to show in help and reference with args[name]
      required: true,            // make the arg required with `required: true`
      description: 'your markdown file', // help description
      hidden: false,               // hide this arg from help
    }
  ]

  async run() {
    const {args} = this.parse(MarkdoctorCommand);
    console.log(args)
    const markdoctor = new Markdoctor(process.cwd(), args.file);
    markdoctor.run();
  }
}

MarkdoctorCommand.description = `Describe the command here
...
Extra documentation goes here
`

MarkdoctorCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = MarkdoctorCommand;