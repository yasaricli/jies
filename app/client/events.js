Template.code.events({
  'click .star': isAuthenticated(() => {
    const code = this.code();

    if (code.isStar()) {
      return Stars.remove(code.star()._id);
    }

    return Stars.insert({
      codeId: code._id
    });
  })
});

Template.user.events({
  'click .logout'(event) {
    event.preventDefault();

    // logout
    AccountsTemplates.logout();
  }
});
