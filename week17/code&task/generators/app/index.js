/*
 * @Author: lh
 * @Date: 2020-08-05 22:43:57
 * @LastEditors: lh
 * @LastEditTime: 2020-08-05 22:44:23
 * @Description: 
 * @email: 3300536651@qq.com
 */
var Generator = require('yeoman-generator');
module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // Next, add your custom code
      this.option('babel'); // This method adds support for a `--babel` flag
    }
    method1() {
        this.log('method 1 just ran');
      }
    
      method2() {
        this.log('method 2 just ran');
      }
  };
