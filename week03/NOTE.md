# 每周总结可以写在这里
## 2. 本周作业&随堂练习
### 2.1. 本周作业
- [x] String to Number,根据这节课上讲师已写好的部分，补充写完函数 convertStringToNumber
- [x] Number to String,写出函数 convertNumberToString
- [x] JavaScript | 语句，对象。根据课上老师的示范，找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。
- [StringToNumber&&NumberToString](./code&task/StringToNumber&&NumberToString.html)
- [分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？](./code&task/JavaScript标准对象分析.md)
### 2.2. 随堂练习
## 回放视频时间段
- 开始讲面向对象(01时58分-02时58分)
- 布置找出对象标准作业(02时58分)


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


```
Statement : 
EmptyStatement
ExpressionStatement
ContinueStatement
BreakStatement 
ReturnStatement 
ThrowStatement 
DebuggerStatement
```
声明

Object
    state
    identifier
    behavior

类是一种常见的描述对象的方式。
而'归类'和'分类'则是两个主要的流派。

对于'归类'方法而言，多继承是非常自然的事情，如C++.

而采用分类思想的计算机语言，则是单继承结构。并且会有一个基类Object

Mixins

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

