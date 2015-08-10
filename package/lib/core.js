var request = require('request'),
   fs = require('fs'),
    _ = require('underscore');

exports.Init = function(functions) {
  this.root = 'http://jies.meteor.com/';

  this.comment = function(text) {
    var out = '//#################################\n';
    out += '// Jies || ' + text + '\n'
    out += '//#################################\n';
    return out;
  };

  this.scope = function(code) {
    var out = '(function() {\n\n';
    out += code;
    out += '\n\n}).call(this);';
    return out
  };

  this.getUrl = function(username, name) {
    return this.root + 'raw/' + username + '/' + name;
  };

  this.include = function(functions, callback) {
    var self = this,
        stream = fs.createWriteStream("jies.js");

    stream.once('open', function() {
      stream.write('\n\n');
      _.each(functions, function(name) {
        var split = name.split(':');

        request(self.getUrl(split[0], split[1]), function(error, response, body) {
          switch(response.statusCode) {
            case 200:
              stream.write(self.comment(name));
              stream.write(self.scope(body));
              stream.write('\n\n');

              callback && callback(name);
            break;

            case 404:
              console.log(name + ' Not defined');
            break;
          };
        });
      });
    });
  };

  return this;
};
