var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai);

var OpenSubtitles = require('./');

describe('OpenSubtitles', function() {

  describe('Library', function() {

    it('Is not undefined?', function() {
      OpenSubtitles.should.not.be.a('undefined');
    })

    it('Is object?', function() {
      OpenSubtitles.should.be.a('object');
    })

  })

})
