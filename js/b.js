let p1 = new Promise(function(resolve, reject){
    console.log("1");
    resolve(2);
    // return reject(4);
    // return Promise.resolve(5);
});

setTimeout(() => {
    p1.then(console.log);
}, 10);


p1.then(() => {
    console.log(3);
});

// 1, Promise的构造器接受一个参数，它是一个函数，构造器执行时会立即调用这个函数，并传入两个参数，这两个参数都是函数，且只接受一个参数。
// 因此，可以假设resolve和reject这两个参数都是预先定义好的函数，他们的功能有两个，一是设置Promise对象的状态，二是把[异步]计算的结果值
// 传给Promise对象。
// 2，Promise的then方法接受两个参数，这两个参数都是函数，这两个函数都是只接受一个参数。这两个函数什么时候会被调用呢？最早也要到这轮事件
// 循环的末尾。因为这两个函数会被放到微任务的队列中。什么时候会被放入呢？Promise对象变成settled状态的时候，即被fulfill或reject的时候。
// 3，resolve和reject的逻辑模型：第一步，设置Promise对象的状态，第二步，把调用处理函数的任务放入微任务队列。
//     this.state = fulfilled;
//     nextTick(() => {
//         for (let onFulfilled of onFulfilleds)  // 因为一个Promise对象的then函数可以调用多次，即可以设置多个处理函数。
//              onFulfilled(data);
//         onFulfilleds = [];
//     });
//     
// 4，若调用then时Promise已经fulfill或reject了，则立即把then传入的处理函数放入微任务队列。
// if (this.state === fulfilled) {
//     nextTick(() => {
//         onFulfilled(data)
//     });
// } else {
//     onFulfilleds.push(onFulfilled)
// }
