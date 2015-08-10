AutoForm.hooks({
  PushCodeForm: {
    onSuccess: function() {
      Router.go('Index');
    }
  }
});
