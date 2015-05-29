'use strict';

var events = require('events'),
    objectAssign = require('object-assign'),
    Q = require('q');

var API = require('./lib/api');

var EventEmitter = events.EventEmitter;

/**
 * Initialize a new OpenSubtitles
 *
 * @param {Object} options
 * @api public
 */

function OpenSubtitles() {
  // if (!(this instanceof OpenSubtitles)) {
  //   return new OpenSubtitles();
  // };

  this.api = new API({
    host: 'api.opensubtitles.org',
    port: 80,
    path: '/xml-rpc'
  });

  EventEmitter.call(this);

  return this;
};

// Make api!
objectAssign(OpenSubtitles.prototype, EventEmitter.prototype);
module.exports = OpenSubtitles;


/**
 * Login on OpenSubtitles API
 *
 * @return {Promise}
 *
 * @api public
 */

OpenSubtitles.prototype.login = function(credentials) {

  return Q.Promise(function(resolve, reject) {

    this.emit('onBeforeLogin', credentials);

    this.api.method('LogIn', credentials).then(function(res) {

      if (res.hasOwnProperty('token')) {
        this.emit('onAfterLogin');
        return resolve(res.token);
      } else {
        this.emit('onErrorLogin');
        return reject(err);
      }

    }.bind(this), function(err){
      this.emit('onErrorLogin');
      return reject(err);
    }.bind(this));

  }.bind(this));

};


/**
 * Logout on OpenSubtitles API
 *
 * @return {Promise}
 *
 * @api public
 */

OpenSubtitles.prototype.logout = function(token) {

  return Q.Promise(function(resolve, reject) {

    this.emit('onBeforeLogout', token);

    this.api.method('LogOut', [token]).then(function(res) {

      if (res.hasOwnProperty('status') && res.status === '200 OK') {
        this.emit('onAfterLogout');
        return resolve(true);
      } else {
        this.emit('onErrorLogout');
        return reject(false);
      }

    }.bind(this), function(err){
      this.emit('onErrorLogout');
      return reject(err);
    }.bind(this));

  }.bind(this));

};


/**
 * Search on OpenSubtitles API
 *
 * @return {Promise}
 *
 * @api public
 */

OpenSubtitles.prototype.search = function(token, search) {

  return Q.Promise(function(resolve, reject) {

    this.emit('onBeforeSearch', [token, search]);

    this.api.method('SearchSubtitles', [
        token,
        [
          search.q
        ],
        {
          limit: search.limit
        }
      ]).then(function(res) {

        if (res.hasOwnProperty('status') && res.status === '200 OK') {
          this.emit('onAfterSearch');
          return resolve(res);
        } else {
          this.emit('onErrorSearch');
          return reject(res);
        }

    }.bind(this), function(err){
      this.emit('onErrorSearch');
      return reject(err);
    }.bind(this));

  }.bind(this));

};

