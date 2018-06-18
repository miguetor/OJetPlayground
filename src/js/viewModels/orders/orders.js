/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(
  ['ojs/ojcore', 'knockout', 'jquery'],
  (oj, ko) => {
    /**
     * Orders section main viewModel
     * @return {type}  description
     */
    function OrdersViewModel() {
      const self = this;
      self.notifications = ko.observableArray([]);

      // Sub router
      self.router = oj.Router.rootInstance.createChildRouter('orders', 'orders').configure({
        ordersNav: {
          label: 'Orders Navigation View',
          value: 'orders/ordersNav/ordersNav',
          isDefault: true,
        },
      });

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = () => {
        const routerSyncPromise = oj.Router.sync().then(() => {
          self.stateIdComp = ko.computed(() => {
            if (self.router.stateId()) return self.router.currentValue(); else if (self.router.defaultStateId) {
              return self.router.getState(self.router.defaultStateId).value;
            } return self.router.states[0].value;
          });
        });

        return routerSyncPromise;
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       * @return {void}
       */
      self.handleAttached = () => {};


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {void}
       */
      self.handleBindingsApplied = () => {};

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = () => {};
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new OrdersViewModel();
  }
);
