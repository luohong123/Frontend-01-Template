/*
 * @Author: lh
 * @Date: 2020-08-20 11:26:38
 * @LastEditors: lh
 * @LastEditTime: 2020-08-21 17:49:34
 * @Description: 
 * @email: 3300536651@qq.com
 */
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const {
    fstat
} = require('fs');
var archiver = require('archiver');
const postData = querystring.stringify({
    'msg': 'Hello World!'
});

let filename = './6.jpeg';

// fs.stat(filename, (error, stat) => {
const options = {
    host: 'localhost',
    port: 8080,
    path: '/?filename=6.jpeg',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
};
var archive = archiver('zip', {
    zlib: {
        level: 9
    }
});
const req = http.request(options, (req) => {
    console.log(`STATUS:${res.statusCode}`);
    console.log(`HEADERS:${JSON.stringify(res.headers)}`);
});
req.on('error', (e) => {
    console.error(`problem with request:${e.message}`);
});
archive.directory(packname, false);
archive.finalize();

archive.pipe(req);
archive.on('end', () => {
    req.end();
});