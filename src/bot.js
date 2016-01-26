'use strict';

const path          = require('path')
    , saveBookmark  = require('./db').saveBookmark
    , findBookmarks = require('./db').findBookmarks
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
    this.matchedChannel = null;
    this.matchedUser = null;
  }

  initialize() {
    this.slack.on('message', this.handleMessage.bind(this));
    this.slack.on('error', this.handleError.bind(this));
    this.slack.login();
  }

  /**
   * Successful bookmark requests should be received as follows:
   *  title: Concurrency in Rust
   *  category: Rust
   *  url: https://www.youtube.com/watch?v=oAZ7F7bqT-o&list
   */

  handleMessage(message) {
    let user = message.user;
    let channel = message.channel;
    let messageText = message.text;
    this.matchedUser = this.slack.getUserByID(user);
    this.matchedChannel = this.slack.getChannelGroupOrDMByID(channel);

    if (containsHelp(messageText)) {
      let helpMessage = createHelp();
      this.matchedChannel.send(helpMessage);
    } else {
      let parsed = parseKeywords(messageText);
      let objHasCorrectProps = objHasProps(parsed);
      if (message.type === 'message' && this.matchedUser !== 'bookmarkbot' && objHasCorrectProps) {
        saveBookmark(parsed);
      } else if (!objHasCorrectProps) {
        findBookmarks(messageText, this.matchedChannel);
      }
    }
  }

  handleError(err) {
    if (err.msg === 'message text is missing') {
      this.matchedChannel.send('Beep boop. Oops. I could\'t find that category.');
    } else {
      this.matchedChannel.send('What? I didn\'t understand that. Type help if you aren\'t sure.');
    }
  }
}

module.exports = Bot;
