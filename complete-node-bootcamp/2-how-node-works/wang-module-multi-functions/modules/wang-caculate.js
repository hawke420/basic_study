// solution 1
// console.log(arguments);
// console.log("------------------------------");
const add = (a, b) => {
  return a + b;
};

module.exports.add = add; // 以exports属性的形式输出
module.exports.divide = (a, b) => {
  return a / b;
};

// console.log(arguments); //可以把这一行放在最开始和放在最后看参数0的改变。 '0': { add: [Function: add], divide: [Function] },
// console.log(require("module").wrapper);

// solution 2
class caculator {
  add(a, b) {
    return a + b;
  }
  divide(a, b) {
    return a / b;
  }
  multiple(a, b) {
    return a * b;
  }
  thedecrease(a) {
    a--;
  }
}

// module.exports = caculator; // 以一个类的形式进行输出
// module.exports = class {
//   // 匿名类
//   add(a, b) {
//     return a + b;
//   }
//   divide(a, b) {
//     return a / b;
//   }
//   multiple(a, b) {
//     return a * b;
//   }
//   thedecrease(a) {
//     a--;
//   }
// };
// console.log(arguments); // module exports: [class caculator], 但是参数0中为空
