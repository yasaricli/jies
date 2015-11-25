Router.route('/raw/:username/:name/:app', {
  name: 'Raw',
  where: 'server',
  action(req, res, next) {
    const params = this.params;
    const user = Users.findOne({ username: params.username });

    // USER FOUND
    if (user) {
      const code = Codes.findOne({ userId: user._id, name: params.name });

      if (code) {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        return res.end(code.body);
      }
    }

    res.writeHead(404);
    return res.end('Not found');
  }
});
