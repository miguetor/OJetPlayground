define((require) => {

  class NavigationUtils {
    // Creates a Navigation list based on a router
    createNavigationArray(router) {
      const navList = [];

      for (let i = 0; i < router.states.length; i += 1) {
        let canEnter = true;
        if (typeof router.states[i].canEnter === 'function') canEnter = router.states[i].canEnter();
        if (router.states[i].label && canEnter) {
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
