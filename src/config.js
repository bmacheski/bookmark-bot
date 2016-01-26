const path  = require('path')
  , secrets = require('../secrets').secrets
  ;

module.exports = {
  token: secrets.token,
  dialect: 'sqlite',
  storagePath: path.resolve(__dirname, '../tutorialDb')
}
