const https = require('https');
const parse = require('url').parse;

function request(u) {
  const url = parse(u);

  const options = { 
    method: 'GET',
    path: url.path,
    host: url.host,
    port: url.port
  };

  function exec() {
    return new Promise((resolve, reject) => { 
      const request = https.request(options, (response) => {
        response.on('data', (chunk) => response.body = response.body ? response.body += chunk : String(chunk));
        response.on('end', () => { 
          try {
            response.body = JSON.parse(response.body);
          } catch(err) {
          }
          resolve(response);
        });
      });
      if (options.data && (options.method === 'POST' || options.method === 'PUT')) {
        request.write(options.data);
      }
      request.on('error', reject);
      request.end();
    });
  }

  function then(callback) {
    return exec().then(callback);
  }

  function header(key, value) {
    options.headers = options.headers || {};
    options.headers[key] = value;
    return this;
  }

  function json(data) {
    header('Content-Type', 'application/json');
    options.data = JSON.stringify(data);
    return this;
  }

  function post() {
    options.method = 'POST';
    return this;
  }

  function get() {
    options.method = 'GET';
    return this;
  }

  function put() {
    options.method = 'PUT';
    return this;
  }

  function del() {
    options.method = 'DELETE';
    return this;
  }

  return {
    exec: exec,
    then: then,
    header: header,
    json: json,
    post: post,
    get: get,
    put: put,
    del: del
  };

  return exports;
}

request.post = function post(u) {
  return request(u).post();
};

request.get = function get(u) {
  return request(u).get();
};

request.put = function put(u) {
  return request(u).put();
};

request.del = function del(u) {
  return request(u).del();
};

module.exports = request;
