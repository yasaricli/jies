Security.defineMethod("ifIsCurrentUser", {
  fetch: [],
  transform: null,
  deny(type, arg, userId, doc) {
    return userId !== doc.userId;
  }
});

Security.defineMethod("ifStarNotThen", {
  fetch: [],
  transform: null,
  deny(type, arg, userId, doc) {
    const star = Stars.findOne({ userId: userId, codeId: doc.codeId });
    return star;
  }
});

// ifLoggedIn INSERT
Codes.permit('insert').ifLoggedIn().apply();

// ifIsCurrentUser UPDATE || REMOVE
Codes.permit(['update', 'remove']).ifIsCurrentUser().apply();

// if not star and current user then
Stars.permit('insert').ifStarNotThen().ifIsCurrentUser().apply();

// if current user then
Stars.permit('remove').ifIsCurrentUser().apply();

// update allow function is never being
Stars.permit('update').never().apply();
