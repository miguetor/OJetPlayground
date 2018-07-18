define((require) => {
  const ko = require('knockout');
  // Instance that is going to be used for the Singleton
  let instance = null;

  /**
   * SCAUser - Singleton that contains the user information like: user priviliges, user account, and user preferences
   *
   * @return {type} - description
   */
  function SCAUser() {
    if (instance !== null) {
      throw new Error('Cannot instantiate more than one SCAUser, use SCAUser.getInstance()');
    }

    this.initialize();
  }

  /**
   * prototype - Initializes the singleton
   *
   * @returns {void}
   */
  SCAUser.prototype = {
    initialize() {
      this.sso = ko.observable(null);
      this.roles = ko.observableArray([]);
    }
  };

  SCAUser.getInstance = () => {
    // summary:
    //      Gets an instance of the singleton. It is better to use
    if (instance === null) {
      instance = new SCAUser();
    }
    return instance;
  };

  return SCAUser.getInstance();
});
