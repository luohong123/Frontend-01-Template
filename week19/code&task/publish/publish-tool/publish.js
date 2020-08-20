/*
 * @Author: lh
 * @Date: 2020-08-20 11:26:38
 * @LastEditors: lh
 * @LastEditTime: 2020-08-20 17:50:04
 * @Description: 
 * @email: 3300536651@qq.com
 */
const http = require('http');
const querystirng = require('querystring');
const postData = querystring.stringify({
    'msg': 'Hello World!'
});
const {
    fstat
} = require('fs');
let filename = './6.jpeg';
fs.stat(filename, (error, stat) => {
    const options = {
        host: 'localhost',
        port: 8080,
        path: '/?filename=6.jpeg',
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': stat.size
        }
    };
    const req = http.request(options, (req) => {
        console.log(`STATUS:${res.statusCode}`);
        console.log(`HEADERS:${JSON.stringify(res.headers)}`);
    });
    req.on('error', (e) => {
        console.error(`problem with request:${e.message}`);
    })
    let readStream = fs.createReadStream('./6.jpeg');
    readStream.pipe(req);
});


// Make a request
const req = http.request(options);
req.end();