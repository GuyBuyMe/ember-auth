define('ember-auth/mixins/authenticated-route-mixin', ['exports', 'ember', './../configuration', './../utils/getOwner'], function (exports, _ember, _configuration, _utilsGetOwner) {
  'use strict';

  var service = _ember['default'].inject.service;
  var Mixin = _ember['default'].Mixin;
  var assert = _ember['default'].assert;
  var computed = _ember['default'].computed;
  exports['default'] = Mixin.create({

    session: service('session'),

    _isFastBoot: computed(function () {
      var fastboot = _utilsGetOwner['default'](this).lookup('service:fastboot');

      return fastboot ? fastboot.get('isFastBoot') : false;
    }),

    authenticationRoute: computed(function () {
      return _configuration['default'].authenticationRoute;
    }),

    beforeModel: function beforeModel(transition) {
      if (!this.get('session.isAuthenticated')) {
        var authenticationRoute = this.get('authenticationRoute');
        assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== authenticationRoute);

        if (this.get('_isFastBoot')) {
          var fastboot = _utilsGetOwner['default'](this).lookup('service:fastboot');
          var cookies = _utilsGetOwner['default'](this).lookup('service:cookies');

          cookies.write('ember_simple_auth-redirectTarget', transition.intent.url, {
            path: '/',
            secure: fastboot.get('request.protocol') === 'https'
          });
        } else {
          this.set('session.attemptedTransition', transition);
        }

        this.transitionTo(authenticationRoute);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  });
});