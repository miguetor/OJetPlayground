/*
=============================================================================
 Copyright (c) 2005, 2018 Oracle and/or its affiliates. All rights reserved.
=============================================================================
*/

define(
  ['ojs/ojcore', 'knockout', 'jquery',
  ],
  (oj, ko, $, Report, OrderHeader, OrderHeaderFactory, Converter) => {
    /**
     * SearchViewModel - Constructor for the ViewModel
     *
     * @constructor
     */
    function SearchViewModel() {
      const self = this;

      // =========================================================================
      // Lifecycle
      // =========================================================================

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       * @returns {void}
       */
      self.handleActivated = function handleActivated() {};

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
      self.handleAttached = function handleAttached() {};
    }

    return new SearchViewModel();
  },
);
