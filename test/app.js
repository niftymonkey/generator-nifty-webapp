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

  it('creates the application files', function () {
    // TODO: assert generator properties are injected
    assert.file([
      'src/index.html',
      'src/js/components/header.js',
      'src/js/components/logo.js',
      'src/js/index.js'
    ]);
  });

  it('creates the asset files', function () {
    assert.file([
      'src/assets/img/yeoman-logo.png',
      'src/assets/styles/app.css',
      'src/assets/styles/base.css'
    ]);
  });

  it('creates the dotfiles', function () {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.gitignore'
    ]);
  });

  it('creates the webpack-dev-server script', function () {
    // TODO: assert (future) config choices are respected
    assert.file([
      'server.js'
    ]);
  });

  it('creates the webpack config', function () {
    // TODO: assert (future) config choices are respected
    assert.file([
      'webpack.config.js'
    ]);
  });

  it('creates the package.json', function () {
    // TODO: assert generator properties are injected
    assert.file([
      'package.json'
    ]);
  });

  it('creates the README file', function () {
    // TODO: assert generator properties are injected
    assert.file([
      'README.md'
    ]);
  });

});
