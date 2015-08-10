Meteor.publishComposite('allCodes', {
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

Meteor.publishComposite('userCodes', function(username) {
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
