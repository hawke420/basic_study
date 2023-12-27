### superagent

npm i superagent
superagent 的一个 get 方法本质上就已经产生了 promise，相当于我们和服务器说“我要这个，你要保证准备好了之后就给我”。
服务器交付了这个承诺之后 这个承诺状态就从 pending->solved（分成履行和拒绝）
其中 superagent.then 只会处理履行。所以在 then 方法后需要链接一个 catch 方法来处理拒绝。

### 让读取文件这样的行为也成为一个 promise 返回

```
const readF = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject(err); // readF.catch(err) 可以获取到err
      resolve(data); // readF(<filepath>).then(data)就可以获取到data
    });
  });
};
```
