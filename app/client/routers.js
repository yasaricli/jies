Router.route('/', {
  name: 'Index'
});

Router.route('/codes', {
  name: 'Codes',
  waitOn() {
    return Meteor.subscribe('codes');
  }
});

Router.route('/push', {
  name: 'InsertCode'
});

Router.route('/settings', {
  name: 'Settings'
});

Router.route('/~:username', {
  name: 'Profile',
  waitOn() {
    return Meteor.subscribe('profile', this.params.username);
  },
  data() {
    const params = this.params;
    return {
      user() {
        return Users.findOne({ username: params.username });
      }
    }
  }
});

Router.route('/~:username/:name', {
  name: 'Code',
  waitOn() {
    const params = this.params;
    return Meteor.subscribe('code', params.username, params.name);
  },
  data() {
    const params = this.params;
    return {
      code() {
        return Codes.findOne({ name: params.name });
      }
    }
  }
});

Router.route('/~:username/:name/update', {
  name: 'UpdateCode',
  waitOn() {
    var params = this.params;
    return Meteor.subscribe('code', params.username, params.name);
  },
  data() {
    const params = this.params;
    return {
      code() {
        return Codes.findOne({ name: params.name });
      }
    }
  }
});

Router.plugin('ensureSignedIn', {
  only: ['InsertCode', 'UpdateCode', 'Settings']
});
