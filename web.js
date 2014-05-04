  var app, controller, dburl, express, port, server;

  express = require('express');

  app = express();

  server = require('http').createServer(app);

  app.configure(function() {
    app.use(express["static"](__dirname + '/dist'));
    return app.use(express.json()).use(express.urlencoded());
  });

  port = "5000";

  server.listen(process.env.PORT || port);