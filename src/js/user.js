define((require) => {
  const $  = require('jquery');
  const ko = require('knockout');
  const securityMapping = JSON.parse(require('text!/json/securityMapping.json'));

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
   * getSecurityMapping - description
   *
   * @param  {object} securityMapping Access Security rules for different roles
   * @param  {array}  roles           Security Mapping with the inherited privileges included
   * @return {object}                 Security Mapping with the inherited privileges included
   */
  function getSecurityMapping(securityMapping, roles) {
    if (securityMapping && roles && roles.length) {
      const securityRolesRules = [];
      let highestPriority = null;

      // Get the security rules for the user's roles
      for (let i = 0; i < roles.length; i += 1) {
        if (securityMapping[roles[i]]) {
          if (highestPriority === null) highestPriority = securityMapping[roles[i]];
          else if (securityMapping[roles[i]].priority < highestPriority.priority) {
            highestPriority = securityMapping[roles[i]];
          }
        }
      }

      return highestPriority;
    }

    return null;
  }

  /**
   * prototype - Initializes the singleton
   *
   * @returns {void}
   */
  SCAUser.prototype = {
    initialize() {
      const self = this;

      self.sso = ko.observable();
      self.roles = ko.observableArray(['SALES_USER_ROLE']);

      // Get the application map
      self.securityMapping = getSecurityMapping(securityMapping, self.roles());
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
