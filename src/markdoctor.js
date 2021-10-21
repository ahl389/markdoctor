class Markdoctor {
  constructor(directory, filename) {
    this.filename = filename;
    this.title = this.filename.split('.')[0];
    this.directory = directory;
    this.stylePath = `${__dirname}/style/custom-style-reference.docx`;
  }

  parse = () => {
    const parse = require('@ahl389/markdoctor-parser');
    parse(`${this.directory}/${this.filename}`);
  }

  gDriver = async () => {
    const gd = require('gDriver');
    const keytar = require('keytar');
    const credentials = await keytar.findCredentials('markdoctor');
    const driver = new gd(this.directory, this.title, credentials);
    const resp = await driver.go(credentials);
    return resp;
  }

  execute = cmd => {
    const { execSync } = require("child_process");
    execSync(cmd)
  }

  out = (msg, type='log') => {
    console[type](msg);
  }

  run = async () => {
    // this.out('Parsing...');
    // this.parse();
  
    // this.out('Installing pandoc if needed...');
    // this.execute(`brew install pandoc`);
  
    // this.out('Converting .md to .docx...');
    // this.execute(`pandoc --reference-doc='${this.stylePath}' parsed.md -o ${this.filename.split('.')[0]}.docx -f markdown-auto_identifiers+hard_line_breaks --no-highlight`);
    
    this.out('Initializing gDriver...');
    const resp = await this.gDriver();
    this.out(resp)
  }
}

module.exports = Markdoctor;