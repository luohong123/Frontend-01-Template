# 每周总结可以写在这里
## 1. 学习计划和进度
- [x] 每周完成一篇学习总结
- [x] 理解产生式BNF
- [x] 练习3道算法题(每周四24点前做完)
## 2. 本周作业&随堂练习
### 2.1. 本周作业
- [x] 写一个正则表达式 匹配所有 Number 直接量（描述：输入是Number类型，用正则匹配出来。参考资料：ECMA-262P167）
- [x] 写一个 UTF-8 Encoding 的函数（用UTF-编码方式编码一段字符串，输入是字符串，输出是字符串编码，例如输入是"hello world",输出是"\x68\x65\x6C\x6C\x6F\x20\x77\x6F\x72\x6C\x64"）
- [x] 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号(和题目1类似，输入是"aaa"或者'aaa'，用正c则匹配出来)
- [x] 完成一篇本周的学习总结
### 2.2. 随堂练习
- [x] 编写带括号的四则运算产生式
- [ ] 尽可能寻找你知道的计算机语言，尝试把它们分类
- [x] 产生式BNF练习
## 3. 知识点
1. 理解BNF可以帮助理解JavaScript的语法定义、标准、本质、更底层的东西
2. 语言更静态好，越适应大规模的开发,比如Java、TypeScript（弱类型）静态类型系统
3. 强类型、弱类型
4. TS在JavaScript的基础上
凡是能用Array<Parent>的地方，都能用Array<Child>
5. imagecook 
凡是能用Function<Child>的地方，都能用Function<Parent>
### 3.1. 参考名称
- **bigint**
- **乔姆斯基谱系**：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
    - 0- 型文法（无限制文法或短语结构文法）包括所有的文法。
    - 1- 型文法（上下文相关文法）生成上下文相关语言。
    - 2- 型文法（上下文无关文法）生成上下文无关语言。
    - 3- 型文法（正规文法）生成正则语言。
- **Brainfuck** ：一种极小化的程序语言，它是由 Urban Müller 在 1993 年创造的。由于 fuck 在英语中是脏话，这种语言有时被称为 Brainfck 或 Brainf**，或被简称为 BF。
- **巴科斯诺尔范式**：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。
- **图灵机（Turing machine）**：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。
- **图灵完备性**：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。
- **Bjarne Stroustrup（比雅尼·斯特劳斯特鲁普）**：1950 年 12 月 30 日生于丹麦奥胡斯郡，计算机科学家。他以创造 C++ 编程语言而闻名，被称为“C++ 之父”。
- **字符集**：字符编码（英语：Character encoding）、字集码是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8 位组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和 ASCII。其中，ASCII 将字母、数字和其它符号编号，并用 7 比特的二进制来表示这个整数。通常会额外使用一个扩充的比特，以便于以 1 个字节的方式存储。在计算机技术发展的早期，如 ASCII（1963 年）和 EBCDIC（1964 年）这样的字符集逐渐成为标准。但这些字符集的局限很快就变得明显，于是人们开发了许多方法来扩展它们。对于支持包括东亚 CJK 字符家族在内的写作系统的要求能支持更大量的字符，并且需要一种系统而不是临时的方法实现这些字符的编码。
- **Unicode** ：中文：万国码、国际码、统一码、单一码。是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。
- **ASCII** ：（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准 ISO/IEC 646。美国信息交换标准代码是这套编码系统的传统命名，互联网号码分配局现在更倾向于使用它的新名字 US-ASCII[2]。美国信息交换标准代码是美国电气和电子工程师协会里程碑之一。
Token：记号、标记。JS 里有效的输入元素都可以叫 Token。
- **NBSP** ：不换行空格（英语：no-break space，NBSP）是空格字符，用途是禁止自动换行。HTML 页面显示时会自动合并多个连续的空白字符（whitespace character），但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode 码点为：U+00A0 no-break space。
- **零宽空格**：（zero-width space, ZWSP）是一种不可打印的 Unicode 字符，用于可能需要换行处。在 HTML 页面中，零宽空格可以替代。但是在一些网页浏览器（例如 Internet Explorer 的版本 6 或以下）不支持零宽空格的功能。
### 3.2. 有助于你理解的知识：
- **终结符**： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/終結符與非終結符）
- **产生式**： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
- **静态和动态语言**： https://www.cnblogs.com/raind/p/8551791.html
- **强类型**： 无隐式转换
- **弱类型**： 有隐式转换
- **协变与逆变**： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
- **Yacc 与 Lex 快速入门**： https://www.ibm.com/developerworks/cn/linux/sdk/lex/index.html
- **关于元编程**： https://www.zhihu.com/question/23856985
- **编程语言的自举**： https://www.cnblogs.com/lidyan/p/6727184.html
- **推荐阅读**：ECMA-262 Grammar Summary 部分
## 4. 课程内容笔记
### 4.1 课程记录网址
- [【home.unicode.org】](https://home.unicode.org/)
- [【fileformat unicode】](https://www.fileformat.info/info/unicode/)
- [【计算浮点数的一个工具】](https://github.com/camsong/blog/issues/9)
- [【正则表达式】](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) - MDN
- [【揭秘 0.1 + 0.2 != 0.3】](https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/)
- [【ASCII，Unicode 和 UTF-8】](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html) -阮一峰
- https://zh.wikipedia.org/wiki/BNF
- [巴科斯范式](https://baike.baidu.com/item/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F/1849549?fromtitle=BNF&fromid=7328753)
- https://zh.wikipedia.org/wiki/%E7%B5%82%E7%B5%90%E7%AC%A6%E8%88%87%E9%9D%9E%E7%B5%82%E7%B5%90%E7%AC%A6
- https://github.com/AssemblyScript/assemblyscript/blob/master/src/parser.ts
- [语法格式描述规范BNF和ABNF](https://www.jianshu.com/p/15efcb0c06c8)
- [拖拽界面-我向你承诺，1 秒钟页面就能渲染出来](https://mp.weixin.qq.com/s/YfifD8XXshS8vAi5pkpDBQ)
- https://www.fileformat.info/info/unicode/
- https://unicode.org/reports/tr31/ command+f search "id_start"
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float64Array
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
### 4.2 有趣的
- 银行的处理，超高精度 也是不安全，唯一的出路是转为`整数` 以`分`为单位
- `token`是什么？
    -  `token`是记号 有效的
- 把产生式（BNF）学会，学任何语言都更加容易，如何去描述一门语言。
- 有趣的Tab
```
// Tab
4  5
1   0
21  0
1   10
908 2
```
<TAB>
<VT>
<FF>
<SP> 推荐
<NBSP>
<ZWNBSP>
<USP>
- WhiteSpace
```
WhiteSpace :: <TAB>
<VT>
<FF>
<SP> <NBSP> <ZWNBSP> <USP>
```
- &nbsp用法（其实我们都用错了，它不仅仅是空格，而是连接的两个词永远不会隔行）
```html
// 换行时Java和Script
Tody I learn Java&nbsp;Script.Tody I learn Java Script.Tody I learn Java Script.Tody I learn Java Script.
```
- 目前是工程体系竞争


## 5. 思考
1. 能不能把加减乘除四则运算BNF改成正则表达式写法
<DecimalNumber> = /0|[1-9][0-9]*/

2. Math.abs(1.1+1.3 - 2.4) <= Number.EPSILON; // false ？？？
3. 2型 上下文相关文法
```js
{
    get a {return 1},
    get: 1
}
```
## 6. 心得与体会
> winter老师讲的东西很基础，看着知识不多，仔细扩展如果真正的理解，却要下不少的功夫才行。让我不禁思考之前我都是在学习`JavaScript`的`API`,却没有认真去思考很基础的东西，恰恰这些是非常重要的。之前读一本书，很少耐心去把前言看完，通过这次学习我简单每读一本书，学习一个新的知识，都应该认真的学习背后的东西。当老师讲完知识或者平时自我学习时，要及时的总结和整理，不要有拖延症。在数据结构与算法方法，目前自己的学习方法是，每个阶段认真集中的学习某个数据结构。如何提升自己的基础知识呢？可以学习`操作系统（Linux系统）`、`数据结构`、`算法`。