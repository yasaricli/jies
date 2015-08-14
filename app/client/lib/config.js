Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Avatar.setOptions({
  gravatarDefault: "retro",
  imageSizes: {
    'big': 160,
    'low-small': 24
  }
});
