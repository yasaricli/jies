// init require colors
require('colors');

var HELPERS = {
  log: function(str) {
    return console.log(str);
  },

  startedLog: function() {
    this.log('\nJies: Javascript Functions'.bold.blue);
    this.log('------------------------------------------------\n'.bold.blue);
  },

  validLog: function() {
    this.log('\nValid Actions'.bold);
    this.log('-------------'.bold);
    this.log('init          - Initialize a Jies project'.bold);
    this.log('install       - Install functions'.bold);
  },

  notExistLog: function() {
    this.log('jies.json file does not exist!\n'.red.bold);
  },

  alreadyLog: function() {
    this.log('A Project Already Exists'.red.bold);
  },

  // JIES.js file Helpers

  fileHeader: function(functions) {
      var out = '/*\n' +
                ' * jies - This is a generated file \n' +
                ' * https://github.com/yasaricli/jies\n' +
                ' * \n' +
                ' * ## FUNCTIONS ##\n' +
                ' * ' + functions.join('\n * ') +
                ' \n */ \n\n\n';
      return out;
  },

  // COMMENT
  fileComment: function(text) {
    var out = '//#################################\n' +
              '// Jies || ' + text + '\n' +
              '//#################################\n';
    return out;
  },

  // JS SCOPE
  fileScope: function(code) {
    var out = '(function() {' +
              '\n\n' + code + '\n\n' +
              '}).call(this); \n\n';
    return out;
  }
};

exports.getHelper = function(prop, args) {

  // Helpers object
  return HELPERS[prop].call(HELPERS, args);
}
