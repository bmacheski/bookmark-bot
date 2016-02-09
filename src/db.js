'use strict';

const Bookmark  = require('./models').Bookmark
  , parseBmarks = require('./utils').parseBookmarks
  ;

/**
 * Database controllers
 */

module.exports.saveBookmark = (parsed, channel) => {
  let category = parsed.category.toLowerCase();
  Bookmark
    .create({
      title: parsed.title,
      category: category,
      url: parsed.url
    })
    .then(() => {
      channel.send('Saved that for you!')
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
      if (entry.length) {
        let parsed = parseBmarks(entry);
        channel.send(parsed);
      } else {
        channel.send('Couldn\'t find that category. Try something else.')
      }
    })
}
