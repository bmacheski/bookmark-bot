'use strict';

const Bot    = require('./bot')
    , http   = require('http')
    , config = require('./config')
    ;

const token = config.token;
const bot   = new Bot(token);

bot.initialize();

http.createServer((req, res) => {
  res.end('bot started.');
}).listen(3000)
