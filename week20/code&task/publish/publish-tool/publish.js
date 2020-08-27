/*
 * @Author: lh
 * @Date: 2020-08-20 11:26:38
 * @LastEditors: lh
 * @LastEditTime: 2020-08-27 11:37:47
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
var child_process = require('child_process');
let packagename = './package';

const postData = querystring.stringify({
    'msg': 'Hello World!'
});

let filename = './6.jpeg';

// fs.stat(filename, (error, stat) => {
let direct_uri = encodeURIComponent('http://localhost:8081/auth');
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.2aad77121e80a380`);
const server = http.createServer((req, res) => {
    console.log('real publish!');
    let token = req.url.match(/token=([^&]+)/)[1];
    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=package.zip',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/octet-stream'
        }
    };
    const req = http.request(options, (req) => {
        console.log(`STATUS:${res.statusCode}`);
        console.log(`HEADERS:${JSON.stringify(res.headers)}`);
    });
});
server.listen(8080);
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
    let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
    child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.2aad77121e80a380`);
});