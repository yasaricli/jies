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

      // code --> stars
      {
        find: function(code) {
          return Stars.find({ codeId: code._id });
        },

        // star --> users
        children: [
          {
            find: function(star) {
              return Users.find({ _id: star.userId });
            }
          }
        ]
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

      // code --> users
      {
        find: function(code) {
          return Users.find({ _id: code.userId });
        }
      },

      // code --> stars
      {
        find: function(code) {
          return Stars.find({ codeId: code._id });
        },

        // star --> users
        children: [
          {
            find: function(star) {
              return Users.find({ _id: star.userId });
            }
          }
        ]
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
        },

        // code --> stars
        children: [
          {
            find: function(code) {
              return Stars.find({ codeId: code._id });
            },

            // star --> users
            children: [
              {
                find: function(star) {
                  return Users.find({ _id: star.userId });
                }
              }
            ]
          }
        ]
      }
    ]
  }
});
