define('ember-auth/instance-initializers/setup-session-restoration', ['exports', '../utils/lookup'], function (exports, _utilsLookup) {
  'use strict';

  exports['default'] = setupSessionRestoration;

  function setupSessionRestoration(instance) {
    var applicationRoute = _utilsLookup['default'](instance, 'route:application');
    var session = _utilsLookup['default'](instance, 'session:main');
    var originalBeforeModel = applicationRoute.beforeModel;
    var applyOriginalBeforeModel = function applyOriginalBeforeModel() {
      return originalBeforeModel.apply(applicationRoute, arguments);
    };
    applicationRoute.reopen({
      beforeModel: function beforeModel() {
        var _arguments = arguments;

        return session.restore().then(function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        }, function () {
          return applyOriginalBeforeModel.apply(undefined, _arguments);
        });
      }
    });
  }
});