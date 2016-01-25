'use strict';

const path          = require('path')
    , util          = require('util')
    , Bookmark      = require('./db').Bookmark
    , parseKeywords = require('./utils').parseForKeyWords
    , objEmpty      = require('./utils').objEmpty
    , objHasProps   = require('./utils').objHasProps
    , containsHelp  = require('./utils').containsHelp
    , createHelp    = require('./utils').createHelpMessage
    , Slack         = require('slack-client')
    ;

class Bot {
  constructor(token) {
    this.slack = new Slack(token, true, true);
  }

  initialize() {
    this.slack.on('message', this.handleMessage.bind(this));
    this.slack.login();
  }

  /**
   * Successful bookmark requests should be received as follows:
   * ` title: Concurrency in Rust
   *   category: Rust
   *   url: https://www.youtube.com/watch?v=oAZ7F7bqT-o&list `
   */

  handleMessage(message) {
    let user = message.user;
    let channel = message.channel;
    let messageText = message.text;
    let matchedUser = this.slack.getUserByID(user);
    let matchedChannel = this.slack.getChannelGroupOrDMByID(channel);

    if (containsHelp(messageText)) {
      let helpMessage = createHelp();
      matchedChannel.send(helpMessage);
    } else {
      let parsed = parseKeywords(messageText);
      let objHasCorrectProps = objHasProps(parsed);
      if (message.type === 'message' && matchedUser !== 'bookmarkbot' && objHasCorrectProps) {
        this.saveBookmark(parsed);
      }
    }
  }

  saveBookmark(parsed) {
    Bookmark
      .sync({ force: true })
      .then(() => {
        return Bookmark.create({
          title: parsed.title,
          category: parsed.category,
          url: parsed.url,
          owner: matchedUser
        });
      })
  }
}

module.exports = Bot;
