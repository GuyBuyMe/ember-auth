import Ember from 'ember';

const { getWithDefault, typeOf, deprecate } = Ember;

const DEFAULTS = {

  baseURL:                      '',
  authenticationRoute:          'login',
  routeAfterAuthentication:     'index',
  routeIfAlreadyAuthenticated:  'index',
  refreshAfterInvalidation:     false,

  identificationAttributeName:  'email',
  identificationField:          'username',
  passwordField: 'password',

  cookieName:                   'ember-auth:session',
  localStorageKey:              'ember-auth:session',

  tokenAttributeName:           'token',
  tokenPropertyName:            'token',
  tokenExpireName:              'exp',
  serverTokenEndpoint:          'login/token',
  serverTokenRefreshEndpoint:   'login/token/refresh',
  refreshAccessTokens:          false,
  refreshLeeway:                0,

  authorizationPrefix:          'Bearer ',
  authorizationHeaderName:      'Authorization',
  headers:                      {},

};

export default {
  
  baseURL:                      DEFAULTS.baseURL,
  authenticationRoute:          DEFAULTS.authenticationRoute,
  routeAfterAuthentication:     DEFAULTS.routeAfterAuthentication,
  routeIfAlreadyAuthenticated:  DEFAULTS.routeIfAlreadyAuthenticated,
  refreshAfterInvalidation:     DEFAULTS.refreshAfterInvalidation,
  identificationAttributeName:  DEFAULTS.identificationAttributeName,
  identificationField:          DEFAULTS.identificationField,
  passwordField:                DEFAULTS.passwordField,
  cookieName:                   DEFAULTS.cookieName,
  localStorageKey:              DEFAULTS.localStorageKey,
  tokenAttributeName:           DEFAULTS.tokenAttributeName,
  tokenPropertyName:            DEFAULTS.tokenPropertyName,
  tokenExpireName:              DEFAULTS.tokenExpireName,
  serverTokenEndpoint:          DEFAULTS.serverTokenEndpoint,
  serverTokenRefreshEndpoint:   DEFAULTS.serverTokenRefreshEndpoint,
  refreshAccessTokens:          DEFAULTS.refreshAccessTokens,
  refreshLeeway:                DEFAULTS.refreshLeeway,
  authorizationPrefix:          DEFAULTS.authorizationPrefix,
  authorizationHeaderName:      DEFAULTS.authorizationHeaderName,
  headers:                      DEFAULTS.headers,

  load(config) {
    for (let property in this) {
      if (this.hasOwnProperty(property) && typeOf(this[property]) !== 'function') {
        if (['authenticationRoute', 'routeAfterAuthentication', 'routeIfAlreadyAuthenticated'].indexOf(property) >= 0 && DEFAULTS[property] !== this[property]) {
          deprecate(`Ember Simple Auth: ${property} should no longer be overridden in the configuration. Instead, override the ${property} property in the route.`, false, {
            id: `ember-simple-auth.configuration.routes`,
            until: '2.0.0'
          });
        }

        this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
};
