/*
 * @Author: lh
 * @Date: 2020-08-20 10:22:19
 * @LastEditors: lh
 * @LastEditTime: 2020-08-21 17:44:55
 * @Description: 
 * @email: 3300536651@qq.com
 */
var express = require('express');
var app = express();
const fs = require('fs');
/* GET home page. */
app.get('/', function(request, response) {
  request.on('data',(data)=>{
    console.log(data,'req');
  })
  let body = [];
  // fs.writeFileSync('../server/public/1.html','hello world!');
  fs.writeFileSync('../server/public/'+request.query.filename,request.body.content)
  console.log('创建成功!')
  response.send('hello 成功了');
  // fs.writeFileSync('../../server/public/2.html','hello world!');
  // response.render('index', { title: 'publish-server' });
});

module.exports = app;
