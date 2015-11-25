Migrations.add('codes-username', () => {
  Codes.find({}).map((doc) => {
    const user = getUserById(doc.userId);

    // Update
    Codes.update(doc._id, {
      $set: {
        username: user.username
      }
    }, { validate: false });
  });
});
