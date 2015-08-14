var root = this;


root.onDestroyedTemplates = function(templates, call) {
  return _.each(templates, function(name) {
    var template = Template[name];
    template.onDestroyed(call);
  });
};

root.isAuthenticated = function(callback) {
  return function() {
    if (Meteor.userId()) {
      callback.call(this, Meteor.user());
    }
  }
}
