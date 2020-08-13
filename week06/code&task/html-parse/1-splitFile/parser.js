/*
 * @Author: qingcheng
 * @Date: 2020-05-14 21:05:36
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-19 16:34:50
 * @Description: 
 * @email: 3300536651@qq.com
 */

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
/**
 * 
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
 */
}