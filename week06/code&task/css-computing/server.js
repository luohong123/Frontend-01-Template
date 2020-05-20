/*
 * @Author: qingcheng
 * @Date: 2020-05-18 12:50:29
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-18 12:57:02
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
    res.end(
`
<html maaa=a >
<head>
    <style>
body div #myid{
    width: 100px;
    background-color: #ff5000;
}
body div img {
    width:30px;
    background-color: #ff1111;
}
</style>
</head>
<body>
    <div>
        <img id="myid" />
        <img />
    </div>
</body>
</html>
`);
});
server.listen(8088);