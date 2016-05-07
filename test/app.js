'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-nifty-webapp:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates the files', function () {
    assert.file([
      'src/index.html',
      'src/js/index.js',
      'package.json',
      'README.md',
      'webpack.config.js'
    ]);
  });
});
