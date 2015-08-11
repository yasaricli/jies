Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'Index',
  waitOn: function() {
    return Meteor.subscribe('codes');
  }
});

Router.route('/profile/:username', {
  name: 'Codes',
  waitOn: function() {
    return Meteor.subscribe('profile', this.params.username);
  }
});

Router.route('/profile/:username/:name', {
  name: 'Code',
  waitOn: function() {
    return Meteor.subscribe('code', this.params.name);
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

Router.route('/push', {
  name: 'InsertCode'
});

Router.route('/profile/:username/:name/update', {
  name: 'UpdateCode',
  waitOn: function() {
    return Meteor.subscribe('code', this.params.name);
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

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
