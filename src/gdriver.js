const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const http = require('http');
const url = require('url');
const destroyer = require('server-destroy');

class gDriver {
  constructor(directory, title, credentials) {
    this.path = `${directory}/${title}.docx`;
    this.filename = `${title}.docx`;
    this.title = title;
    this.credentials = credentials;
  }

  authorize = () => {
    return new Promise((resolve, reject) => {
      const server = http.createServer(async (req, res) => {
        if (req.url.includes('/callbacktest')) {
          const query = new url.URL(`http://localhost:3000${req.url}`)
          res.end('Authentication complete. Return to command line.');
          resolve(query.searchParams.get('code'));
          server.destroy();
        }
      })
      .listen(3000, async () => {
        const token = Buffer.from(`${this.credentials.account}:${this.credentials.password}`, 'utf8').toString('base64');

        try {
          const resp = await axios.post('https://markdoctor.herokuapp.com/auth', {
            headers: {
              'Authorization': `Basic ${token}`,
              'Content-Type': 'application/json'
            }
          });

          const open = require('open');
          open(resp.data.url);
        } catch(err) {
          reject(new Error(err.message))
        }
      });

      destroyer(server);
    });
  }

  upload = async code => {
    try {
      const token = Buffer.from(`${this.credentials.account}:${this.credentials.password}`, 'utf8').toString('base64');
      const test = fs.createReadStream(this.path);

      const form = new FormData();
      form.append('code', code);
      form.append('title', this.title);
      form.append('file', test);

      await axios.post('https://markdoctor.herokuapp.com/upload', form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Basic ${token}`
        }
      });

      return 'Upload complete'
    } catch(err) {
      return new Error(err.message);
    }
  }
}

module.exports = gDriver;