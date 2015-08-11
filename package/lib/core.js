var request = require('request'),
   fs = require('fs'),
    _ = require('underscore'),

    helpers = require('../lib/helpers.js');

// init require colors
require('colors');

var ROOT_URL = 'http://jies.meteor.com/',
    FN_FILENAME = 'jies.js';

exports.Init = function(functions) {
  this.getUrl = function(username, name, app) {
    return ROOT_URL + 'raw/' + username + '/' + name + '/' + app;
  };

  this.include = function(functions, app, success, fail) {
    var self = this,
        stream = fs.createWriteStream(FN_FILENAME);

    stream.once('open', function() {

      // Header write
      stream.write(helpers.getHelper('fileHeader', functions));

      _.each(functions, function(name) {
        var split = name.split(':'); // username:name --> ['username', 'name']

        request(self.getUrl(split[0], split[1], app), function(error, response, body) {

          // if function found then 200
          switch(response.statusCode) {
            case 200:
              stream.write(helpers.getHelper('fileComment', name));
              stream.write(helpers.getHelper('fileScope', body));

              // success
              success && success(name);
            break;

            // function not defined then 404
            case 404:

              // fail
              fail && fail(name);
            break;
          };
        });
      });
    });
  };

  // RETURN Recursion SELF.
  return this;
};
