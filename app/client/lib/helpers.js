const HELPERS = {
  isEqual(a, b) {
    return _.isEqual(a, b);
  }
};

_.each(HELPERS, (fn, name) => {

  // Register
  Template.registerHelper(name, fn);
});
