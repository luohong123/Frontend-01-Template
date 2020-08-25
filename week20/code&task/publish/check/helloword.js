/*
 * @Author: lh
 * @Date: 2020-08-25 17:05:18
 * @LastEditors: lh
 * @LastEditTime: 2020-08-25 17:17:53
 * @Description: 在命令行工具中输入 phantomjs helloword.js 会输入对应的图片
 * @email: 3300536651@qq.com
 */
var page = require('webpage').create();
page.open('http://baidu.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    // page.render('./baidu.png');
    var title = page.evaluate(function(){
        return document.title;
    });
    console.log('Page title is ' + title);
    phantom.exit();
  }
  phantom.exit();
});