setTimeout(function () {   //下次事件的开始
    console.log(3);
  }, 0);
  
  Promise.resolve().then(function () {  //本次事件的结束
    console.log(2);
  });

  let t = new Promise(()=>{  //事件的开始
      console.log(0)
  })
  
  console.log(1);




  //Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
  getJSON('/post/1.json').then(function(post) {
    return getJSON(post.commentURL);
  }).then(function(comments) {
    // some code
  }).catch(function(error) {
    // 处理前面三个Promise产生的错误
  });



 // 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });



 // Promise.prototype.finally() § ⇧
 // finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
 // finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
 //finally本质上是then方法的特例。




 //Promise.all() § ⇧
 //Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
 const p = Promise.all([p1, p2, p3]);
//  上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

//  p的状态由p1、p2、p3决定，分成两种情况。
 
//  （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
 
//  （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

//下面是一个具体的例子
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json"); //getJSON 返回一个poromise实例
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
// 上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，
// 或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。






//Promise.resolve()  :将现有对象转为Promise对象, 如果参数是一个Promise实例，将直接返回这个实例
const jsPromise = Promise.resolve($.ajax('/post'));

//参数是一个thenable对象， 转化为Promise对象，如下
 let thenable = {then: (resolve,reject) => {resolve(66)}}
 let p1 = Promise.resolve(thenable);
 p1.then((v)=>{console.log(v) })  //输出66

//参数不是具有then方法的对象，或根本就不是对象:如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
const p=Promise.resolve('hello')
p.then((v)=>{
  console.log(v)
})

//不带有任何参数:直接返回一个resolved状态的 Promise 对象
const p = Promise.resolve();
p.then(()=>{
  //---some code
})

//需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
setTimeout(()=>{console.log(3)} ,0);           //下次事件
Promise.resolve().then(()=>{console.log(2) })  //本次事件结束
console.log(1)  //本次事件开始
// 1，2，3



