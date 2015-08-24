var root = this;

root.getUserById = function(_id) {
  return Users.findOne(_id);
}
