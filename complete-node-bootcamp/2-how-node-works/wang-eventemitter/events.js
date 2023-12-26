const EventEmitter = require("events");

// 创建自己的事件管理器
const myEmitter = new EventEmitter();

// 1. <EventEmitter's instance>.on 是观察者
// 监听newSale事件
myEmitter.on("newSale", () => {
  console.log("The product is on sale!!!");
});

// 可以针对同一事件设置多个监听器
myEmitter.on("newSale", () => {
  console.log("Happy shopping~");
});

myEmitter.on("newSale", (clock) => {
  console.log(`The activity start on ${clock} o'clock`);
});

// 2.发出事件的对象
// 发出命名事件
// myEmitter.emit("newSale");
myEmitter.emit("newSale", 9); // 即使只有这个，前两个事件监听没有接受参数也可以被触发

// 实际中使用EventEmitter的扩展类(派生)是更好的
class Sales extends EventEmitter {
  constructor() {
    super();
  }
  makeSale(product, price) {
    //扩展了原有的类，并且把emit封装到了一个含义明确的函数体部分
    this.emit("setsale", { product, price });
  }
  saleOut(product) {
    this.emit("non", product);
  }
}

const theEmitter = new Sales();
theEmitter.on("setsale", (obj) => {
  console.log(`${obj.product}(${obj.price}rmb)`);
});
theEmitter.on("non", (product) => {
  console.log(`The ${product} have sale out.`);
});

theEmitter.makeSale("iphone", 6999);
theEmitter.saleOut("iphone");
