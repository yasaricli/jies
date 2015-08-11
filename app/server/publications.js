Meteor.publishComposite('codes', {
  find: function() {
    return Codes.find({ });
  },
    children: [
      {
        find: function(code) {
          return Users.find(code.userId);
        }
      }
    ]
});

Meteor.publishComposite('code', function(username, name) {
  return {
    find: function() {
      var user = Users.findOne({ username: username });
      if (user) {
        return Codes.find({ userId: user._id, name: name });
      }
    },

    children: [
      {
        find: function(code) {
          return Users.find({ _id: code.userId });
        }
      }
    ]
  }
});

Meteor.publishComposite('profile', function(username) {
  return {
    find: function() {
      return Users.find({ username: username });
    },

    children: [
      {
        find: function(user) {
          return Codes.find({ userId: user._id });
        }
      }
    ]
  }
});
