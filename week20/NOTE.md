# 每周总结可以写在这里
##  本周作业
- 跟上课程进度，完成课上代码
-  用 promise 管理代码

## 参考链接
- PhantomJS 下载地址： https://phantomjs.org/download
（也可在课程 PC 端页面底下下载附件压缩包)
- jslint 地址:http://www.jslint.com/
- https://www.npmjs.com/package/eslint-plugin-react
- https://developer.github.com/v3/
- OAuth： https://justauth.wiki/#/quickstart/oauth
- https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
## 课堂笔记
### 发布系统 | lint与PhantomJS
#### PhantomJS
PhantomJS是一个基于webkit的JavaScript API。它使用QtWebKit作为它核心浏览器的功能，使用webkit来编译解释执行JavaScript代码。任何你可以在基于webkit浏览器做的事情，它都能做到。它不仅是个隐形的浏览器，提供了诸如CSS选择器、支持Web标准、DOM操作、JSON、HTML5、Canvas、SVG等，同时也提供了处理文件I/O的操作，从而使你可以向操作系统读写文件等。PhantomJS的用处可谓非常广泛，诸如网络监测、网页截屏、无需浏览器的 Web 测试、页面访问自动化等。

> PhantomJS主要用于持续集成的检测,因为需要测试，在没有浏览器的情况下进行测试 。PhantomJS不适合做线上服务的。
1. 下载与安装（Mac系统）
解压`phantomjs`可以把里面的`phantomjs`放到以下文件
```bash
/usr/local/bin
```
在命令行工具中输入`phantomjs --version`，如果出现版本号，表示安装成功

2. 使用
到相应的路径下，在命令行工具中输入`phantomjs 需要执行的文件名`,如 `phantomjs helloword.js`
#### jslint
```
npm i eslint --save -dev
npm i eslint-plugin-react --save -dev
npx eslint --init
npx eslint ./main.js
```

###  发布系统 | OAuth
登录GitHub => settings => Developer settings => Register new GitHub App =>

GitHub App name:toy-publish
Homepage URL: http://localhost:8000
Webhook-Active 取消☑️
Where can this GitHub App be installed? 选择 Any account
点击 Create GitHub App
publish-server-vanilla、publish-tool承担什么样的角色
#### 小技巧
- `open ./` 打开文件


## 心得与体会(毕业总结)
2020年，特殊的一年，有幸遇到winter老师，学习到了学习方法，解决问题的思路，构建了知识体系，重学`JavaScript`、`CSS`,整理了`HTML标签`，写了`toy-browser`了解到浏览器的工作原理和`HTTP`协议，重学了浏览器API,重新认识了异步编程，建立了算法思维能力，也坚持每个周刷题。建立了组件化思维，以及满足了自己对工具链的好奇心。其实到现在，我不能说自己有多么大的进步，我反而觉得前端需要学习的东西还是很多，虽然课程结束了，自己也应该继续自我提升。

2020年，开始9月份了，希望接下来的3个月能在工作中运用所学知识，能有更多的思考和输出。