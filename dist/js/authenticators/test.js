define('ember-auth/authenticators/test', ['exports', 'ember', './base'], function (exports, _ember, _base) {
  'use strict';

  var RSVP = _ember['default'].RSVP;
  exports['default'] = _base['default'].extend({
    restore: function restore(data) {
      return RSVP.resolve(data);
    },

    authenticate: function authenticate(data) {
      return RSVP.resolve(data);
    },

    invalidate: function invalidate() {
      return RSVP.resolve();
    }
  });
});