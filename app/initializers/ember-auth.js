import ENV from '../config/environment';
import Configuration from 'ember-auth/configuration';
import setupSession from 'ember-auth/initializers/setup-session';
import setupSessionService from 'ember-auth/initializers/setup-session-service';

export default {
  name: 'ember-auth',

  initialize(registry) {
    const config = ENV['ember-auth'] || {};
    config.baseURL = ENV.rootURL || ENV.baseURL;
    Configuration.load(config);

    setupSession(registry);
    setupSessionService(registry);
  }
};
