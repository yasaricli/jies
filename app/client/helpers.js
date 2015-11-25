Template.codes.helpers({
  codes() {
    return Codes.find({ }, { sort: { createdAt: -1 }});
  }
});

Template.code.helpers({
  onSuccess() {
    return function() {

      // Success message
      toastr.success('Function remove successfully');

      return Router.go('Index');
    }
  }
});

Template.user.helpers({
  userId() {
    return Meteor.userId();
  }
});
