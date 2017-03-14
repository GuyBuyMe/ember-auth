define('ember-auth/authorizers/token', ['exports', 'ember', './base', './../configuration'], function (exports, _ember, _base, _configuration) {
  'use strict';

  exports['default'] = _base['default'].extend({
    session: _ember['default'].inject.service('session'),

    authorizationPrefix: 'Bearer ',
    tokenPropertyName: 'token',
    authorizationHeaderName: 'Authorization',

    init: function init() {
      this.tokenPropertyName = _configuration['default'].tokenPropertyName;
      this.authorizationHeaderName = _configuration['default'].authorizationHeaderName;

      if (_configuration['default'].authorizationPrefix || _configuration['default'].authorizationPrefix === null) {
        this.authorizationPrefix = _configuration['default'].authorizationPrefix;
      }
    },

    authorize: function authorize() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var block = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

      var token = _ember['default'].get(data, this.tokenPropertyName);
      var prefix = this.authorizationPrefix ? this.authorizationPrefix : '';

      if (this.get('session.isAuthenticated') && !_ember['default'].isEmpty(token)) {
        block(this.authorizationHeaderName, prefix + token);
      }
    }
  });
});