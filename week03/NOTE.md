# 每周总结可以写在这里
## 2. 本周作业&随堂练习
### 2.1. 本周作业
- [x] String to Number
- [x] Number to String

### 2.2. 随堂练习
## 课堂笔记
- [真正了解js中的number](http://jsfiddle.net/pLh8qeor/19/ )
- http://www.softelectro.ru/ieee754_en.html
- https://github.com/tc39/test262/tree/master/test/language/literals/numeric
- 推荐void 0代表undefined
- 推荐使用三目运算 左边的满足条件 右边不继续执行
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