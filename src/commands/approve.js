const request = require('../request');
const image = require('../image');
const fs = require('fs');

function approve(message) {
  return request
    .post(`https://api.telegram.org/bot${process.env.API_KEY}/sendVideo`)
    .form('chat_id', message.chat.id)
    .form('video', fs.createReadStream('images/sakuma_approves.gif'))
    .exec();
}

module.exports = approve;
