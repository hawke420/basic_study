// 研究事件循环阶段的顺序
const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2; // 默认线程池大小是4，这里强行改变线程池的大小
setTimeout(() => console.log("Timer 1 finished"), 50); // 在 Node.js 中，事件循环的执行流程是基于事件触发的，而不是严格按照函数的调用栈执行。因此，事件循环中的不同阶段可能包含来自不同代码块的回调函数。
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("../starter/test-file.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("not found file");
  }
  console.log("I/O finished");
  console.log("-------------");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished")); // 先于Timer 2执行，因为是I/O后一个阶段

  process.nextTick(() => console.log("Process.nextTick")); // 插队了，发生在下一个循环阶段之前

  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted");
  // });
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted"); // 这样的同步方法阻塞了事件循环，这些代码不属于事件循环中的部分
});

setImmediate(() => console.log("Immediate 3 finished"));
console.log("Hello from the top-level code");
