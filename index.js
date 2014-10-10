/*!
 * qn-cnpm - index.js
 *
 * Copyright(c) cnpmjs.org and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *  dead_horse <dead_horse@qq.com> (https://github.com/dead-horse)
 */

'use strict';

/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var qn = require('qn');
var fs = require('fs');

/**
 * Expose `Client`
 */

module.exports = Client;

/**
 * qn cnpm wrapper
 * @param {Object} options for qn client
 */
function Client(options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  this.client = qn.create(options);
  thunkify(this.client, ['delete', 'uploadFile', 'upload', 'download']);
}

/**
 * Upload file
 *
 * @param {String} filepath
 * @param {Object} options
 *  - {String} key
 *  - {Number} size
 */
Client.prototype.upload = function* (filepath, options) {
  try {
    yield this.client.delete(options.key);
  } catch (err) {
    // ignore error here
  }

  var res = yield this.client.uploadFile(filepath, {
    key: options.key,
    size: options.size
  });

  return { url: parseUrl(res) };
};

Client.prototype.uploadBuffer = function* (buf, options) {
  try {
    yield this.client.delete(options.key);
  } catch (err) {
    // ignore error here
  }

  var res = yield this.client.upload(buf, {key: options.key});
  return { url: parseUrl(res) };
};

function parseUrl(res) {
  if (!res || !res[0] || !res[0].url) {
    return null;
  }
  var url = res[0].url;
  if (url.indexOf('http') !== 0) {
    url = 'http://' + url;
  }
  return url;
}

Client.prototype.url = function (key) {
  return this.client.resourceURL(key);
};

Client.prototype.download = function* (key, filepath, options) {
  var writeStream = fs.createWriteStream(filepath);
  yield this.client.download(key, {
    timeout: options.timeout,
    writeStream: writeStream
  });
};

Client.prototype.remove = function* (key) {
  try {
    return yield this.client.delete(key);
  } catch (err) {
    if (err.name === 'QiniuFileNotExistsError') {
      return;
    }
    throw err;
  }
};
