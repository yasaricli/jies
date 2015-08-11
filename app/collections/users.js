Users = Meteor.users;

Users.helpers({
  codes: function() {
    return Codes.find({ username: this.username });
  }
});
