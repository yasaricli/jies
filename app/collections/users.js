Users = Meteor.users;

Users.helpers({
  codes() {
    return Codes.find({ username: this.username });
  }
});
