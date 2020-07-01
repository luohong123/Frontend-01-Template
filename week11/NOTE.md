# 每周总结可以写在这里

## 课堂笔记

2020-06-18

- winter:大部分情况推荐使用 await，有 await，.then 可以不用
  运行时的语法 I think await 是 promise 的语法
### Promise异步编程

### 寻路问题

上下左右走，斜向走，一个起点 一个终点
【搜索】

当地图比较大时，推荐使用一维数组

```js
// 旧方法 创建一个 10000 长度 的数组
let map = Array(10001)
  .join(0)
  .split('')
  .map((s) => Number(s))
```

localStorage 不靠谱，宁愿存 cookie 也不愿意存 localStorage

### 编辑距离

leetcode 72 题

- 前端哪些地方会用到算法
  广义的算法
  狭义的算法(分治、递归、动态规划)

> winter 做前端一定要学会可视化
> binaryHeap 不要用对象，对象在 js 中占内存特别大，要用数组

### 正则

- exec
- lastIndex

```js
let lastIndex = 0;
let token;
do{
    token = inputElement.exec(source);
    console.log(token);
}
```
### 大顶堆
2. 编程与算法训练 binaryHeap 01:50
每一个根节点都比下面的节点大
取 和堆的高度一致 Ologn

二叉堆

在数组中存储,数组第一个位置存第一层 ，然后第二层 第三层...