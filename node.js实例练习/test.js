
let aa = {a:2}
let b=aa
let cc=b
console.log('aa_1:',aa)
b.a=3
console.log('aa_2:',aa)
cc.a=5
console.log('aa_3:',cc)
return ;

let FF =function (x, y = 'World') {
  //console.log(x, y);
}
FF.prototype.max = '10'

let ff = new FF(1,2)
ff.max=20
console.log('FF:', FF.prototype.max)
console.log('ff:', ff.max )
return ;
//console.log(new Date() )



function log(x, y = 'World') {
    console.log(x, y);
  }
  
  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello


// 写法一
function m1({x = 0, y = 0} = {}) {
    console.log([x, y]) ;
  }
  
  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
    console.log([x, y]) ;
  }
  m1({})
  m2({})


  function foo(x = 5, y = 6) {
    console.log(x, y);
  }
  //undefined:啥都不没有， null:存在点啥
  foo(undefined, null)


//---内部作用域， 函数参数为单独作用域
  var x = 1;
  function foo2(x, y =  () => { x = 2; }) {
    var x = 3;
    //y();
    console.log(x);
  }
  
  foo2() // 3
  console.log(x) // 不受参数单独作用域影响，也不受foo()内部作用域响应


//======= ...values 用法
 
//******注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

function add(...values) {
    let sum = 0
    for (var val of values)  sum += val;
    console.log(sum) ;
  }
  add(2, 5, 3) // 10

  function push(array, ...items) {
    items.forEach( (item)=> {
      array.push(item);
      console.log(item);
    });
    console.log("a",array)
  }
  
  var a = [];
  push(a, 1, 2, 3)



 //*** ES6 允许使用“箭头”（=>）定义函数。
  var f = () => 5;
  // 等同于
  var f = function () { return 5 };
  
  var sum = (num1, num2) => num1 + num2;
  // 等同于
  var sum = function(num1, num2) {
    return num1 + num2;
  };