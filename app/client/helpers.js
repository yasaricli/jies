Template.codes.helpers({
  codes: function() {
    return Codes.find({ }, { sort: { createdAt: -1 }});
  }
});
