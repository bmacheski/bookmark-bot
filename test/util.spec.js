'use strict';

const expect        = require('chai').expect
    , parseKeywords = require('../src/utils').parseForKeyWords
    , objEmpty      = require('../src/utils').objEmpty
    , containsHelp  = require('../src/utils').containsHelp
    , objHasProps   = require('../src/utils').objHasProps
    ;

describe('utils', () => {
  describe('parseKeywords helper method', () => {
    let message = 'title: Node.js tutorial category: Node url: www.node.com';
    let obj = { title: 'Node.js tutorial', category: 'Node', url: 'www.node.com' }

    it('should return an object', () => {
      expect(parseKeywords(message)).to.be.an('object');
    })
    it('should contain data in the correct format', () => {
      expect(parseKeywords(message)).to.eql(obj);
    })
  })

  describe('objEmpty helper method', () => {
    let message = JSON.stringify({ message: 'hello bot.' });
    let parsed = parseKeywords(message);

    it('should return true when parsed object doesn\'t contain bookmark params', () => {
      expect(objEmpty(parsed)).to.be.true;
    })
  })

  describe('containsHelp helper method', () => {
    let helpMessage = 'help!';
    let noHelp = 'hello!';

    it('should return true when help is in message.', () => {
      expect(containsHelp(helpMessage)).to.be.true;
    })
    it('should return false when help is not in message', () => {
      expect(containsHelp(noHelp)).to.be.false;
    })
  })

  describe('objHasProps helper method', () => {
    let data = { title: 'Node.js', category: 'Node', url: 'www.node.com' };
    let noObj = { message: 'hello' };

    it('should return true when the correct bookmark values are supplied', () => {
      expect(objHasProps(data)).to.be.true;
    })
    it('should return false when the correct bookmark values are not supplied', () => {
      expect(objHasProps(noObj)).to.be.false;
    })
  })
})
