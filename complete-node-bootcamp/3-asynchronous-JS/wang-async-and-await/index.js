const fs = require("fs");
const superagent = require("superagent");

const readF = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeF = (file, context) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, context, "utf-8", (err) => {
      if (err) reject(err);
      resolve("write success");
    });
  });
};

const getPic = async () => {
  try {
    console.log("test1");
    const readres = await readF(`${__dirname}/../starter/dog.txt`);
    console.log(readres);
    console.log("test2"); // 无论如何都会等前面的执行完成
    const access = await superagent.get(
      `https://dog.ceo/api/breed/${readres}/images/random`
    );
    console.log(access.body.message);
    const writeinto = await writeF(`./photo_source.txt`, access.body.message);
    console.log(writeinto);
  } catch (err) {
    console.log(err);
  }
  return "👀 YES";
};

const gg = getPic(); // 返回Promise<pending> 相当于offload了，但继续执行后面的
console.log(gg);
console.log("done?"); // 优先test2执行，说明getPic里面只是内部“阻塞”

getPic().then((res) => {
  console.log("done");
  console.log(res);
});
// getPic调用了两次，内部的代码都会执行两次，但是在async外部的代码由于是异步的，比如gg就访问不到真实的返回值
// 但是使用then就会等待Promise的返回值
