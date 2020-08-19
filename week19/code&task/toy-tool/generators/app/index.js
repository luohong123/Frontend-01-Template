/*
 * @Author: lh
 * @Date: 2020-08-19 09:46:42
 * @LastEditors: lh
 * @LastEditTime: 2020-08-19 17:54:51
 * @Description: 
 * @email: 3300536651@qq.com
 */
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  /**
   * 收藏信息
   */
  collecting() {
    this.log('collection');
  }
  /**
   * 创建文件
   */
  create() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        title: 'temp-name'
      }
    );
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js'), {
        title: 'Templating with Yeoman'
      }
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'), {
        title: 'Templating with Yeoman'
      }
    );
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js'), {
        title: 'Templating with Yeoman'
      }
    );
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'), {
        title: 'Templating with Yeoman'
      }
    );
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'), {
        title: 'Templating with Yeoman'
      }
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        title: 'Templating with Yeoman'
      }
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'), {
        title: 'Templating with Yeoman'
      }
    );
    // 下载node_modules依赖
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      "babel-loader",
      "@babel/core",
      "@babel/register",
      "@babel/preset-env",
      "@babel/plugin-transform-react-jsx",
      "mocha", // 测试工具
      "nyc",
      "html-webpack-plugin",
      "@istanbuljs/nyc-config-babel",
      "babel-plugin-istanbul"
    ], {
      'save-dev': true // 开发环境的工具
    });
  }
};