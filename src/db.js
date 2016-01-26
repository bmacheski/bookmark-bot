'use strict';

const Bookmark  = require('./models').Bookmark
  , parseBmarks = require('./utils').parseBookmarks
  , Sequelize   = require('sequelize')
  ;

/**
 * Database controllers
 */

module.exports.saveBookmark = (parsed) => {
  let category = parsed.category.toLowerCase();
  Bookmark
    .create({
      title: parsed.title,
      category: category,
      url: parsed.url
    })
    .then(() => {
      console.log('saved!');
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
