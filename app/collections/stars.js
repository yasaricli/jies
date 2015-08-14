Stars = new Mongo.Collection('stars');

Stars.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    },
  },

  codeId: {
    type: String
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
}));

Stars.helpers({
  user: function() {
    return Users.findOne(this.userId);
  }
});
