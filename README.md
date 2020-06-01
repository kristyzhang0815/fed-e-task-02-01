# fed-e-task-01-02

## 简答题

### 1. 描述引用计数的工作原理和优缺点

答：1. 工作原理
- 在对象中引入计数器(无符号整数)，用于记录有多少对象引用了该对象。
- 通过增减计数器实现对内存的管理。
- 分配对象时将计数器置1。
- 更新引用时先对新指定的对象进行计数器加，而后才对旧对象进行减。
- 在对计数器做减法时，判断其计数器是否等于0，等于0 表示为垃圾，即可进行回收。
- 在更新引用时就进行了垃圾的标记与回收，因此其他线程挂起的时间（STW)会很短而且当对象变垃圾时能立马被回收。
2. 优点
- 即刻回收垃圾，在更改引用时就知道该对象是否为垃圾若是垃圾立马进行回收
- STW（其他线程挂起的时间）短，回收垃圾不需要遍历堆了。

3. 缺点
- 计数器值增减频繁。
- 计数器需要占用很多位。
- 实现繁琐，更新引用时很容易导致内存泄露。
- 循环引用无法回收(最重要的缺点)

### 2. 描述标记整理算法的工作流程
答： 
- 遍历所有对象找到活动对象进行标记
- 清除阶段会先执行整理，移动标记的活动对象位置，然后将没有标记的对象进行清除
- 优点是相比较于标记清除可以较少碎片化的空间
- 缺点是不会立即回收垃圾对象

### 3. 描述V8中新生代存储区垃圾回收的流程
答：
- v8的内存空间一分为二，小空间用于存储新生代对象（活动时间较短的对象），回收过程采用复制算法+标记整理。
- 新生代内存区分为两个等大小空间。使用空间为from，空闲空间为to
- 活动对象存储于from空间
- 标记整理后将活动对象拷贝至to
- from与to交换空间完成释放

### 4. 描述增量标记算法在何时使用，及工作原理
答：
- 增量标记算法适用于 V8 的老生代存储区域
- 增量标记算法在老生代存储区域需要优化内存回收效率时使用
- 在垃圾回收过程中，如果一次性回收会阻塞程序执行，增量标记的原理是将回收操作分段处理，这样就可以让程序执行和垃圾回收- 交替处理，从而达到效率优化

## 代码题1

基于以下代码完成下面的四个练习
```javascript
const fp = require('lodash/fp')

// 数据
// horsepower 马力, dollar_value 价格，in_stock 库存

const cars = [
  {
    name:"Ferrari FF", horsepower: 600, dollar_value: 700000, in_stock: true
  },
  {
    name:"Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false
  },
  {
    name:"Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false
  },
  {
    name:"Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false
  },
  {
    name:"Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true
  },
  {
    name:"Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false
  },

]
```

### 练习1：使用函数组合fp.flowRight()重新实现下面这个函数

```javascript
  let isLastInStock = function(cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock',last_car)
  }
```
答：
```javascript
  let isLastInStock = fp.flowRight((car)=>fp.prop('in_stock',car),fp.last)(cars)
```
### 练习2：使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name

```javascript
  let firstCarName = fp.flowRight((car)=>fp.prop('name',car),fp.first)(cars)
```
### 练习3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现

```javascript
let _average = function(xs) {
  return fp.reduce(fp.add,0,xs) / xs.length
}
//<-- 无须改动

let averageDollarValue = function (cars){
  let dollar_values = fp.map(function(car){
    return car.dollar_value
  },cars)
  return _average(dollar_values)
}

//<-- 改动以后
let averageDollarValue = fp.flowRight( _average,fp.map((car)=>fp.prop('dollar_value',car)))(cars)
```

### 练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeNames(["Hello World"])=>["hello_world"]

```javascript
let _underscore = fp.replace(/\W+/g,'_')
//<-- 无须改动，并在sanitizeNames 中使用它

let sanitizeNames = fp.map(item => fp.flowRight(_underscore, fp.lowerCase)(item))
```

## 代码题2
基于下面提供的代码，完成后续的四个练习
```javascript
//support.js
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (x) {
    return new Maybe(x)
  }
  isNothing () {
    return this._value === null || this._value === undefined
  }

  constructor (x) {
    this._value = x
  }

  map (fn) {
    return this.isNothing()? this: Maybe.of(fn(this._value))
  }
}

module.exports = {
  Maybe,
  Container
}

```

### 练习1：使用fp.add(x,y) 和fp.map(f,x)创建一个能让functor里的值增加的函数ex1

```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let maybe = Maybe.of([5,6,1])
let ex1 = x => maybe.map(fp.map(item => fp.add(item, x)))

```

### 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素

```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = xs.map(fp.first)

```

### 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母

```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let safeProp = fp.curry(function(x,0){
  return Maybe.of(o[x])
  let user = {id:2,name:'Albert'}
  let ex3 = safeProp('name')(user).map(fp.first)
})

```

### 练习4：使用Maybe重写ex4，不要有if语句
```javascript
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let ex4 = function(n) {
  if(n) {return parseInt(n)}
}

let ex4 = n => Maybe.of(n).map(parseInt)

```