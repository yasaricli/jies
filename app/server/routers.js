Router.route('/raw/:username/:name/:app', {
  name: 'Raw',
  where: 'server',
  action: function(req, res, next) {
    var params = this.params,
        user = Users.findOne({ username: params.username });

    // USER FOUND
    if (user) {
      var code = Codes.findOne({ userId: user._id, name: params.name });

      // CODE FOUND
      if (code) {
        var app = Codes.findOne({ _id: code._id, 'installs': params.app });

        if (_.isUndefined(app)) {

          // $PUSH APP
          Codes.update(code._id, {
            $push: {
              installs: params.app
            }
          });
        }

        res.writeHead(200, { "Content-Type": "text/javascript" });
        return res.end(code.body);
      }
    }

    res.writeHead(404);
    return res.end('Not found');
  }
});
