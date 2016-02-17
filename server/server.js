'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os');
const express = require('express');
const RoutesConfig = require('./config/routes.conf');
const DBConfig = require('./config/db.conf');
const SocketConf = require('./config/socket.io.conf');
const Routes = require('./routes/index');

const app = express();
const http = require('http').Server(app);
const sticky = require('sticky-session');

sticky.listen(http, PORT);

RoutesConfig.init(app, express);
DBConfig.init();
SocketConf.init(http);
Routes.init(app, express.Router());

console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
console.log(`enviroment: ${process.env.NODE_ENV}`);
