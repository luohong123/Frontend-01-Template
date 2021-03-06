# 每周总结可以写在这里

## 课堂笔记

2020-06-25
> winter 
1. 状态机是完全可以和计算机等效的
#### WildCard
1. WildCard（通配符，不是正则）是在KMP的基础上 用*来表示若干个任意字符，?来表示单个字符。（难点：pattern里面有* ？ 思路：把问题拆分，只有* 只有？ 通配符看起来需要回溯，但实际上不需要）遇到* 
怎么办？
2. * 尽量匹配多 还是 少？
留最后一颗*

处理带？的KPM难度特别高，涉及到
#### 参考名词：

LR： LR 分析器是一种自底向上（bottom-up）的上下文无关语法分析器。LR 意指由左（Left）至右处理输入字符串，并以最右边优先派生（Right derivation）的推导顺序（相对于 LL 分析器）建构语法树。能以此方式分析的语法称为 LR 语法。而在 LR(k) 这样的名称中，k 代表的是分析时所需前瞻符号（lookahead symbol）的数量，也就是除了目前处理到的输入符号之外，还得再向右引用几个符号之意；省略 （k）时即视为 LR(1)，而非 LR(0)。
LL： LL 分析器是一种处理某些上下文无关文法的自顶向下分析器。因为它从左（Left）到右处理输入，再对句型执行最左推导出语法树（Left derivation，相对于 LR 分析器）。能以此方法分析的文法称为 LL 文法。
### 使用 LL 算法构建 AST

exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
Number 的正则表达式

```js
;/^0\.\d*(?:[eE][+-]?\d+)?$|^[1-9]\.\d*(?:[eE][+-]?\d+)?$|^\.\d+(?:[eE][+-]?\d+)?$|^0(?:[eE][+-]?\d+)?$|^[1-9]\d*(?:[eE][+-]?\d+)?$/
```

iterator 是数组的超集，iterator 可以异步

### 字符串分析算法

1. 字典树
   大量字符串的完整模式匹配
2. KMP
   长字符串中找子串 O（m+n）
3. WildCard 通配符算法
   长字符串中找子串升级版
4. 正则
   字符串通用模式匹配
5. 状态机
   通用的字符串分析
6. LL LR
   字符串多层级结构分析


#### KMP算法
设置一个临时数组(时间复杂度为O(N))，记录子串相同字符的位置，子串匹配不上时，不用回到开头重新比较，利用了字符的相似性。
时间复杂度O(M+N) 空间复杂度O(N)
### 思考

1.  什么不可哈希？
    guid()不能哈希，因为 guid 存在字典树里面没有价值
2.  可哈希的呢？
    数据类型 互相之间是否是可比较的。
