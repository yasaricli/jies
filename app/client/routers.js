Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'Index',
  waitOn: function() {
    return Meteor.subscribe('allCodes');
  }
});

Router.route('/user/:username', {
  name: 'Codes',
  waitOn: function() {
    return Meteor.subscribe('userCodes', this.params.username);
  }
});

Router.route('/user/:username/:name', {
  name: 'Code',
  waitOn: function() {
    return Meteor.subscribe('userCodes', this.params.username);
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
  name: 'Push'
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
