/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

define(['ojs/ojcore', 'knockout', 'utils/NavigationUtils', 'user', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas'
  ],
  function(oj, ko, NavigationUtils, user) {
    function ControllerViewModel() {
      var self = this;

      // Router configure override to add a new propertie that helps to let the listener know if the user us authorized
      (function (configure) {
        oj.Router.prototype._configure = configure;
        oj.Router.prototype.configure = function(option) {
          let router = this;
          const hierarchy = [];

          while (router.parent) {
            hierarchy.push(router);
            router = router.parent;
          }

          let securityState = user.securityMapping;

          while (hierarchy.length > 0) {
            const currentRouter = hierarchy.pop();
            if (securityState[currentRouter._parentState]) {
              securityState = securityState[currentRouter._parentState];
            } else {
              securityState = null;
              hierarchy.splice(0, hierarchy.length);
            }
          }

          const newRouter = this._configure(option);

          if (newRouter.states) {
            for (let i = 0, length = newRouter.states.length; i < length; i += 1) {
              newRouter.states[i].authorized = securityState !== null && securityState[newRouter.states[i].id] !== undefined;
            }
          } else if (newRouter.stateFromIdCallback) {
            newRouter.dynamicStateAuthorization = securityState['{id}'] !== undefined;
          }

          return newRouter;
        };
      })(oj.Router.prototype.configure);

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'dashboard': {
          label: 'Dashboard',
          value: 'dashboard',
          isDefault: true,
        },
        'orders': {
          label: 'Orders',
          value: 'orders/orders',
        },
        'incidents': {
          label: 'Incidents',
          value: 'incidents',
        },
        'customers': {
          label: 'Customers',
          value: 'customers',
        },
        'about': {
          label: 'About',
          value: 'about',
        },
        'notFound': {
          value: 'notFound',
        },
        'forbidden': {
          value: 'accessDenied',
        }
      });

      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.currentPage = ko.observable();
      self.router.stateId.subscribe((value) => {
        if (value) {
          if (self.router.currentValue()) self.currentPage(self.router.currentValue());
          else self.currentPage('notFound');
        }
      }, 'valueChanged');

      // Gets the current general state of the Router
      function getCurrentGlobalRouterState(router) {
        if (router._childRouters.length) {
          for (let i = 0; i < router._childRouters.length; i++) {
            if (router._childRouters[i]._parentState === router.currentState().id) {
              return getCurrentGlobalRouterState(router._childRouters[i]);
            }
          }

          return router.currentState();
        }

        return router.currentState();
      }

      // Transition handler
      oj.Router.transitionedToState.add(function(result) {
        if (result.hasChanged) {
          let state = getCurrentGlobalRouterState(self.router);
          if (state) {
            if (state._router.dynamicStateAuthorization === false || state.authorized === false) {
              self.router.go('forbidden');
            } else {
              console.log(`Current page: ${state.id}`);
            }
          }
          else self.router.go('notFound');
        }
      });

      self.navDataSource = new oj.ArrayTableDataSource(NavigationUtils.createNavigationArray(self.router), {
        idAttribute: 'id'
      });

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {
        oj.OffcanvasUtils.close(self.drawerParams);
      });
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() {
        $('#drawerToggleButton').focus();
      });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
    }

    return new ControllerViewModel();
  }
);
