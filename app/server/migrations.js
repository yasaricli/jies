Migrations.add('codes-username', function() {
  Codes.find({}).map(function(doc) {
    var user = getUserById(doc.userId);

    // Update
    Codes.update(doc._id, {
      $set: {
        username: user.username
      }
    }, { validate: false });
  });
});
