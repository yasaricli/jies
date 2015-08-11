var request = require('request'),
   fs = require('fs'),
    _ = require('underscore');

// init require colors
require('colors');

var ROOT_URL = 'http://jies.meteor.com/',
    FN_FILENAME = 'jies.js';

exports.Init = function(functions) {

  // COMMENT
  this.comment = function(text) {
    var out = '//#################################\n';
    out += '// Jies || ' + text + '\n'
    out += '//#################################\n';
    return out;
  };

  // JS SCOPE
  this.scope = function(code) {
    var out = '(function() {\n\n';
    out += code;
    out += '\n\n}).call(this);';
    return out
  };

  this.getUrl = function(username, name) {
    return ROOT_URL + 'raw/' + username + '/' + name;
  };

  this.include = function(functions, callback) {
    var self = this,
        stream = fs.createWriteStream(FN_FILENAME);

    stream.once('open', function() {
      stream.write('\n\n');
      _.each(functions, function(name) {
        var split = name.split(':'); // username:name --> ['username', 'name']

        request(self.getUrl(split[0], split[1]), function(error, response, body) {

          // if function found then 200
          switch(response.statusCode) {
            case 200:
              stream.write(self.comment(name));
              stream.write(self.scope(body));
              stream.write('\n\n');

              callback && callback(name);
            break;

            // function not defined then 404
            case 404:
              console.log(name + ' Not defined');
            break;
          };
        });
      });
    });
  };

  // RETURN Recursion SELF.
  return this;
};
