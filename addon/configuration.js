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
  
  baseURL:                      DEFAULTs.baseURL,
  authenticationRoute:          DEFAULTs.authenticationRoute,
  routeAfterAuthentication:     DEFAULTs.routeAfterAuthentication,
  routeIfAlreadyAuthenticated:  DEFAULTs.routeIfAlreadyAuthenticated,
  refreshAfterInvalidation:     DEFAULTs.refreshAfterInvalidation,
  identificationAttributeName:  DEFAULTs.identificationAttributeName,
  identificationField:          DEFAULTs.identificationField,
  passwordField:                DEFAULTs.passwordField,
  cookieName:                   DEFAULTs.cookieName,
  localStorageKey:              DEFAULTs.localStorageKey,
  tokenAttributeName:           DEFAULTs.tokenAttributeName,
  tokenPropertyName:            DEFAULTs.tokenPropertyName,
  tokenExpireName:              DEFAULTs.tokenExpireName,
  serverTokenEndpoint:          DEFAULTs.serverTokenEndpoint,
  serverTokenRefreshEndpoint:   DEFAULTs.serverTokenRefreshEndpoint,
  refreshAccessTokens:          DEFAULTs.refreshAccessTokens,
  refreshLeeway:                DEFAULTs.refreshLeeway,
  authorizationPrefix:          DEFAULTs.authorizationPrefix,
  authorizationHeaderName:      DEFAULTs.authorizationHeaderName,
  headers:                      DEFAULTs.headers,

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
