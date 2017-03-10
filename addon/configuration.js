import Ember from 'ember';

const { getWithDefault, typeOf, deprecate } = Ember;

const DEFAULTS = {
  baseURL:                      '',
  authenticationRoute:          'login',
  routeAfterAuthentication:     'index',
  routeIfAlreadyAuthenticated:  'index',
  refreshAfterInvalidation:     false,
  serverTokenEndpoint:          'login',
  tokenAttributeName:           'token',
  identificationAttributeName:  'email',
  cookieName:                   'ember-auth:session',
  localStorageKey:              'ember-auth:session',
};

export default {
  
  baseURL:                      DEFAULTS.baseURL,
  authenticationRoute:          DEFAULTS.authenticationRoute,
  routeAfterAuthentication:     DEFAULTS.routeAfterAuthentication,
  routeIfAlreadyAuthenticated:  DEFAULTS.routeIfAlreadyAuthenticated,
  refreshAfterInvalidation:     DEFAULTS.refreshAfterInvalidation,
  serverTokenEndpoint:          DEFAULTS.serverTokenEndpoint,
  tokenAttributeName:           DEFAULTS.tokenAttributeName,
  identificationAttributeName:  DEFAULTS.identificationAttributeName,
  cookieName:                   DEFAULTS.cookieName,
  localStorageKey:              DEFAULTS.localStorageKey,

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
