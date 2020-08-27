/*
 * @Author: lh
 * @Date: 2020-08-20 14:30:35
 * @LastEditors: lh
 * @LastEditTime: 2020-08-27 12:57:14
 * @Description: 
 * @email: 3300536651@qq.com
 */
const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');
// 流式请求
const server = http.createServer((req, res) => {
    let matched = req.url.match(/filename=([^&]+)/);

    let filename = matched && matched[1];
    console.log(filename);
    if (!filename) return;

    // let writeStream = unzip.Extract({
    //     path: '../server/public'
    // });
    // req.pipe(writeStream);
    if (req.url.match(/^\/auth/))
        return auth(req, res);

    if (!req.url.match.match(/^\/$/)) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('not found');
    }

    req.on('data', trunk => {
        fs.WriteStream.write(trunk);
    })
    req.on('end', trunk => {
        fs.WriteStream.end(trunk);
    })
    req.on('end', () => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('okay');
    });
});

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];
    let state = "abc123";
    let client_secret = "864c8b883bbc9b42c80ba46072327734e445c6fe";
    let client_id = "Iv1.2aad77121e80a380";
    let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
    let params = `https://github.com/login/oauth/access_token?${parmas}`

    var options = {
        hostname: 'github.com',
        port: 443,
        path: `/user`,
        // path: `/login/oauth/access_token?${params}`,
        method: 'POST',
        headers: {
            Authorization: "token " + req.headers.token,
            "User-Agent": "toy-publish-server"
        }
    }
    const request = https.request(options, (response) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        response.on('data', (d) => {
            let result = d.toString().match(/access_token=([^&]+)/)[1];
            console.log(token);
            if (result) {
                let token = result[1];
                res.writeHead(200, {
                    'access_toekn': token,
                    'Content-Type': 'text/plain'
                });
                res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('error');
            }
        });
    });
    request.on('error', (e) => {
        console.log(e);
    });
    request.end();
}
server.listen(8081);