const root = this;

root.getUserById = (_id) => {
  return Users.findOne(_id);
}
