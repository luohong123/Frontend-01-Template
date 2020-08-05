# 每周总结可以写在这里
## 本周作业
- 完成“组件化 | Tab 组件和 List 组件”的视频学习，完成 cssloader.js 代码
- 跟上“工具链 | 整体理解一个工具链的设计”进度，完成课上代码练习
## 课程笔记


### 工具链
1. 初始化(yeoman、create-react-app、vue-cli)=>
2. 开发(dev-tool/chrome、webpack-dev-server、mock、wireshark、charles)=>
3. 测试(mocha、jest)=> 
4. 发布(lint、jenkins)
angular  vue react 的脚手架思路都是一样

jenkins
git
webpack
travis
babel
eslint
gulp
create-react-app
umi
gitlab
vscode
mocha
http-server
rollup
vue-cli
grunt
mock
husky
prettier
axios
yeoman
postman
dva
jest
maven
easymock
swagger
wireshark
charles

- 闭包 函数式编程
```
(g=>
    (f=>f(f))(
        self =>
            g((...args)=>self(self).apply(this.args))
    ))(
        self =>{
            return  n => n > 0 ? self(n - 1) + n : 0
        })(100)
```

### yeoman是generator的generator
- yeoman教程 https://yeoman.io/authoring/
```bash
sudo npm i -g yo
npm install --save yeoman-generator
yo luohong
```
npm link 