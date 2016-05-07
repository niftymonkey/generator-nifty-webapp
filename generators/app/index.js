'use strict';
var YeomanGenerator = require('yeoman-generator');
var chalk = require('chalk');

module.exports = YeomanGenerator.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    YeomanGenerator.Base.apply(this, arguments);

    this.defaults = {
      // this.appname defaults to the project's folder name
      appName: this.appname,
      appDescription: "My new nifty webapp",
      authorName: this.user.git.name()
    };
  },

  prompting: function () {
    var done = this.async();

    this.log("\n" + chalk.blue("Let's figure out what we're building..." + "\n"));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.defaults.appName.split(" ").join("-")
    },{
      type: 'input',
      name: 'description',
      message: 'Project description',
      default: this.defaults.appDescription
    },{
      type: 'input',
      name: 'author',
      message: 'Author',
      default: this.defaults.authorName
    }];

    this.prompt(prompts, function (answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  writing: function () {
    this.log("\n" + chalk.blue("Great! Let me drop those files down ...") + "\n");

    // TEMPLATES
    ///////////////////////////////////////////////////////////////////////////

    this.fs.copyTpl(
      this.templatePath('src/_index.html'),
      this.destinationPath('src/index.html'), {
        name: this.answers.name,
        description: this.answers.description,
        author: this.answers.author
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.answers.name,
        description: this.answers.description,
        author: this.answers.author
      }
    );

    // TOP LEVEL CONFIG
    ///////////////////////////////////////////////////////////////////////////

    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'));

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md'));

    // SOURCE FILES
    ///////////////////////////////////////////////////////////////////////////

    this.fs.copy(
      this.templatePath('src/js'),
      this.destinationPath('src/js'));
  },

  install: function () {
    this.log("\n" + chalk.blue("Yep, we've got some dependencies. Let me take care of that for ya..."));

    this.npmInstall(null, null, function() {
      this.log(chalk.green("Your new nifty web app is generated and ready to go!\n"));
      this.log(chalk.cyan("Type the following to build the app:\n"));
      this.log(chalk.cyan("    npm run build"));
    }.bind(this));
  }

});
