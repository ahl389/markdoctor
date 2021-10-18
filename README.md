Markdoctor
=============

A markdown parser and converter that will turn markdown files into properly formatted Google Docs files and upload them to your Google Drive.

<!-- toc -->
* [Usage](#usage)
* [Format](#format)
* [Links](#links)
<!-- tocstop -->

# Usage
```sh-session
INSTALLATION
$ npm install -g @ahl389/markdoctor

VERSION CHECKING
$ markdoctor (-v|--version|version)
@ahl389/markdoctor/0.0.1 darwin-x64 node-v14.17.2

USAGE
$ markdoctor path/to/file.md
```

# Format
When writing your article for use with `markdoctor`, you can generally write markdown exactly as you're used to. However, because _some_ markdown needs to be preserved in the final Google doc, in order to be imported into Wagtail, you must keep in mind the following two rules:

## Inline code
For inline code, in typical markdown or when writing directly in Google docs, you would use a backtick before and after the code, like this:

```markdown
In the code above, `const var = 1`, is an example of a variable declaration.
```

For this formatting to be preserved from your markdown file into Google Docs, you must escape your backticks:

```markdown
In the code above, \`const var = 1\`, is an example of a variable declaration.
```

## Fenced code blocks
In order to preserve your fenced code blocks when your markdown file is converted to Google Docs, be sure to prefix and suffix them with `~~~`, as shown below:

`~~~`<br>
` ```javascript hl_lines="1" ` <br>
`const myvar = 1;`  <br>
` ``` ` <br>
`~~~`

# Integrating with Google Drive
While the Google Drive integration is being built, you'll have to manually upload your new _.docx_ file to Google Drive. After uploading, open the file and then select **File** -> **Save as Google Docs**. This will create a copy of your file in the Google Docs format. This copy is the one you can share in order collaborate on the article and import it into Wagtail.


# Links





[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/voices-parser.svg)](https://www.npmjs.com/package/@ahl389/markdoctor)
[![Downloads/week](https://img.shields.io/npm/dw/voices-parser.svg)](https://www.npmjs.com/package/@ahl389/markdoctor)
[![License](https://img.shields.io/npm/l/voices-parser.svg)](https://github.com/ahl389/markdoctor/blob/master/package.json)
