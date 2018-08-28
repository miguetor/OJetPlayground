define((require) => {
  const API = require('utils/api/api');

  // Instance that is going to be used for the Singleton
  let instance = null;

  const localTestUrl = 'https://jsonplaceholder.typicode.com';
  const directPath = '';
  const gatewayPath = '';

  /**
   * Services - Singleton that contains all the Services that are used in the Application with their endpoints
   *
   * @return {Object}
   */
  function Services() {
    if (instance !== null) {
      throw new Error('Cannot instantiate more than one Services, use Services.getInstance()');
    }

    this.initialize();
  }


  /**
   * createUrl - creates an URL depending on the window.location
   *
   * @param  {string} path  last part of the URL
   * @return {string}       created URL
   */
  function createURL(directServicePath = '', gatewayServicePath = '') {
    if (window.location.origin.startsWith('http://localhost')) {
      return localTestUrl + directPath + directServicePath;
    }

    return  window.location.origin + gatewayPath + gatewayServicePath;
  }

  /**
   * prototype - Initializes the singleton
   *
   * @returns {void}
   */
  Services.prototype = {
    initialize() {
      // JSONPlaceholder Service
      this.placeholder = new API({ url: createURL() });
      this.placeholder.createEntity({ name: 'posts', path: '/posts', headers: { 'Content-Type': 'application/json' } });
    }
  };

  Services.getInstance = () => {
    // Gets an instance of the singleton. It is better to use
    if (instance === null) {
      instance = new Services();
    }
    return instance;
  };

  return Services.getInstance();
});
