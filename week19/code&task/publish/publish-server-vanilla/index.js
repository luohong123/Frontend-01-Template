/*
 * @Author: lh
 * @Date: 2020-08-20 14:30:35
 * @LastEditors: lh
 * @LastEditTime: 2020-08-20 17:57:38
 * @Description: 
 * @email: 3300536651@qq.com
 */
const http = require('http');
const fs = require('fs');
// 流式请求
const server = http.createServer((req, res) => {
    let matched = req.url.match(/filename=([^&]+)/);
    let filename = matched && matched[1];
    console.log(filename);
    if (!filename) return;

    let writeStream = fs.createWriteStream('../server/public/' + filename);
    req.pipe(writeStream);
    req.on('end', () => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('okay');
    });
});
server.listen(8081);