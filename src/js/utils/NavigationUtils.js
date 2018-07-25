define((require) => {

  const oj = require('ojs/ojcore');
  const user = require('user');

  class NavigationUtils {
    // Creates a Navigation list based on a router
    createNavigationArray(router) {
      const navList = [];

      for (let i = 0; i < router.states.length; i += 1) {
        if (router.states[i].label && router.states[i].authorized) {
          navList.push({
            name: router.states[i].label,
            id: router.states[i].id,
          });
        }
      }

      return navList;
    }
  }

  return new NavigationUtils();

});
