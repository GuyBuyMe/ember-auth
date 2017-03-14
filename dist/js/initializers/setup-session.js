define('ember-auth/initializers/setup-session', ['exports', 'ember', '../internal-session', '../session-stores/ephemeral', '../utils/inject'], function (exports, _ember, _internalSession, _sessionStoresEphemeral, _utilsInject) {
  'use strict';

  exports['default'] = setupSession;

  function setupSession(registry) {
    registry.register('session:main', _internalSession['default']);

    var store = 'session-store:application';
    if (_ember['default'].testing) {
      store = 'session-store:test';
      registry.register(store, _sessionStoresEphemeral['default']);
    }

    _utilsInject['default'](registry, 'session:main', 'store', store);
  }
});