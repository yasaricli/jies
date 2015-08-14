Meteor.publishComposite('codes', function() {
  return {
    find: function() {
      return Codes.find({});
    },
    children: [
      {
        find: function(code) {
          return Users.find({ _id: code.userId });
        }
      },
      {
        find: function(code) {
          return Stars.find({ codeId: code._id });
        }
      }
    ]
  }
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
      },

      {
        find: function(code) {
          return Stars.find({ codeId: code._id });
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
