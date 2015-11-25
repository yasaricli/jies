const root = this;

root.onDestroyedTemplates = (templates, call) => {
  return _.each(templates, function(name) {
    const template = Template[name];
    template.onDestroyed(call);
  });
};

root.isAuthenticated = (callback) => {
  return function() {
    if (Meteor.userId()) {
      callback.call(this, Meteor.user());
    }
  }
}
