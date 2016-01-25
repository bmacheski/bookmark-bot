'use strict';

const sendHelpMessage = () => {
  let helpMessage = '';
  helpMessage += 'Beep boop. Welcome. I am BookmarkBot. \n';
  helpMessage += 'To save a bookmark, I will need data with a title, category and url. \n';
  helpMessage += 'An example would be `title: Concurrency in Rust category: Rust url: youtube.com` \n';
}

/**
 * Parses message looking for help keyword.
 */

const containsHelp = (message) => {
  let helpFound = message.match(/help/i);
  return (!helpFound) ? true : false;
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

const parseMessage = (message) => {
  return (containsHelp(message)) ? parseForKeyWords(message) : sendHelpMessage;
}

const objEmpty = (obj) => {
  return (Object.keys(obj).length === 0) ? true : false
}

module.exports = {
  parseMessage: parseMessage,
  objEmpty: objEmpty,
  containsHelp: containsHelp
}
