define('ember-auth/initializers/setup-session-service', ['exports', '../utils/inject'], function (exports, _utilsInject) {
  'use strict';

  exports['default'] = setupSessionStore;

  function setupSessionStore(registry) {
    _utilsInject['default'](registry, 'service:session', 'session', 'session:main');
  }
});