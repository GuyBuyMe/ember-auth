define('ember-auth/mixins/application-route-mixin', ['exports', 'ember', './../configuration', './../utils/getOwner'], function (exports, _ember, _configuration, _utilsGetOwner) {
  'use strict';

  var inject = _ember['default'].inject;
  var Mixin = _ember['default'].Mixin;
  var A = _ember['default'].A;
  var bind = _ember['default'].run.bind;
  var testing = _ember['default'].testing;
  var computed = _ember['default'].computed;
  exports['default'] = Mixin.create({

    session: inject.service('session'),

    _isFastBoot: computed(function () {
      var fastboot = _utilsGetOwner['default'](this).lookup('service:fastboot');

      return fastboot ? fastboot.get('isFastBoot') : false;
    }),

    routeAfterAuthentication: computed(function () {
      return _configuration['default'].routeAfterAuthentication;
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this._subscribeToSessionEvents();
    },

    _subscribeToSessionEvents: function _subscribeToSessionEvents() {
      var _this = this,
          _arguments = arguments;

      A([['authenticationSucceeded', 'sessionAuthenticated'], ['invalidationSucceeded', 'sessionInvalidated'], ['restorationSucceeded', 'sessionRestored']]).forEach(function (_ref) {
        var event = _ref[0];
        var method = _ref[1];

        _this.get('session').on(event, bind(_this, function () {
          _this[method].apply(_this, _arguments);
        }));
      });
    },

    sessionAuthenticated: function sessionAuthenticated() {
      var attemptedTransition = this.get('session.attemptedTransition');
      var cookies = _utilsGetOwner['default'](this).lookup('service:cookies');
      var redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

      if (attemptedTransition) {
        attemptedTransition.retry();
        this.set('session.attemptedTransition', null);
      } else if (redirectTarget) {
        this.transitionTo(redirectTarget);
        cookies.clear('ember_simple_auth-redirectTarget');
      } else {
        this.transitionTo(this.get('routeAfterAuthentication'));
      }
    },

    sessionInvalidated: function sessionInvalidated() {
      if (!testing) {
        if (this.get('_isFastBoot')) {
          this.transitionTo(_configuration['default'].baseURL);
        } else {
          window.location.replace(_configuration['default'].baseURL);
        }
      }
    },

    sessionRestored: function sessionRestored() {}

  });
});