Codes = new Mongo.Collection('codes');

Codes.attachSchema(new SimpleSchema({

  name: {
    type: String,
    denyUpdate: true,
    regEx: /^[a-z0-9A-Z]{3,15}$/,
    autoform: {
      label: false,
      placeholder: 'Name',
      class: 'field-light block full-width mt2'
    }
  },

  desc: {
    type: String,
    autoform: {
      label: false,
      placeholder: 'Description',
      class: 'field-light full-width block mt2 mb2'
    }
  },

  readme: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea',
      label: false,
      placeholder: 'Readme',
      class: 'field-light full-width block mt2 mb2'
    }
  },

  userId: {
    type: String,
    denyUpdate: true,
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
      type: 'textarea',
      label: false
    }
  }
}));

Codes.helpers({
  user: function() {
    return Users.findOne(this.userId);
  },

  isOwner: function() {
    return _.isEqual(this.userId, Meteor.userId());
  },

  absoluteUrl: function() {
    return Router.url('Code', {
      name: this.name,
      username: this.user().username
    });
  }
});

if (Meteor.isServer) {
  Codes.before.insert(function(userId, doc) {
    var code = Codes.findOne(_.pick(doc, ['userId', 'name']));

    if (code) {
      doc.name = Random.id(10);
    }
  });
}
