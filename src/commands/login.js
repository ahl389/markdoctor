const {Command, flags} = require('@oclif/command');
const {cli} = require('cli-ux');
const keytar = require('keytar');

class LoginCommand extends Command {
  async run() {
    const username = await cli.prompt('What is the username?');
    const password = await cli.prompt('What is the password?', {type: 'masked'});

    keytar.setPassword('markdoctor', username, password);
  }
}

LoginCommand.description = `Login to the CLI`

module.exports = LoginCommand;