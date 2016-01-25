'use strict';

const expect       = require('chai').expect
    , parseMessage = require('../src/utils').parseMessage
    , objEmpty     = require('../src/utils').objEmpty
    , containsHelp = require('../src/utils').containsHelp
    ;

describe('utils', () => {
  describe('parseMessage object parsing', () => {
    let message = 'title: Node.js tutorial category: Node url: www.node.com';
    let obj = {
      title: 'Node.js tutorial',
      category: 'Node',
      url: 'www.node.com' }

    it('should return an object', () => {
      expect(parseMessage(message)).to.be.an('object');
    })
    it('should contain data in the correct object format', () => {
      expect(parseMessage(message)).to.eql(obj);
    })
  })

  describe('parseMessage help message parsing', () => {
    let message = 'help me!';
    let res = parseMessage(message);
    it('should return a function when help is passed into message', () => {
      expect(res).to.be.a('function')
    })
  })

  describe('objEmpty helper method', () => {
    let message = JSON.stringify({ message: 'hello bot.' });
    let parsed = parseMessage(message);

    it('should return true when object is empty', () => {
      expect(objEmpty(parsed)).to.be.true;
    })
  })

  describe('containsHelp helper', () => {
    let helpMessage = 'help!'
    let noHelp = 'hello!'
    it('should return false when help is in message.', () => {
      expect(containsHelp(helpMessage)).to.be.true;
    })
    it('should return false', () => {
      expect(containsHelp(noHelp)).to.be.false;
    })
  })
})
