define((require) => {
  const ko = require('knockout');
  const endpoints = JSON.parse(require('text!utils/api/resources/endpoints.json'));
  const url = window.location.origin.includes('localhost') ? endpoints.testUrl : window.location.origin;

  // Instance that is going to be used for the Singleton
  let instance = null;

  /**
   * API - Singleton that contains the endpoints used in the application
   *
   * @return {type} - description
   */
  function API() {
    if (instance !== null) {
      throw new Error('Cannot instantiate more than one API, use API.getInstance()');
    }

    this.initialize();
  }

  /**
   * prototype - Initializes the singleton
   *
   * @returns {void}
   */
  API.prototype = {
    initialize() {
      console.log(url);
    }
  };

  API.getInstance = () => {
    // Gets an instance of the singleton. It is better to use
    if (instance === null) {
      instance = new API();
    }
    return instance;
  };

  return API.getInstance();
});
