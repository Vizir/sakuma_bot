const request = require('../request');
const image = require('../image');
const fs = require('fs');

function say(message) {
  var rawImage = 'images/raw_sakuma.jpg';
  var destImage = `images/sakuma${message.chat.id}${message.message_id}.jpg`;
  var textYPos = 155 - (message.text.split('\n').length * 7);
  return image(rawImage)
    .to(destImage)
    .addText(message.text, 'northwest', `+50+${textYPos}`)
    .convert()
    .then(() => {
      return request
        .post(`https://api.telegram.org/bot${process.env.API_KEY}/sendPhoto`)
        .form('chat_id', message.chat.id)
        .form('photo', fs.createReadStream(destImage))
        .then(() => fs.unlinkSync(destImage));
    })
    .catch((e) => {
      return request
        .post(`https://api.telegram.org/bot${process.env.API_KEY}/sendMessage`)
        .json({
          chat_id: message.chat.id,
          text: e.message || e
        })
        .then(() => fs.unlinkSync(destImage))
        .catch((e) => {
          if (e.code === 'ENOENT') {
            return Promise.resolve();
          }
          return e;
        });
    });
}

module.exports = say;
