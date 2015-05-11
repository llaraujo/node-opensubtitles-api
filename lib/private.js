'use strict';

var events = require('events'),
    objectAssign = require('object-assign'),
    xmlrpc = require('xmlrpc')

var EventEmitter = events.EventEmitter;

objectAssign(exports, EventEmitter.prototype);

/**
 * Encapsule service to request's call of OpenSubtitles xmlrpc
 *
 * @return {this}
 *
 * @api private
 */

exports._service = function() {
  this._client = xmlrpc.createClient({ host: 'api.opensubtitles.org', port: 80, path: '/xml-rpc'});

  return this;
};

/**
 * Encapsule function to request call of OpenSubtitles xmlrpc
 *
 * @return {this}
 *
 * @api private
 */

exports._service.prototype.methodCall = function(method, parameters){

  return Q.Promise(function(resolve, reject) {

    this._client.methodCall(method, parameters, function (err, res) {

      if (err) {
        console.log('[opensubtitles-api] ' + method + ' error: ' + err);
        return reject(false);
      };

      this._token = res.token;

      return resolve(true);

    }.bind(this));

  }.bind(this));

};
