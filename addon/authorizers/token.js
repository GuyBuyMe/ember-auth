import Ember from 'ember';
import BaseAuthorizer from './base';
import Configuration from './../configuration';

export default BaseAuthorizer.extend({
  session: Ember.inject.service('session'),

  authorizationPrefix:      'Bearer ',
  tokenPropertyName:        'token',
  authorizationHeaderName:  'Authorization',
 
  init() {
    this.tokenPropertyName = Configuration.tokenPropertyName;
    this.authorizationHeaderName = Configuration.authorizationHeaderName;

    if (Configuration.authorizationPrefix || Configuration.authorizationPrefix === null) {
      this.authorizationPrefix = Configuration.authorizationPrefix;
    }
  },

  authorize(data = {}, block = () => {}) {
    const token = Ember.get(data, this.tokenPropertyName);
    const prefix = this.authorizationPrefix ? this.authorizationPrefix : '';

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      block(this.authorizationHeaderName, prefix + token);
    }
  }
});
