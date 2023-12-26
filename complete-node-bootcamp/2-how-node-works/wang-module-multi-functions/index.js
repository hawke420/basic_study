const caculate = require("./modules/wang-caculate"); // Make sure wang-caculate module is correctly defined.
// const caculator = new caculate(); // solution 2

console.log(caculate.add(3, 4)); //solution 1
// console.log(caculator.add(3, 4)); // solution 2

// solution 1 ：返回的 { add: [Function: add], divide: [Function] },
// 对require得到的进行一个解构
const { divide, add } = caculate;
console.log(divide(3, 2));
console.log(add(3, 2));

// cache的存在使得模块导出会一直存在，而require其实只会调用一次
require("./modules/caching")();
require("./modules/caching")();
require("./modules/caching")();
