# 每周总结可以写在这里

## 作业
- [x] 看完课程，完成 TicTacToe 的练习 
    [作业链接🔗](./code&task/TicTacToe/ticTacToe.html)
- [x] 把所有的 API 画进脑图里
    [作业链接🔗](./code&task/API.png)
- [x] 根据课程内容自己完成一个五子棋的游戏编程（选做）
## 课堂笔记

2020-06-11
2020-06-13

### Range API
通过range 操作dom树上的小细节， 比较精确 的操作dom，兼容性好

- var range = new Range()
- range.setStart(element, 9)
- range.setEnd(element, 4)
- var range = document.getSelection().getRangeAt(0)

- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNode

## CSSOM
```js
document.styleSheets
```

### CSS Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p { color: pink;}", 0)
- document.styleeSheets[0].removeRule(0)
```js
// 批量操作style
document.styleSheets[0].cssRules[0].style.color = 'lightgreen';
```

getComputedStyle

- window.getComputedStyle(elt, pseudoElt);
    - elt 想要获取的元素
    - pseudoElt 可选，伪元素


DOM CSSOM

```js
// 取出来是准确的
$0.getClientRects()[0];
DOMRect {
bottom: 1854
height: 2002
left: 8
right: 444
top: -148
width: 436
x: 8
y: -148
}
```
```
display: inline 会产生多个盒
$0.getClientRects();
```

- 物理像素 window.devicePixelRatio

```js
// 这个取出来比较准确
document.documentElement.getBoundingClientRect();
{
bottom: 500
height: 500
left: 0
right: 452
top: 0
width: 452
x: 0
y: 0
__proto__: DOMRect
}
```

- 如何找出所有的API

- 内存泄露其实主要是内存占用
- js内存释放，垃圾回收检查，保证引用断开，会定期回收

```
----------
```

## 棋盘: 3✖️3方格
- 双方分别持有圆圈和叉两种棋子
- 双方交替落子
- 率先连成三子直线的一方获胜
## 参考名词：
蒙特卡罗方法（英语：Monte Carlo method），也称统计模拟方法，是 1940 年代中期由于科学技术的发展和电子计算机的发明，而提出的一种以概率统计理论为指导的数值计算方法。是指使用随机数（或更常见的伪随机数）来解决很多计算问题的方法。
20 世纪 40 年代，在科学家冯·诺伊曼、斯塔尼斯拉夫·乌拉姆和尼古拉斯·梅特罗波利斯于洛斯阿拉莫斯国家实验室为核武器计划工作时，发明了蒙特卡罗方法。因为乌拉姆的叔叔经常在摩纳哥的蒙特卡洛赌场输钱得名，而蒙特卡罗方法正是以概率为基础的方法。（ https://zh.wikipedia.org/wiki/ 蒙地卡羅方法 ）
## 如何刷算法题
> winter:
没有必要刷每日一题
根据标签刷
动态规划 字符串 数组 数量太多的话，放后面刷，先刷标签
数量少的。选择标签后=》再选择难度=》如果不熟悉，先刷简单的，由易到难
根据描述去写代码 70 80% 简单和中等题，困难题刷一道题。
主要围绕【数据结构】去刷算法题，【算法】主要是套路题，比如链表是否有环
规定 一周三道
 编程能力强才是最重要的，如果仅仅是为了刷题而刷题，都是浮云
 发挥自己擅长的事情