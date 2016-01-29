'use strict';

const createHelpMessage = () => {
  let helpMessage = '';
  helpMessage += 'Beep boop. Welcome. I am BookmarkBot. \n';
  helpMessage += 'To save a bookmark, I will need data with a title, category and url. \n';
  helpMessage += 'An example would be as follows: \n';
  helpMessage += '`title: Concurrency in Rust category: Rust url: www.youtube.com` \n';
  helpMessage += 'To retrieve bookmarks use `find` or `get` `bookmark name`\n';
  helpMessage += 'An example would be `get node` or `find node`';
  return helpMessage;
}

/**
 * Parses message looking for find keyword.
 */

const containsFindKeyword = (message) => {
  let findFound = message.match(/find|get/i);
  return (findFound) ? true : false;
}

/**
 * Parses message looking for help keyword.
 */

const containsHelp = (message) => {
  let helpFound = message.match(/help/i);
  return (helpFound) ? true : false;
}

/**
 *  Parses message and removes find keyword.
 */

const parseFoundText = (message) => {
   let re = /find|get\ +/ig;
   let newmessage = message.replace(re, '').trim();
   return newmessage;
}

/**
 * Parses message looking for keywords: `title, category and url`.
 */

const parseForKeyWords = (message) => {
  let splitRes = message.split(/(title:|category:|url:)/);
  return splitRes.reduce((obj, value, i) => {
    switch(value) {
      case ('title:'):
      case ('category:'):
      case ('url:'):
        let newval = value.replace(':', '');
        obj[newval] = splitRes[i + 1].trim();
        return obj;
      default:
        return obj;
    }
  }, {})
}

const objEmpty = (obj) => {
  return (Object.keys(obj).length === 0) ? true : false
}

const objHasProps = (obj) => {
  return (obj.hasOwnProperty('title') &&
    obj.hasOwnProperty('category') &&
    obj.hasOwnProperty('url')) ? true : false
}

const parseBookmarks = (bookmarks) => {
  let bookmark = bookmarks[0].category + ' bookmarks: \n';
  bookmarks.forEach((bmark, idx) => {
    bookmark += idx + 1 + ') ';
    bookmark +=  bmark.url + '\n';
  })
  return bookmark;
}

module.exports = {
  parseForKeyWords: parseForKeyWords,
  containsHelp: containsHelp,
  containsFindKeyword: containsFindKeyword,
  createHelpMessage: createHelpMessage,
  objEmpty: objEmpty,
  objHasProps: objHasProps,
  parseBookmarks: parseBookmarks,
  parseFoundText: parseFoundText
}
