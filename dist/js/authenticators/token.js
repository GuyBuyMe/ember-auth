define('ember-auth/authenticators/token', ['exports', 'ember', './base', './../configuration'], function (exports, _ember, _base, _configuration) {
  'use strict';

  exports['default'] = _base['default'].extend({

    serverTokenEndpoint: '/api/token-auth/',
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'token',
    headers: {},

    init: function init() {
      this.serverTokenEndpoint = _configuration['default'].serverTokenEndpoint;
      this.identificationField = _configuration['default'].identificationField;
      this.passwordField = _configuration['default'].passwordField;
      this.tokenPropertyName = _configuration['default'].tokenPropertyName;
      this.headers = _configuration['default'].headers;
    },

    restore: function restore(properties) {
      var _this = this;

      var propertiesObject = _ember['default'].Object.create(properties);

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        if (!_ember['default'].isEmpty(propertiesObject.get(_this.tokenPropertyName))) {
          resolve(properties);
        } else {
          reject();
        }
      });
    },

    authenticate: function authenticate(credentials, headers) {
      var _this2 = this;

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        var data = _this2.getAuthenticateData(credentials);

        _this2.makeRequest(data, headers).then(function (response) {
          _ember['default'].run(function () {
            resolve(_this2.getResponseData(response));
          });
        }, function (xhr) {
          _ember['default'].run(function () {
            reject(xhr.responseJSON || xhr.responseText);
          });
        });
      });
    },

    getAuthenticateData: function getAuthenticateData(credentials) {
      var _authentication;

      var authentication = (_authentication = {}, _authentication[this.passwordField] = credentials.password, _authentication[this.identificationField] = credentials.identification, _authentication);

      return authentication;
    },

    getResponseData: function getResponseData(response) {
      return response;
    },

    invalidate: function invalidate() {
      return _ember['default'].RSVP.resolve();
    },

    makeRequest: function makeRequest(data, headers) {
      var _this3 = this;

      return _ember['default'].$.ajax({
        url: this.serverTokenEndpoint,
        method: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        headers: this.headers,
        beforeSend: function beforeSend(xhr, settings) {
          if (_this3.headers['Accept'] === null || _this3.headers['Accept'] === undefined) {
            xhr.setRequestHeader('Accept', settings.accepts.json);
          }

          if (headers) {
            Object.keys(headers).forEach(function (key) {
              xhr.setRequestHeader(key, headers[key]);
            });
          }
        }
      });
    }
  });
});