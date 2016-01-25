'use strict';

const config  = require('./config')
  , Sequelize = require('sequelize')
  ;

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: config.dialect,
  storage: config.storagePath
});

const Bookmark = sequelize.define('Bookmark', {
  id:       { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  title:    { type: Sequelize.STRING },
  category: { type: Sequelize.STRING },
  url:      { type: Sequelize.STRING },
  channel:  { type: Sequelize.STRING }
}, {
  tableName: 'bookmarks'
});

module.exports = {
  Bookmark: Bookmark
}
