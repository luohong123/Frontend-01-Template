/*
 * @Author: lh
 * @Date: 2020-08-20 10:22:19
 * @LastEditors: lh
 * @LastEditTime: 2020-08-21 17:32:17
 * @Description: 
 * @email: 3300536651@qq.com
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/a', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
