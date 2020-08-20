# 每周总结可以写在这里
##  本周作业
- [x] 完成工具链
- [x] 写完 publish-sever 和 publish-tool，完成发布系统

## 参考链接：
https://yeoman.io/authoring/index.html
https://webpack.js.org/api/node/#compiler-instance
https://www.virtualbox.org/wiki/Downloads
https://ubuntu.com/download/desktop

https://nodejs.org/docs/latest-v13.x/api/fs.html
https://expressjs.com/en/starter/installing.html
https://www.jianshu.com/p/f3dad64d896a


## 课堂笔记

### 工具链 ｜ 目录结果与初始化
#### yeoman生成器
有一种技术可以提高我们的工作效率，可以让我们专心做我们擅长的事，可以屏蔽复杂性，可以规范我们的架构和我们的代码，可以让我们的享受编程的乐趣。Yeoman可以做到。
Yeoman主要有三部分组成：yo（脚手架工具，yo插件都是通过npm、Node.js包管理器安装和管理的）、grunt（构建工具：让Nodejs规范起来）、npm（包管理器：解决js的依赖管理）。这三个工具是分别独立开发的，但是需要配合使用，来实现我们高效的工作流模式。
生成器的核心是Node.js模块。文件夹必须命名`generator-name`

> 1. initializing - 初始化开始
>  2. prompting - 调用this.prompt()与用户产生交互
>  3. configuring - 创建配置文件(package.json，config.> js等)
> 4. default - 方法都不匹配这些优先级时，就会是default优先级（自定义方法会被划入default）
> 5. writing - 创建项目文件
> 6. conflicts - 文件创建中产生冲突的处理
> 7. install - 调用(npm, bower)包install
> 8. end - 结束项目初始化 其他自定义方法在configuring和writing按顺序优先级调用。


##### 如何创建一个`yeoman generator`呢
参考链接
- https://yeoman.io/authoring/index.html
以`week19/code&task/toy-tool` 目录为例，`package.json`的`name`为`generator-toytool`,通过 `npm link` 将全局模块符号链接到本地文件，输入 `yo toytool`运行成功.
到 `tt-example` 文件路径下运行 `yo toytool` 命令可以生成对应的模版，

- rm -rf ./* 表示删除当前目录下所有的文件
- 建议开发版本的工具都安装最新版本,理论上`index.js`不断的升级,初始化工具不固定版本，建议安装最新版本，不断的升级，发布版用最新版本就是作死。不写版本的代价是每次`generator`都要升级到最新的版本。
- 在`component`中实现了比较复杂的`webpack.config`配置
- `npm start`命令可以省略`npm run`
- `webpack`的 `html-webpack-plugin`插件 复制`html`
- yeoman 可以让团队的人很容易复制配置

#### 安装虚拟机和图形界面
- virtualbox 虚拟机 远程的Linux环境 https://www.virtualbox.org/wiki/Downloads

- ubuntu 图形化界面 https://ubuntu.com/download/desktop

- 为什么要搞一个Linux环境？
因为和开发环境和正式环境（Linux）是隔离的，并不是拷贝一个文件就部署成功了，还需要配置线上的环境，理解开发环境，内网server(工具链)和外网server

线上环境的很复制，可能需要线上监控

### 发布系统 ｜ 实现一个线上Web服务
```bash
npm install n
n latest
```
#### express搭建一个基础服务
```
Express 应用程序生成器
通过应用生成器工具 express-generator 可以快速创建一个应用的骨架。
你可以通过 npx （包含在 Node.js 8.2.0 及更高版本中）命令来运行 Express 应用程序生成器。
```
- 现在的很多generator不负责npm install

publisher和工具链做对接，对用户身份进行验证，接受提交的文件，存到对应的位置，版本控制，权限控制，用publish-tool(持续集成,纯粹的Node命令行工具)通过publish-server
- 流式处理express(http-streaming-requset)
- 公司的`nginx`一般是做反向代理，主服务还是要写代码
- stream流式的概念？
- req.pipe() 是什么？
```js
// pipe是管子里面的水
req.pipe(writeStream);
// 等效于
req.on('data', trunk=>{
    // 写
    writeStream.write(thunk);
});
req.on('end',trunk=>{
    // 读
    writeStream.end(trunk);
});
```
- promise如何封装可以循环访问的流？


#### 发布系统
发布系统可能会发多个文件，代码也需要压缩(archiver压缩：https://www.npmjs.com/package/archiver、compress压缩:https://www.npmjs.com/package/compress)

打包一个目录并且上传到远程服务器
#### 注意事项

## 心得与体会
本周做了`toy-tool`,在工作中可以利用`yeoman`这种工具，让团队不再担心配置的问题，关注于代码开发。比如做一个后台管理系统，要建立几十个模块，就可以通过写模版页面(列表模版、表单模版、左树右列表模版...)，根据不同的参数，再利用工具批量生成对应的模块界面，不用一个一个的手动创建文件，提高了工作效率，也能避免一些低级的错误。之前是通过`Node.js`实现的批量创建文件，没有这个好用。
