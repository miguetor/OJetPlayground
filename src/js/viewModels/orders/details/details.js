/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(
  ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton'],
  (oj, ko) => {
    /**
     * Orders section main viewModel
     * @return {type}  description
     */
    function DetailsViewModel() {
      const self = this;

      self.orderNumber = ko.observable();
      self.goBack = () => {
        oj.Router.rootInstance.go('orders/ordersNav/search');
      };

      // =========================================================================
      // Checks if the state is a valid Request id
      // =========================================================================
      self.checkOrderNumber = (stateId) => {
        let state;

        if (stateId) {
          if (stateId.toString().match(/^\d+$/)) {
            state = new oj.RouterState(stateId, {
              value: stateId
            }, self.router);
            self.orderNumber(stateId);
          }
        }
        return state;
      };

      // =========================================================================
      // Router Configuration
      // =========================================================================
      if (!oj.Router.rootInstance.getChildRouter('orders').getChildRouter('details')) {
        self.router = oj.Router.rootInstance.getChildRouter('orders').createChildRouter('details').configure(self.checkOrderNumber);
      }
      const routerSyncPromise = oj.Router.sync();

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
        routerSyncPromise.then(() => {
          // if there is no Order Number then return to my requests
          if (!self.orderNumber()) {
            console.log('Order Number Not Found');
          }
        });
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
    return new DetailsViewModel();
  }
);
