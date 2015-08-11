AutoForm.hooks({
  InsertCodeForm: {
    onSuccess: function() {
      Router.go('Index');
    }
  },
  UpdateCodeForm: {
    onSuccess: function() {
      var doc = this.currentDoc;
      Router.go(doc.absoluteUrl());
    }
  }
});
