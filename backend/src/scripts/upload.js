import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../../assets/messages/');

let messages = {};

const regex = /\d+/;

const CHUNK_SIZE = 50000;

fs.readdir(dir, function (err, filenames) {
  if (err) {
    console.log(err);
    return;
  }
  filenames.forEach(function (filename) {
    fs.readFile(dir + filename, 'utf-8', function (err, content) {
      if (err) {
        console.log(err);
        return;
      }

      const _messages = JSON.parse(content).messages;
      const n = regex.exec(filename)[0];
      messages[n] = _messages;
      if (Object.keys(messages).length === filenames.length) {
        const msgArray = Object.values(messages).flat();
        upload(msgArray);
        //writeToFile(JSON.stringify({ messages: msgArray }));
      }
    });
  });
});

const query = `
mutation Mutation($msgArray: [FbMessage]) {
  migrateMessages(messages: $msgArray) {
    content
  }
}`;

async function writeToFile(data) {
  fs.writeFile(dir + 'output.txt', data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}

async function upload(msgArray) {
  const variables = { msgArray };

  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  }).then(resp => {
    console.log(resp.text);
    resp.json().then(result => {
      console.log(result);
    });
  });
}
