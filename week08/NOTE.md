# 每周总结可以写在这里
## 本周作业
编写一个 match 函数，完善你的 toy-browser
复制代码
```js
function match(selector, element) {
    return true;
}
match("div #id.class", document.getElementById("id"));
```

### 练习
- div#a.b .c[id=x]
0 1 3 1
```css
- div#a.b .c[id=x]
  - div [0, 0, 0, 1]
  - div#a [0, 1, 0, 1]
  - div#a.b [0, 1, 1, 1]
  - div#a.b .c [0, 1, 2, 1]
  - div#a.b .c [0, 1, 3, 1]
```
- #a:not(#b)
0 2 0 0

- *.a

- div.a
2
## 课程笔记
2020-05-28 周四




### 选择器
####  选择器语法
- 复合选择器
    - <简单选择器><简单选择器><简单选择器>
    - 或者 div 必须写在最前面
- 复杂选择器
    - 'sp'
    - '>'
    _ '~'
    - '+'
    - '||'

#### 选择器优先级
