/*
 * @Author: qingcheng
 * @Date: 2020-05-09 20:53:10
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-12 21:14:27
 * @Description: 
 * @email: 3300536651@qq.com
 */
const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request recieved');
    console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('ok');
});
server.listen(8088);