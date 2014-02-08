module.exports = function() {

  function doXHR(method, url, opts) {
    var xhr = new XHR();
    var body = options.body || options.data;
    var doJSON = false;
    var sync = !!options.sync;

    xhr = new XHR();
    xhr.url = url;
    xhr.method = method;
    xhr.headers = options.headers || {};
    xhr.onreadystatechange = readystatechange;
    xhr.onload = load;
    xhr.onerror = error;
    xhr.ontimeout = timeout;
    xhr.onprogress = noop; // IE9

    if ('json' in options) {
      doJSON = true;
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.json);
    }

    xhr.open(method, url, !sync);
    xhr.send(body);
  }

  function Req(type, url, opts) {
    var thens = [];

    doXHR(type, url, opts, function(data) {
      thens.forEach(function(then) {
        then.call(then, data)
      });
    });

    return {
      then: function(callback) {
        thens.push(callback);
      }
    };
  }

  return {
    get: function(url, opts) {
      return new Req('get', url, opts);
    },

    post: function(url, opts) {
      return new Req('post', url, opts);
    }
  };

};