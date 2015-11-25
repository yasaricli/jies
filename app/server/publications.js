Meteor.publishComposite('codes', () => {
  return {
    find() {
      return Codes.find({});
    },

    children: [
      {
        find(code) {
          return Users.find({ _id: code.userId });
        }
      },

      // code --> stars
      {
        find(code) {
          return Stars.find({ codeId: code._id });
        },

        // star --> users
        children: [
          {
            find(star) {
              return Users.find({ _id: star.userId });
            }
          }
        ]
      }
    ]
  }
});

Meteor.publishComposite('code', (username, name) => {
  return {
    find() {
      const user = Users.findOne({ username: username });
      if (user) {
        return Codes.find({ userId: user._id, name: name });
      }
    },

    children: [

      // code --> users
      {
        find(code) {
          return Users.find({ _id: code.userId });
        }
      },

      // code --> stars
      {
        find(code) {
          return Stars.find({ codeId: code._id });
        },

        // star --> users
        children: [
          {
            find(star) {
              return Users.find({ _id: star.userId });
            }
          }
        ]
      }
    ]
  }
});

Meteor.publishComposite('profile', (username) => {
  return {
    find() {
      return Users.find({ username: username });
    },

    children: [
      {
        find(user) {
          return Codes.find({ userId: user._id });
        },

        // code --> stars
        children: [
          {
            find(code) {
              return Stars.find({ codeId: code._id });
            },

            // star --> users
            children: [
              {
                find(star) {
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
