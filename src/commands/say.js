const request = require('../request');
const image = require('../image');
const fs = require('fs');

function say(message) {
  return image('images/sakuma.jpg')
    .to(`images/sakuma${message.chat.id}${message.message_id}.jpg`)
    .addText(message.text, 'northeast', '+10+10')
    .convert()
    .then(() => {
      return request
        .post(`https://api.telegram.org/bot${process.env.API_KEY}/sendPhoto`)
        .form('chat_id', message.chat.id)
        .form('photo', fs.createReadStream(`images/sakuma${message.chat.id}${message.message_id}.jpg`))
        .then(() => fs.unlinkSync(`images/sakuma${message.chat.id}${message.message_id}.jpg`));
    });
}

module.exports = say;
