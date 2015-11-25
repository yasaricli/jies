Codes = new Mongo.Collection('codes');

// name is the field of the documents to search over
Codes.initEasySearch('name', {
  use: 'mongo-db'
});

Codes.attachSchema(new SimpleSchema({

  name: {
    type: String,
    denyUpdate: true,
    regEx: /^[a-z0-9A-Z]{3,15}$/,
    autoform: {
      label: false,
      placeholder: 'Name',
      class: 'field-light block full-width mt2 big h2'
    }
  },

  desc: {
    type: String,
    autoform: {
      label: false,
      placeholder: 'Description',
      class: 'field-light full-width block mt2 mb2 big h2'
    }
  },

  readme: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea',
      label: false,
      placeholder: 'Readme (optional)',
      class: 'field-light full-width block mt2 mb2'
    }
  },

  userId: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (this.isInsert) {
        return this.userId;
      }
    },
    autoform: {
      type: 'hidden'
    }
  },

  username: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (this.isInsert) {
        const user = getUserById(this.userId);
        if (user) {
          return user.username;
        }
      }
    },
    autoform: {
      type: 'hidden'
    }
  },

  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue() {
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
  user() {
    return Users.findOne(this.userId);
  },

  stars() {
    return Stars.find({ codeId: this._id });
  },

  isOwner() {
    return _.isEqual(this.userId, Meteor.userId());
  },

  star() {
    return Stars.findOne({ userId: Meteor.userId(), codeId: this._id });
  },

  isStar() {
    return !!this.star();
  },

  absoluteUrl() {
    return Router.url('Code', {
      name: this.name,
      username: this.user().username
    });
  }
});

if (Meteor.isServer) {
  Codes.before.insert((userId, doc) => {
    const code = Codes.findOne(_.pick(doc, ['userId', 'name']));

    if (code) {
      doc.name = Random.id(10);
    }
  });
}
