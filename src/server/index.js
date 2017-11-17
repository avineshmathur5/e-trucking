module.exports = function () {
  const { port, apiPrefix } = require('./config');
  const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    expCtrl = require('express-controllers-routes'),
    restResponse = require('express-rest-response'),
    jsonServer = require('json-server'),
    path = require('path');

  //express-rest-response middleware configuration  
  app.use(restResponse({
    showStatusCode: true,
    showDefaultMessage: true
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //use cors for Access-Control-Allow-Origin' issue
  app.use(require('cors')());

  const router = express.Router();

  //check auth and roles using middleware
  app.use(require('./api/auth/checkPermissions'));

  expCtrl.bind(router, __dirname + '/api/controllers/', apiPrefix); // For Api Routing

  app.use(router);

  //connecting database
  require('./db/')();

  app.listen(port, () => {
    console.log('Express App listening on port:', port);
  });
}