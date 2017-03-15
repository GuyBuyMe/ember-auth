import Ember from 'ember';
import Configuration from './../configuration';
import getOwner from './../utils/getOwner';

const { inject: { service }, Mixin, assert, computed } = Ember;


export default Mixin.create({

  session: service('session'),

  _isFastBoot: computed(function() {
    const fastboot = getOwner(this).lookup('service:fastboot');

    return fastboot ? fastboot.get('isFastBoot') : false;
  }),

  authenticationRoute: computed(function() {
    return Configuration.authenticationRoute;
  }),

  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      let authenticationRoute = this.get('authenticationRoute');
      assert('The route configured as Configuration.authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== authenticationRoute);

      if (this.get('_isFastBoot')) {
        const fastboot = getOwner(this).lookup('service:fastboot');
        const cookies = getOwner(this).lookup('service:cookies');

        cookies.write('ember_simple_auth-redirectTarget', transition.intent.url, {
          path: '/',
          secure: fastboot.get('request.protocol') === 'https'
        });
      } else {
        this.set('session.attemptedTransition', transition);
      }

      this.transitionTo(authenticationRoute);
    } else {
      return this._super(...arguments);
    }
  }
});
