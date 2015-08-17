Relationships = new Mongo.Collection('relationships');

Relationships.attachSchema(new SimpleSchema({
  followerId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    }
  },

  followingId: {
    type: String
  }
}));
