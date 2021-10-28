const {Command, flags} = require('@oclif/command');
const {cli} = require('cli-ux');
const keytar = require('keytar');

class LoginCommand extends Command {
  async run() {
    const credentials = await keytar.findCredentials('markdoctor');
    const username = await cli.prompt('What is the username?');
    const password = await cli.prompt('What is the password?', {type: 'mask'});

    if (credentials.length > 0) {
      for (let credSet of credentials) {
        keytar.deletePassword('markdoctor', credSet.account)
      }
    }

    await keytar.setPassword('markdoctor', username, password);
  }
}

LoginCommand.description = `Login to the CLI`

module.exports = LoginCommand;