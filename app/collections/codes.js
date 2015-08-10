Codes = new Mongo.Collection('codes');

Codes.attachSchema(new SimpleSchema({

  name: {
    type: String,
    regEx: /^[a-z]{3,15}$/,
  },

  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      }
    },
    autoform: {
      type: 'hidden'
    }
  },

  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    },
    autoform: {
      type: 'hidden'
    }
  },

  body: {
    type: String,
    autoform: {
      type: 'textarea'
    }
  }
}));
