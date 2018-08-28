// Configures a custom process before sending any XMLHttpRequest
define((require) => {
  const $ = require('jquery');

  // Interceptor - Open
  (function(open) {
    XMLHttpRequest.prototype.open = function(method, url, async) {
      this.requestUrl = url;
      this.requestMethod = method;
      open.call(this, method, url, async);
    };
  })(XMLHttpRequest.prototype.open);

  // Interceptor - Send
  (function(send) {
    XMLHttpRequest.prototype.send = function(data) {
      this.onerror = (event) => {
  			if (this.status === 0) {
  				console.log('Session Expired!');
  			}
  		};

      send.call(this, data);
    };
  })(XMLHttpRequest.prototype.send);

  // jQuery AJAX Requests Setup before being sent
  $.ajaxPrefilter((options) => {
    // Filter for local testing
    if (window.location.origin.startsWith('http://localhost')) {
      options.headers = null;
    }
  });
});
