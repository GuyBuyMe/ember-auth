define('ember-auth/utils/getOwner', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var getOwner = _ember['default'].getOwner;

  exports['default'] = function (object) {
    if (getOwner) return getOwner(object);

    return App.__container__;
  };
});