var root = this;


root.onDestroyedTemplates = function(templates, call) {
  return _.each(templates, function(name) {
    var template = Template[name];
    template.onDestroyed(call);
  });
};
