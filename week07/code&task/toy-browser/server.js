/*
 * @Author: qingcheng
 * @Date: 2020-05-18 12:50:29
 * @LastEditors: lh
 * @LastEditTime: 2020-05-31 22:39:32
 * @Description: 
 * @email: 3300536651@qq.com
 */ 
const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request recieved');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(
`
<html lang="en">
<meta charset="UTF-8" />
<head>
<style>
    #container {
        width: 500px;
        display: flex;
        align-items:center;
        display: inline-flex;
        justify-content: space-around;
        background-color: rgb(0, 0, 0);
    }
    #container #myid {
        width: 100px;
        height:70px;
        flex: 1;
        background-color: rgb(255, 255, 255);
    }
    #container .c1 {
        width: 200px;
        height: 50px;
        background-color: rgb(0,255,0);
    }
    #container .c2 {
        width: 200px;
        height: 100px;
        background-color: rgb(255, 0, 0);
    }
</style>
</head>
<body>
   <div id="container">
    <div id="myid"></div>
    <div class="c1"></div>
    <div class="c2"></div>
   </div>
</body>
</html>
`);
});
server.listen(8088);
console.log('server started localhost://')