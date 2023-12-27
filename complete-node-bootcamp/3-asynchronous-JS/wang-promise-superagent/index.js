const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");

// 1.异步读取文件中的狗的种类 —— 回调地狱会导致代码可读性差，且维护困难
// fs.readFile(`${__dirname}/../starter/dog.txt`, "utf-8", (err, data) => {
//   if (err) return console.log(err.message);
//   console.log("Breed:", data);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       fs.writeFile(`./photo_source.txt`, res.body.message, (err) => {
//         if (err) console.log("save fail");
//       });
//     });
// });

// 2.superagent.get就是一个 Promise
// fs.readFile(`${__dirname}/../starter/dog.txt`, "utf-8", (err, data) => {
//   if (err) return console.log(err.message);
//   console.log("Breed:", data);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile(`./photo_source.txt`, res.body.message, (err) => {
//         if (err) console.log("save fail");
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// 3.将读取文件写成一个返回的 Promise 的函数
const readF = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// 4.实现写 Promise
const writeF = (file, context) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, context, "utf-8", (err) => {
      if (err) reject(err);
      resolve("write success");
    });
  });
};

// readF(`${__dirname}/../starter/dog.txt`)
//   .then((res) => {
//     console.log(res);
//     superagent
//       .get(`https://dog.ceo/api/breed/${res}/images/random`)
//       .then((pic) => {
//         console.log(pic.body.message);
//         writeF(`./photo_source.txt`, pic.body.message)
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// 5.受到启发，直接返回superagent.get() -- 这就是一个 Promise
readF(`${__dirname}/../starter/dog.txt`)
  .then((res) => {
    console.log(res);
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
  })
  .then((pic) => {
    // 下一个链接的还是then，处理下一个Promise 解决
    console.log(pic.body.message);
    // writeF(`./photo_source.txt`, pic.body.message)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    return writeF(`./photo_source.txt`, pic.body.message);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.message);
  });
