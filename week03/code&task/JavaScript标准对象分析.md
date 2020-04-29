# JavaScript标准对象分析
> 描述一条鱼。
比如有三条鱼，其中一条鱼发生了状态改变，失去了尾巴。其它两只鱼并不受到影响。因此当我们在计算机中描述这三只鱼时，必须把相同当数据存储三份。
所以任何一个对象都是唯一当，这与它本身的状态无关。所以即使状态完全一致的两个对象，也并不相等。
我们用状态来描述对象。
我们状态的改变即是行为。
任何面向对象的系统里面，两个面向对象都不可能相等，没有任何一个面向对象系统会把两个对象设计为相等的。
面向对象设计的三要素：`状态state`、` 行为behavior`、`唯一性identifier`

封装 复用 解耦 内置主要是描述一个架构的

继承是面向对象的一个子系统
多态和图灵完备有点类似，比如写同样的代码，行为不一样
## 标准里所有的对象
> 分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？
- [重学前端-你知道全部的对象分类吗](https://time.geekbang.org/column/article/80011)
来自ECMA-262
###  Number Object
20.1 Number Objects
20.1.1 The Number Constructor

####  Number构造函数的属性(Properties of the Number Constructor)
1. Number.EPSILON
2. Number.isFinite ( number )
3. Number.isInteger ( number )
4. Number.isNaN ( number )
5. Number.isSafeInteger ( number )
6. Number.MAX_SAFE_INTEGER
7. Number.MAX_VALUE
9. Number.MIN_VALUE
10. Number.NaN
11. Number.NEGATIVE_INFINITY
12. Number.parseFloat ( string )
13. Number.parseInt ( string, radix )
14. Number.POSITIVE_INFINITY 
15. Number.prototype
#### Number原型的属性(Properties of the Number Prototype Object)
1. Number.prototype.constructor
2. Number.prototype.toExponential ( fractionDigits )
3. Number.prototype.toFixed ( fractionDigits ) NOTE 1
4. Number.prototype.toLocaleString ( [ reserved1 [ , reserved2 ] ] )
5. Number.prototype.toPrecision ( precision )
6. Number.prototype.toString ( [ radix ] ) NOTE
7. Number.prototype.valueOf ()
### Math Object
####  Value Properties of the Math Object 
20.2.1.1 Math.E
20.2.1.2 Math.LN10
20.2.1.3 Math.LN2
20.2.1.4 Math.LOG10E
20.2.1.5 Math.LOG2E
20.2.1.6 Math.PI
20.2.1.7 Math.SQRT1_2
20.2.1.8 Math.SQRT2
20.2.1.9 Math [ @@toStringTag ]
#### Function Properties of the Math Object
20.2.2.1 Math.abs ( x )
20.2.2.2 Math.acos ( x )
20.2.2.3 Math.acosh ( x )
20.2.2.4 Math.asin ( x )
20.2.2.5 Math.asinh ( x )
20.2.2.6 Math.atan ( x )
20.2.2.7 Math.atanh ( x )
20.2.2.8 Math.atan2 ( y, x )
20.2.2.9 Math.cbrt ( x )
20.2.2.10 Math.ceil ( x )
20.2.2.11 Math.clz32 ( x )
20.2.2.12 Math.cos ( x )
20.2.2.13 Math.cosh ( x )
20.2.2.14 Math.exp ( x )
20.2.2.15 Math.expm1 ( x )
20.2.2.16 Math.floor ( x )
20.2.2.17 Math.fround ( x )
20.2.2.18 Math.hypot ( value1, value2, ...values )
20.2.2.19 Math.imul ( x, y )
20.2.2.20 Math.log ( x )
20.2.2.21 Math.log1p ( x )
20.2.2.22 Math.log10 ( x )
20.2.2.23 Math.log2 ( x )
20.2.2.24 Math.max ( value1, value2, ...values )
20.2.2.25 Math.min ( value1, value2, ...values )
20.2.2.26 Math.pow ( base, exponent )
20.2.2.27 Math.random ( )
20.2.2.28 Math.round ( x )
20.2.2.29 Math.sign ( x )
20.2.2.30 Math.sin ( x )
20.2.2.31 Math.sinh ( x )
20.2.2.32 Math.sqrt ( x )
20.2.2.33 Math.tan ( x )
20.2.2.34 Math.tanh ( x )
20.2.2.35 Math.trunc ( x )

### Date Objects

### String Objects

### 
## 代码演示
### 相等代码的两个对象却不相等
```js
 let o1 = {
    name: 'a',
    age:11
    };
    let o2 = {
        name: 'a',
        age:11
    };
    console.log(o1 == o2); // false
    console.log(o1 === o2); // false
    console.log(o1 === o1); // true
}
```

## Object知识点
### Object-Class
类是一种常见的描述对象的方式。

而'归类'和'分类'则是两个主要的流派。

对于'归类'方法而言，多继承是非常自然的事情。如C++

而采用分类思想的计算机语言，则是单继承结构。并且会有一个基类Object。

minxsin interface

### Object Exercise
```js
// 推荐写法
// 我们不应该受到语言描述的干扰，在设计对象的状态和行为时，我们总是遵循'行为改变状态'的原则。
class Human {
    hurt(damage) {
        // ...
    }
}
```

### Object JavaScript
在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关心原型和属性两个部分。

Symbol Data String Accessor

JavaScript用属性来统一抽象状态和行为。

一般来说，数据属性用于描述状态，访问性属性则用于描述行为。

数据属性中如果存储函数，也可以用于描述行为。

当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，而原型对象还可能有原型，因此，会有'原型链'这一说法。

这一算法保证来，每个对象只需要描述自己和原型的区别即可。

### Object API/Grammar
- {}. []Object.defineProperty
- Object.create / Object.setPrototypeOf / Object.getPrototypeOf
- new / class / extends
- new / function / prototype (不推荐)

###  Function Object
前面讲述了JavaScript中的一般对
象。 
但JavaScript中还有一些特殊的对
象，比如函数对象。 
除了一般对象的属性和原型，函数
对象还有一个行为[[call]]。

我们用JavaScript中的function 关 键字、箭头运算符或者Function构 造器创建的对象，会有[[call]]这个 行为。

我们用类似 f() 这样的语法把对象 当做函数调用时，会访问到[[call]] 这个行为。

如果对应的对象没有[[call]]行为， 则会报错。

###  Special Object
- Array [[length]]
- Object.prototype [[setPrototypeOf]]

###  Host Object
- Object [[call]] [[construct]]
```js
foo() = 2; 
delete x;
```