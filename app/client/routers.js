Router.route('/', {
  name: 'Index',
  waitOn: function() {
    return Meteor.subscribe('codes');
  }
});

Router.route('/codes', {
  name: 'Codes',
  waitOn: function() {
    return Meteor.subscribe('codes');
  }
});

Router.route('/push', {
  name: 'InsertCode'
});

Router.route('/~:username', {
  name: 'Profile',
  waitOn: function() {
    return Meteor.subscribe('profile', this.params.username);
  },
  data: function() {
    var params = this.params;
    return {
      user: function() {
        return Users.findOne({ username: params.username });
      }
    }
  }
});

Router.route('/~:username/:name', {
  name: 'Code',
  waitOn: function() {
    var params = this.params;
    return Meteor.subscribe('code', params.username, params.name);
  },
  data: function() {
    var params = this.params;
    return {
      code: function() {
        return Codes.findOne({ name: params.name });
      }
    }
  }
});

Router.route('/~:username/:name/update', {
  name: 'UpdateCode',
  waitOn: function() {
    var params = this.params;
    return Meteor.subscribe('code', params.username, params.name);
  },
  data: function() {
    var params = this.params;
    return {
      code: function() {
        return Codes.findOne({ name: params.name });
      }
    }
  }
});
