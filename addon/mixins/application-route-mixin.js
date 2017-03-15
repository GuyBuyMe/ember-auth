import Ember from 'ember';
import Configuration from './../configuration';
import getOwner from './../utils/getOwner';

const { inject, Mixin, A, run: { bind }, testing, computed } = Ember;

export default Mixin.create({

  session: inject.service('session'),

  _isFastBoot: computed(function() {
    const fastboot = getOwner(this).lookup('service:fastboot');

    return fastboot ? fastboot.get('isFastBoot') : false;
  }),

  routeAfterAuthentication: computed(function() {
    return Configuration.routeAfterAuthentication;
  }),

  init() {
    this._super(...arguments);
    this._subscribeToSessionEvents();
  },

  _subscribeToSessionEvents() {
    A([
      ['authenticationSucceeded', 'sessionAuthenticated'],
      ['invalidationSucceeded', 'sessionInvalidated'],
      ['restorationSucceeded', 'sessionRestored']
    ]).forEach(([event, method]) => {
      this.get('session').on(event, bind(this, () => {
        this[method](...arguments);
      }));
    });
  },

  sessionAuthenticated() {
    const attemptedTransition = this.get('session.attemptedTransition');
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

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

  sessionInvalidated() {
    if (!testing) {
      if (this.get('_isFastBoot')) {
        this.transitionTo(Configuration.baseURL);
      } else {
        window.location.replace(Configuration.baseURL);
      }
    }
  },

  sessionRestored() {

  },

});
