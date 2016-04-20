const http = require('http');

function hook(requestHandler) {
  const server = http.createServer();

  server.on('request', function (request, response) {
    parse(request, () => {
      requestHandler(request, response, finishHandler(response));
    });
  });

  function finishHandler(response) {
    return function finish() {
      response.status = 200;
      response.end('ok');
    };
  }

  function parse(request, callback) {
    request.on('data', (chunk) => request.body = request.body ? request.body += chunk : String(chunk));
    request.on('end', () => {
      try {
        request.body = JSON.parse(request.body)
      } catch(e) {
      }
      callback();
    });
  }

  function listen(port) {
    server.listen(port);
  }

  return {
    listen: listen
  };
}

module.exports = hook;
