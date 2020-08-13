# 每周总结可以写在这里

## 课堂笔记

6 月 4 日

```css
@keyframes mykf{
    0% {top:0, transition: top ease}
    50% {top:0, transition: top ease}
    75% {top:0, transition: top ease}
    100% {top:0, transition: top linear}
}
```

- cubic-bezier [贝塞尔曲线](https://cubic-bezier.com/#.17,.67,.83,.67)

6 月 6 日

- https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
- 论文 http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html

建议用 Node 操作，不要用 Element 操作。

注意：所有的dom元素 默认只有父元素，操作dom元素，如果append dom树A上，再次append dom树B上时，会自动先从dom树A 上删除。
#### 导航操作
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling
#### 修改操作
实时变化
- appendChild
- insertBefore
- removeChild
- replaceChild
- previousSibling

#### 高级操作
- compareDocumentPosition 用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isSameNode 检查两个节点是否完全相同  '==='
- cloneNode 复制节点

### crypto API


```js
document.body.addEventListener(handleEvent, listener [, options]);
```

### 捕获和冒泡
先捕获 再冒泡

true 捕获
false 冒泡

- 事件代理 事件委托

事件代理是一个非常糟糕的情况


中台文章 玄难 https://yq.aliyun.com/articles/30340


- 单页面框架怎么获取一个页面的性能
埋点 打印开始时间和结束时间 

- rn 推荐小型应用、初创应用使用（winter）
- 什么情况需要架构？
当一个项目无从下手，不知道从哪里开始的时候，需要架构，如果一个项目从头到尾做起来顺风顺水的话，就不需要架构