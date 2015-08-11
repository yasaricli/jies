Template.codes.helpers({
  codes: function() {
    return Codes.find({ }, { sort: { createdAt: -1 }});
  }
});

Template.code.helpers({
  onSuccess: function() {
    return function() {
      return Router.go('Index');
    }
  }
});
