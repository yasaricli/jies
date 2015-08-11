Router.route('/raw/:username/:name/:app', {
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

    var app = Codes.findOne({ _id: code._id, 'installs.name': params.app });
    if (app) {

      // $INC +1
      Codes.update({ _id: code._id, 'installs.name': params.app }, {
        $inc: {
          'installs.$.quantity': 1 
        }
      });

    } else {

      // $PUSH APP
      Codes.update(code._id, {
        $push: {
          installs: {
            name: params.app,
            quantity: 1
          }
        }
      });
    }

    res.writeHead(200, { "Content-Type": "text/javascript" });
    return res.end(code.body);
  }
});
