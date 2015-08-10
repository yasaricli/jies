Codes = new Mongo.Collection('codes');

Codes.attachSchema(new SimpleSchema({

  name: {
    type: String,
    regEx: /^[a-z]{3,15}$/,
  },

  desc: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea',
      label: 'Description'
    }
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

Codes.helpers({
  user: function() {
    return Users.findOne(this.userId);
  }
});
