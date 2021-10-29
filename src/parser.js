const fs = require('fs');
const readline = require('readline');

const isHeader = line => {
  return line !== '' && line[0].includes('#') ? true : false;
} 

const isBlank = line => {
  return line === '' ? true : false;
}

const isCode = line => {
  return line.includes('```') ? true : false;
}

const isListItem = line => {
  return (line[0] === ('-') || line.search(/[0-9]+\./) === 0)
    ? true 
    : false;
}

const parse = async path => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream('./parsed.md');

    const readInterface = readline.createInterface({
      input: fs.createReadStream(path),
      console: false
    });

    let prevLine = '';
    let currentLine;
    let inCodeBlock = false;

    readInterface.on('line', function(line) {
      currentLine = line.trim();

      if (!isBlank(currentLine)) {
        const prevHeader = isHeader(prevLine);
        const currentHeader = isHeader(currentLine);
        const currentList = isListItem(currentLine);

        if (!currentHeader && !prevHeader 
            && !inCodeBlock
            && !currentList
        ) {
          output.write(`&nbsp;\n&nbsp;\n${currentLine}\n`)
        } else {
          output.write(`${currentLine}\n`);
        }

        if (isCode(currentLine)) inCodeBlock = !inCodeBlock;
        prevLine = currentLine;
      } 
    })
    .on('close', function() {
      resolve('Parsing complete!')
    });
  })
}

module.exports = parse;