Template.code.events({
  'click .star': isAuthenticated(function() {
    var code = this.code();

    if (code.isStar()) {
      return Stars.remove(code.star()._id);
    }

    return Stars.insert({
      codeId: code._id
    });
  })
});
