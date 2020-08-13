const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request recieved');
    console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {
        // 直接返回字符写'text/plain' ,如果是通过读取html的内容，
        // 这里写'text/html'
        'Content-Type': 'text/html' 

    });
// 模版字符串不能有空格，需要写到头    
    res.end(
`<html  maaa=a>
<head>
    <style>
body{
    background-color:rgb(0,0,0);
}
#container {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: row;
    background-color:rgb(255,255,255);
}
#container #myid {
    width: 200px;
    height: 100px;
    background-color:rgb(255,0,0);
}
#container .c1 {
    flex:1;
    background-color:rgb(0,255,0);
}
    </style>
</head>
<body>
   <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
   </div>
</body>
</html>`);
});
server.listen(8088);
console.log('server started localhost://')