const request = require('../request');

function say(message) {
  return request
    .post(`https://api.telegram.org/bot${process.env.API_KEY}/sendMessage`)
    .json({
      chat_id: message.chat.id,
      text: `Oi. ${message.from.first_name}. Você disse ${message.text}`,
      reply_to_message_id: message.message_id
    });
}


module.exports = say;
