Security.defineMethod("ifIsCurrentUser", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.userId;
  }
});

// ifLoggedIn INSERT
Codes.permit('insert').ifLoggedIn().apply();

// ifIsCurrentUser UPDATE || REMOVE
Codes.permit(['update', 'remove']).ifIsCurrentUser().apply();
