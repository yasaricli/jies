var root = this;

root.getUser = function(username) {
  return Users.findOne({ username: username });
}
