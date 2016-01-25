'use strict';

const path         = require('path')
    , util         = require('util')
    , Bookmark     = require('./db').Bookmark
    , parseMessage = require('./utils').parseMessage
    , objEmpty     = require('./utils').objEmpty
    , Slack        = require('slack-client')
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
    let parsed = parseMessage(message.text);
    let objIsEmpty = objEmpty(parsed);
    let user = message.user;
    let channel = message.channel;
    let matchedUser = this.slack.getUserByID(user);
    let matchedChannel = this.slack.getChannelGroupOrDMByID(channel);

    if (message.type === 'message' && matchedUser !== 'bookmarkbot' && !objIsEmpty) {
      this.saveBookmark(parsed, channel);
    }
  }

  saveBookmark(parsed, channel) {
    Bookmark
      .sync({ force: true })
      .then(() => {
        return Bookmark.create({
          title: parsed.title,
          category: parsed.category,
          channel: channel,
          url: parsed.url
        });
      })
  }
}

module.exports = Bot;
