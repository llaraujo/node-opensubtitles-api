'use strict';

var events = require('events'),
    objectAssign = require('object-assign'),
    Q = require('q'),
    xmlrpc = require('xmlrpc')

var EventEmitter = events.EventEmitter;

/**
 * Initialize a new API
 *
 * @param {Object} options
 * @api public
 */

function API(options) {
  if (!(this instanceof API)) {
    return new API(options);
  };
  this._service = xmlrpc.createClient(options);
  EventEmitter.call(this);
};

objectAssign(API.prototype, EventEmitter.prototype);
module.exports = API;

/**
 * Get data from OpenSubtitles API
 *
 * @return {Promise}
 *
 * @api public
 */

API.prototype.method = function(method, data){

  return Q.Promise(function(resolve, reject) {

    this._service.methodCall(method, data, function (err, res) {

      if (err) {
        return reject(err);
      }

      return resolve(res);

    }.bind(this));

  }.bind(this));

};
