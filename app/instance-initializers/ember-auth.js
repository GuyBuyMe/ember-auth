import setupSessionRestoration from 'ember-auth/instance-initializers/setup-session-restoration';

export default {
  name: 'ember-auth',

  initialize(instance) {
    setupSessionRestoration(instance);
  }
};
