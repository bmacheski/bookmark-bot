'use strict';

const Bookmark  = require('./models').Bookmark
  , parseBmarks = require('./utils').parseBookmarks
  , Sequelize   = require('sequelize')
  ;

/**
 * Database controllers
 */

module.exports.saveBookmark = (parsed) => {
  Bookmark
    .sync({ force: true })
    .then(() => {
      return Bookmark.create({
        title: parsed.title,
        category: parsed.category,
        url: parsed.url
      });
    })
}

module.exports.findBookmarks = (search, channel) => {
  Bookmark
    .findAll({
      where: {
        category: {
          $like: '%' + search + '%'
        }
      },
      raw: true
    })
    .then((entry) => {
      let parsed = parseBmarks(entry);
      channel.send(parsed);
    })
}
