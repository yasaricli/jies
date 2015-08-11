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
  }
};

exports.getHelper = function(prop, args) {

  // Helpers object
  return HELPERS[prop].call(HELPERS, args);
}
