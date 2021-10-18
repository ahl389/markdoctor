class Markdoctor {
  constructor(directory, filename) {
    this.filename = filename;
    this.directory = directory;
    this.stylePath = `${__dirname}/style/custom-style-reference.docx`;
  }

  parse = () => {
    const parse = require('@ahl389/markdoctor-parser');
    parse(`${this.directory}/${this.filename}`)
  }

  execute = cmd => {
    const { execSync } = require("child_process");
    execSync(cmd)
  }

  out = (msg, type='log') => {
    console[type](msg);
  }

  run = () => {
    // this.out('Parsing...');
    // this.parse();
  
    // this.out('Installing pandoc if needed...');
    // this.execute(`brew install pandoc`);
  
    // this.out('Converting .md to .docx...');
    // this.execute(`pandoc --reference-doc='${this.stylePath}' parsed.md -o ${this.filename.split('.')[0]}.docx -f markdown-auto_identifiers+hard_line_breaks --no-highlight`)
    
    this.out('Markdoctor is done! Upload your new .docx file to Google Drive and convert it to a Google Doc before getting reviews.')
    this.out(`https://accounts.google.com/o/oauth2/v2/auth`)
    // this.out('Uploading to Google Drive...');
    // this.gDriver(`${this.directory}/parsed.md`);
  }
}

module.exports = Markdoctor;