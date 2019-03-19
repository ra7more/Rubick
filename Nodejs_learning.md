#### 1.module.exports 和 exports

module和exports是node.js给每个js文件内置的两个对象,我们通过console.log(module)和console.log(exports)就可以看出来

```javascript
console.log(module);  // Module{id:".", exports:Object, parent:null.....}
console.log(exports); // object {}
```

其实module.exports和exports一开始都是空对象{} 这个时候其实是等价的

也就是说 module.exports.test = 100 和 exports.test = 100 其实也就是给对象添加了一个属性

但是**require引入的对象本质上是module.exports**，也就是说当exports和module.exports的同一个属性不相同时，require只会引入module.exports的内容，这样理解来看，exports其实相当于辅助工具。

#### 2.this/bind

#### 

#### 3.promise对象 ---- async/await

先说Promise对象 其实是链式写法 看一下最简单的例子

```javascript
function test(resolve, reject){
    var timeOut = Math.random() *2;  // Math.random()方法生成一个0～1之间的伪随机数
    setTimeout(function(){
         if (timeOut < 1) {
            log('call resolve()...');
            resolve('200 OK');
        }
        else {
            log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    },timeOut *1000);
}

/*
这里test并不关心 resolve和reject是如何处理的，使用promise对象来执行test函数，如果成功就执行then，不成功就执行catch
*/
var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：' + reason);
});

//把promise串联起来 和上面的代码等价
new Promise(test).then(function (result) {
    console.log('成功：' + result);
}).catch(function (reason) {
    console.log('失败：' + reason);
});
```

Promise还可以做更多的事情，比如，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。

要串行执行这样的异步任务，不用Promise需要写一层一层的嵌套代码。有了Promise，我们只需要简单地写：

```javascript
//job1.then(job2).then(job3).catch(handleError);

// 举个例子
// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    log('start new Promise...');
    resolve(123);
});

p.then(multiply)
 .then(add)
 .then(multiply)
 .then(add)
 .then(function (result) {
    log('Got value: ' + result);
});

```

所以Promise的好处就是把执行代码和处理结果的代码分离开以及解决多个异步回掉难以控制和维护的问题。

这里调用resolve方法，就是把promise对象变为操作成功的状态，然后执行then方法里的操作而已，resolve里传入的对象result就会对应传入then的function里。

而reject也是同理。

TODO:

而Promise也有promise.all() promise.race()方法……

------

和Promise一样，Async/await 的主要益处也就是为了避免callback hell，并且结合ES6的Promise使用





#### 4.Nodejs 基本建站和注意点(todo)

```text
. 
|index.js       //entry point
|--middleware
|--routes       // define the project routes
|--services     // write basic business logic here for different features
|--dao          // (optional) database access object
|--utilities    // help functions
|--test         // unit test and interface test
   | middleware
   | services
   ......
|Build          // build scipt and other tools
|package.json 

```

LOG 收集 / RBAC 访问权限控制 / SSO单点登录 都是怎么做的？ 

