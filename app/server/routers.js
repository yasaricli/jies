Router.route('/raw/:username/:name', {
  name: 'Raw',
  where: 'server',
  action: function(req, res, next) {
    var params = this.params,
        user = Users.findOne({ username: params.username }),
        code = Codes.findOne({ userId: user._id, name: params.name });

    if (_.isUndefined(user) || _.isUndefined(code)) {
      res.writeHead(404);
      return res.end('Not found');
    }

    res.writeHead(200, { "Content-Type": "text/javascript" });
    return res.end(code.body);
  }
});