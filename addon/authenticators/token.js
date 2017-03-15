import Ember from 'ember';
import BaseAuthenticator from './base';
import Configuration from './../configuration';

const { RSVP: { Promise }, run } = Ember;


export default BaseAuthenticator.extend({

  serverTokenEndpoint: '/api/token-auth/',
  identificationField: 'username',
  passwordField: 'password',
  tokenPropertyName: 'token',
  headers: {},


  init() {
    this.serverTokenEndpoint = Configuration.serverTokenEndpoint;
    this.identificationField = Configuration.identificationField;
    this.passwordField = Configuration.passwordField;
    this.tokenPropertyName = Configuration.tokenPropertyName;
    this.headers = Configuration.headers;
  },

  restore(properties) {
    const propertiesObject = Ember.Object.create(properties);

    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(propertiesObject.get(this.tokenPropertyName))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },

  authenticate(credentials, headers) {
    return new Promise((resolve, reject) => {
      const data = this.getAuthenticateData(credentials);

      this.makeRequest(data, headers).then(
      (response) => {
        run(null, resolve, this.getResponseData(response));
      },
      (xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },

  getAuthenticateData(credentials) {
    const authentication = {
      [this.passwordField]: credentials.password,
      [this.identificationField]: credentials.identification
    };

    return authentication;
  },

  getResponseData(response) {
    return response;
  },

  invalidate() {
    return Ember.RSVP.resolve();
  },

  makeRequest(data, headers) {
    return Ember.$.ajax({
      url: this.serverTokenEndpoint,
      method: 'POST',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      headers: this.headers,
      beforeSend: (xhr, settings) => {
        if(this.headers['Accept'] === null || this.headers['Accept'] === undefined) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        }

        if (headers) {
          Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
          });
        }
      }
    });
  }
});
