# 每周总结可以写在这里
2020-05-07
## 本周作业
- - [x] 直观感受一下Realm,用 G6 antv 可视化 Realm 中的所有对象（选做）
var set = new Set();
var queue = [];

g6antv写出对象之间的关系图

## 视频回放时间段
- Realm(50分) 54分演示完Realm代码

Realm
- JS Context => Realm
- 宏任务
- 微任务(Promise)

### 浏览器
i:0

```
HTTP/1.1
Content-Type: text/html
Date: Mon, 23 Dec 2019 06:46:19 GMT
Connection: keep-alive
Transfer-Encoding: chunked

<html><body>Hello World <body></html>
## 相关网址
- https://tools.ietf.org/html/rfc2616 （推荐: 内容少）
GET POST 用的比较多
## 课堂笔记
### JavaScript
1. 什么是一个Realm？
winter的解释是Real就是
### 浏览器工作原理
浏览器相关的知识先准备好Node环境，目标是先搞清楚Node HTTP是如何实现的。

- request 是由三部分组成，有 request line、headers、body

- 以下代码，第一个想到的是能用什么？
    绝对不能用正则，这是一个流式传输，只能用状态机来做
```html
status line
    ||
HTTP/1.1 200 OK  

    || headers
Content-Type: text.html
Data: Mon 23 Dec 2019 06:46:19  GMT
Connection: keep alive
Transfer-Encoding: chunked
    ||
<html><body>hello World </body></html>
```


```markdown
POST / path路径  HTTP/1.1
Host: 127.0.0.1
Content-TYpe: application/x-www-form-urlencoded

field=aaa&code=%3D1

TCP是一个流，这里是一个正常流中的文本
```

```js
void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'winter'
        }
    });
    let response = await request.send();
    console.log(response);
    // 输出
    // HTTP/1.1 200 OK
    // Content-Type: text/plain
    // X-Foo: bar
    // Date: Wed, 13 May 2020 12:29:38 GMT
    // Connection: keep-alive
    // Transfer-Encoding: chunked

    // 2
    // ok
    // 0
}();


```
## 心得与体会
本周本来是开始讲浏览器工作原理的，老师又帮我们加课讲了JavaScript相关的知识，时间过的真快啊，JavaScript特别的薄弱，自己还是需要多多看文档，特别是学会看英文文档，发现一个不错的方式，养成看英文文档的习惯，如果看不懂，可以提前看看中文相关的文档，然后切换到中文文档，通过`沙拉划词`工具去翻译单词，慢慢的也属性英语单词了。我给自己也定了一些任务，再次复习《你不知道的JavaScript》，把老师之前讲的JavaScript知识点再复习复习，之前的作业也不断的完善下去。算法题也通过`Tag`的方式分类去练习和体会。学习老师讲的知识，不仅仅是学习他讲的知识，更是学习他获取知识的方法方式，老师特别喜欢在浏览器控制台敲代码，这样也发现了浏览器相关的一些东西，比如有时候打印出来是undefined，什么情况下完成一个宏任务和微任务。