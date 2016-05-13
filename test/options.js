'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator:app - Option Tests', function () {

  describe('CSS', function() {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({styleFlavor: 'css'})
        .toPromise();
    });

    it('creates CSS files', function () {
      assert.file([
        'src/assets/styles/app.css',
        'src/assets/styles/base.css'
      ]);
    });
    it('updates webpack config', function () {
      assert.fail("inserts css loader");
    });

  });

  describe('LESS', function() {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({styleFlavor: 'less'})
        .toPromise();
    });

    it('creates LESS files', function () {
      assert.file([
        'src/assets/styles/app.less',
        'src/assets/styles/base.less'
      ]);
    });
    it('updates dependency list in package.json', function () {
      assert.fail('adds "extract-text-plugin" module');
      assert.fail('adds "less" module');
      assert.fail('adds "less-loader" module');
    });
    it('updates webpack config', function () {
      assert.fail('requires "extract-text-plugin" module');
      assert.fail('inserts ExtractTextPlugin');
      assert.fail('inserts less loader');
    });
    it('updates index.html', function () {
      assert.fail('inserts style link element');
    });
    it('updates index.js', function () {
      assert.fail('imports "app.less" file');
    });
  });

});
