const express = require('express');
const app = express()
const morgan = require('morgan');
const {mongoose} = require('./database');

const routes = require('./routes/routes.js');
const server = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  app.use(require('./routes/routes'));

  module.exports = app;