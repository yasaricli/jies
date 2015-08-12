var request = require('request'),
   fs = require('fs'),
    _ = require('underscore'),

    helpers = require('../lib/helpers.js');

// init require colors
require('colors');

var ROOT_URL = 'http://jies.meteor.com/';

exports.Init = function(functions) {
  this.getUrl = function(username, name, app) {
    return ROOT_URL + 'raw/' + username + '/' + name + '/' + app;
  };

  this.include = function(options, success, fail) {
    var self = this, stream, opt;

    // default options
    opt = _.extend({ file: 'jies.js' }, options);

    // stream file
    stream = fs.createWriteStream(opt.file);

    stream.once('open', function() {

      // Header write
      stream.write(helpers.getHelper('fileHeader', options.functions));

      _.each(options.functions, function(name) {
        var split = name.split(':'); // username:name --> ['username', 'name']

        request(self.getUrl(split[0], split[1], options.name), function(error, response, body) {

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
