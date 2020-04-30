# 每周总结可以写在这里
2020年4月30日
## 1. 学习进度&计划
## 2. 本周作业&随堂练习
### 2.1. 本周作业
- [x] 
### 2.2. 随堂练习
## 回放视频时间段
- 开始讲面向对象(01时58分-02时58分)
- 布置找出对象标准作业(02时58分)

## 相关网站
- https://developer.apple.com/documentation/javascriptcore/jscontext?language=objc

## 3. 课堂笔记
结构化程序设计

C语言=>Object-C

- 宏任务队列和事件循环是一个东西

子任务(微任务)，一个宏任务可能包括多个微任务，任何一个代码首先是微任务，可能多个微任务聚合在某个微任务里面。在JavaScript每调用一个call，微任务在js引擎里面

拿浏览器举例：setTimeout、setInterval 这种其实不是 JS 语法本身的 API，是 JS 的宿主浏览器提供的 API， 所以是宏任务。
而 Promise 是 JS 本身自带的 API，这种就是微任务。

总结：宿主提供的方法是宏任务，JS 自带的是微任务