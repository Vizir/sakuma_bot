const request = require('./request');
const handler = require('./handler');
const hook = require('./hook');

function sakuma() {

  function verifyBot() {
    return request
      .get(`https://api.telegram.org/bot${process.env.API_KEY}/getMe`)
      .then((response) => {
        if (!response.body || !response.body.ok) {
          console.log(response);
          return Promise.reject('invalid bot.');
        }
        console.log(`status ok. bot: ${response.body.result.username}`);
        return Promise.resolve();
      });
  }

  function setHook() {
    return request
      .post(`https://api.telegram.org/bot${process.env.API_KEY}/setWebhook`)
      .json({ url: process.env.HOOK_URL })
      .then((response) => {
        if (!response.body || !response.body.ok) {
          return Promise.reject('cannot set the webhook.');
        }
        console.log(`hook ok. link: ${process.env.HOOK_URL}`);
        return Promise.resolve();
      });
  }

  function startHook() {
    const server = hook(handler);
    console.log(`server ok on port ${process.env.PORT}`);
    return server.listen(process.env.PORT);
  }

  function start() {
    verifyBot()
      .then(() => setHook())
      .then(() => startHook())
      .catch(console.error);
  }

  return {
    start: start
  };
}

module.exports = sakuma();
