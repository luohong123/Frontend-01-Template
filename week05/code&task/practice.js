/*
 * @Author: qingcheng
 * @Date: 2020-05-10 21:10:40
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-10 21:13:24
 * @Description: 
 * @email: 3300536651@qq.com
 */
var xhr = new XMLHttpRequest;
xhr.open('get','http://127.0.0.1:8088',true);
xhr.send(null);
xhr.responseText; // ok
xhr.HEADERS_RECEIVED; // 2
xhr.addEventListener('readystatechange');