var HELPERS = {
  isEqual: function(a, b) {
    return _.isEqual(a, b);
  }
};

_.each(HELPERS, function(fn, name) {

  // Register
  Template.registerHelper(name, fn);
});
