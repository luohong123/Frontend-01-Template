# 每周总结可以写在这里
## 2. 本周作业&随堂练习
### 2.1. 本周作业
- [x] String to Number
- [x] Number to String
- [ ] 找出js标准中所有对象的总结 -文字型的作业
### 2.2. 随堂练习
## 课堂笔记
- [真正了解js中的number](http://jsfiddle.net/pLh8qeor/19/)
- http://www.softelectro.ru/ieee754_en.html
- https://github.com/tc39/test262/tree/master/test/language/literals/numeric
- 推荐 void 0 代表 undefined
- 推荐使用三目运算 左边的满足条件 右边不继续执行
- var a 一定要写在function 第一层内，不要在任何的block内写var，这些行为都非常糟糕和危险，let和const替代var
```
三次十进制转二进制
```js
1.3 + 1.1 - 2.4
// 十进制转二进制 整数部分：除二取余 小数部分：乘二取整 0.1 * 2 = 0.2 --> 0 0.2 * 2 = 0.4 --> 0 0.4 * 2 = 0.8 --> 0 0.8 * 2 = 1.6 --> 1 --> 0.6 0.6 * 2 = 1.2 --> 1 0.2 * 2 = 0.4 --> 0 0.4 * 2 = 0.8 --> 0 0.8 * 2 = 1.6 --> 1 --> 0.6 ... 循环
```
浮点数尽量少用算术计算，如果进行计算要考虑精度问题

```js
// 推荐
for(var i = 0; i < 10; i ++) {
var button = document.createElement('button');
    document.body.appendChild(button);

void function(){
    console.log(i)
}(i)
}


```

```js

```

Statement : 
EmptyStatement
ExpressionStatement
ContinueStatement
BreakStatement 
ReturnStatement 
ThrowStatement 
DebuggerStatement

声明

Object
    state
    identifier
    behavior

类是一种常见的描述对象的方式。
而'归类'和'分类'则是两个主要的流派。

对于'归类'方法而言，多继承是非常自然的事情，如C++.

而采用分类思想的计算机语言，则是单继承结构。并且会有一个基类Object

mixins

Object-Prototype
原型是一种更接近人类原始认知的描述对象的方法。

我们并不试图做严谨的分类，而是采用‘相似’这样的方式去描述对象。

任何对象仅仅需要描述它自己与原型的区别即可。

最早的JavaScript是基于函数式和原型的语言。

我们的状态就是行为

我们不应该受到语言描述的干扰。

在设计对象的状态和行为时，我们总是遵循‘行为改变状态’的原则。

Object in JavaScript
Symbol String => Data

UTF-8

