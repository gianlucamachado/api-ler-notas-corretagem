const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const dotenv = require('dotenv').config().parsed;
const consign = require('consign');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', dotenv.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  // ENDPOINTS
  const path = {};
  path.cwd = 'api';

  consign(path)
    .then('validators')
    .then('helpers')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};