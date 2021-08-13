const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const consign = require('consign');
const dotenv = require('dotenv');

const app = express();

// Apply .env in process.env
dotenv.config();

// Set env
app.env = process.env.NODE_ENV.trim();

// Base dir
app.baseDir = __dirname;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, X-Auth-Context, X-Socket-Id, Content-Type, Accept');
  next();
});

// Meus modulos
const packageJSON = require('../package.json');

// Modulo do body-parser
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));

// Helmet para adicionar algumas camadas de segurança
app.use(helmet());

// Moment config
const moment = require('moment');
require('moment/locale/pt-br');

moment.locale('pt-BR');
app.moment = moment;

consign({ cwd: 'src' })
  .include('db.js')
  .then('repositories')
  .then('controllers')
  .then('routes')
  .then('utils')
  .into(app);

// Startup the server
app.listen(process.env.PORT, () => {
  console.log(`Serviço: ${packageJSON.name} | Porta: ${process.env.PORT}`);
});

module.exports = app;
