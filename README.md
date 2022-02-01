Markdoctor
=============

A markdown parser and converter that will turn markdown files into properly formatted Google Docs files and upload them to your Google Drive.

<!-- toc -->
* [Installation](#installation)
* [Usage](#usage)
* [Format](#format)
* [Deploying your article to Google Drive](#deploying-your-markdown-article-to-google-drive)
* [Features in progress](#features-in-progress)
* [Links](#links)
<!-- tocstop -->

# Installation
```sh-session
INSTALLATION
$ npm install -g @ahl389/markdoctor
```

Be sure to install `markdoctor` globally by using the `-g` flag on install.

The first time you use `markdoctor`, you'll have to login. See the [Usage](#login) section.


# Usage
```sh-session
VERSION CHECKING
$ markdoctor (-v|--version|version)
@ahl389/markdoctor/0.0.1 darwin-x64 node-v14.17.2

USAGE
$ markdoctor run path/to/file.md
$ markdoctor login
```

## Login
The first time you use `markdoctor`, you'll need to login using the `login` command shown above. This will prompt you for a username and password - please see @aboucher for these credentials.

# Format
When writing your article for use with `markdoctor`, you can generally write markdown exactly as you're used to. However, because _some_ markdown needs to be preserved in the final Google doc, in order to be imported into Wagtail, you must keep in mind the following information:

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
Markdoctor checks for fenced code blocks and processes them appropriately, so you can write your fenced code blocks in the same way you would in Google Docs, as shown here: 

` ```javascript hl_lines="1" ` <br>
`const myvar = 1;`  <br>
` ``` `

## Bold, italics, images, and lists
Please write these in normal markdown:

**bold**

### Bold
```markdown
**bolded item**
```

### Italics
```markdown
_italicized item_
*italicized item*
```

### Images

Images can be saved in the same directory as your _.md_ file and linked to via their path, the same way you would normally with markdown:

```markdown
![Alt Text](/path/to/image.jpg)
```

Don't forget the alt text! As of writing this, alt text is not yet tested for in the parser. This is forthcoming, stay tuned!

### Lists
```markdown
- unordered list item
- unordered list item
```

```markdown
1) ordered list item 1
2) ordered list item 2
```

### Tables and info/warning/danger blocks
These have not been tested or implemented in the parser yet. This is forthcoming, stay tuned!

# Deploying your markdown article to Google Drive

When you've finished writing your article, save your _.md_ file and from the directory where your file is kept, use the `run` command with your file's full name and extension:

```sh-session
markdoctor run myfile.md
```

This will initiate the following processes:

- First, your _.md_ file will be parsed by `markdoctor` and a new file will be created in the folder where you ran the command called _parsed.md_.
- Then, a tool called `pandoc` will duplicate your parsed markdown file and convert the duplication to a _.docx_ file using a specific set of formatting guidelines. This file will also be saved in that same directory.
- Finally, your _.docx_ file will be uploaded to your Google Drive and converted to Google Doc format. At this point, you'll be prompted to authenticate your Google account. Only people with `twilio.com` email addresses/Google will be successful.

# Features in progress
- Automatic inline code parsing
- Removing pandoc install on `run`
- Table parsing
- Info/warning/danger block parsing

Leave your suggestions by [creating an issue](https://github.com/ahl389/markdoctor/issues)! 


# Links
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/voices-parser.svg)](https://www.npmjs.com/package/@ahl389/markdoctor)
[![Downloads/week](https://img.shields.io/npm/dw/voices-parser.svg)](https://www.npmjs.com/package/@ahl389/markdoctor)
[![License](https://img.shields.io/npm/l/voices-parser.svg)](https://github.com/ahl389/markdoctor/blob/master/package.json)
