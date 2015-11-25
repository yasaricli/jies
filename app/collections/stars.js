Stars = new Mongo.Collection('stars');

Stars.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    autoValue() {
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
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
}));

Stars.helpers({
  user() {
    return Users.findOne(this.userId);
  }
});
