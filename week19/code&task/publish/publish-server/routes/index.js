/*
 * @Author: lh
 * @Date: 2020-08-20 10:22:19
 * @LastEditors: lh
 * @LastEditTime: 2020-08-20 14:24:39
 * @Description: 
 * @email: 3300536651@qq.com
 */
var express = require('express');
var router = express.Router();
const fs = require('fs');
/* GET home page. */
router.get('/', function(request, response, next) {
  console.log(req,'req');
  let body = [];
  fs.writeFileSync('../server/public/'+request.query.filename,request.body.content)
  res.end();
  // fs.writeFileSync('../server/public/1.html','hello world!');
  // fs.writeFileSync('../../server/public/2.html','hello world!');
  console.log('创建成功!')
  res.render('index', { title: 'publish-server' });
});

module.exports = router;
