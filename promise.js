// 一个简单的promise例子
function test(resolve, reject){
    var timeOut = Math.random() *2;
    console.log('set timeOut to:'+timeOut+' seconds');
    setTimeout(function(){
        if(timeOut<1){
            console.log('call resolve()');
            resolve('200 OK');
        }
        else{
            console.log('call reject()');
            reject('timeout in'+ timeOut +'seconds');
        }
    }, timeOut*1000);
}
/*
var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：' + reason);
});
*/

// 使用promise 串行执行任务
// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    console.log('start new Promise...');
    resolve(123);
});

p.then(multiply)
 .then(add)
 .then(multiply)
 .then(add)
 .then(function (result) {
    console.log('Got value: ' + result);
});




