module.exports = function() {

  Object.extend = function(dest, src) {
    for (var property in src)
      src.hasOwnProperty(property) &&
        dest[property] = src[property];

    return dest;
  };

  function doXHR(opts, callback) {
    var url = opts.url;
    var method = opts.method;
    var xhr = new XHR();
    var body = options.body || options.data;
    var doJSON = false;
    var sync = !!options.sync;

    xhr = new XHR();
    xhr.url = url;
    xhr.method = method;
    xhr.headers = options.headers || {};
    xhr.onreadystatechange = readystatechange;
    xhr.onload = load.bind(callback);
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

    function load() {
      var error;
      var status = xhr.statusCode || xhr.status;
      var body = xhr.body || xhr.response || xhr.responseText;

      if (status === 0 || (status >= 400 && status < 600)) {
        var message = xhr.responseText || String(xhr.status);
      }
    }
  }

  function Req(opts) {
    var thens = [];

    doXHR(opts, function(data) {
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

  function doReq(url, opts) {
    return new Req({method: 'get', url: url}.extend(opts));
  }

  var requ = {};
  ['get', 'post', 'put', 'update'].forEach(function(method) {
    requ[method] = function(url, opts) {
      return doReq(url, opts);
    };
  });

  return requ;
};