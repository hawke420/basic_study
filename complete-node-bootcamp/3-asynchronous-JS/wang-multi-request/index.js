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

const get_multiPic = async () => {
  try {
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/african/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/borzoi/images/random`
    );
    const res3 = superagent.get(`https://dog.ceo/api/breed/chow/images/random`);
    // 这里才进行await 等待接受所有的Promise
    const res = await Promise.all([res1, res2, res3]);
    const imgs = res.map((el) => el.body.message);
    console.log(imgs);
    const writeinto = await writeF(`./photo_source.txt`, imgs.join("\n"));
    console.log(writeinto);
  } catch (err) {
    console.log(err);
  }
};

get_multiPic();
