var root = this;

// Schemas object
root.Schemas = {};

AutoForm.hooks({
  InsertCodeForm: {
    onSuccess: function() {

      // Success message
      toastr.success('Function created successfully');

      // go index
      Router.go('Index');
    }
  },
  UpdateCodeForm: {
    onSuccess: function() {
      var doc = this.currentDoc;

      // Success message
      toastr.success('Function update successfully');

      // go document
      Router.go(doc.absoluteUrl());
    }
  }
});

// Register Template
Template.registerHelper('Schemas', Schemas);
