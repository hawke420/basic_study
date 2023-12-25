## day3，4

### npm 是什么

节点包管理器

是一个命令行界面的软件包

安装和管理开源包，包存储器

npmjs.com 中可以看到里面所有的开源包，并且可以搜索对应的文档

预装了 nodejs

### npm 的使用方法

1. npm init // 通常创建一个 package.json，可以理解成配置文件

2. npm install <dependency> --save(这个参数新的版本可以省略)// 下载依赖项，我们的项目依赖这些代码才可以运行。 常规依赖项 并观察 json 文件的变化

3. npm install <dev-dependency> --save-dev// 下载开发依赖项，例如代码打包器，调试器工具或者测试库，生产过程中不需要依赖他们。

【可以把常规依赖项理解成实际构建我们代码库的一部分，而开发依赖项是一种工具用来辅助开发我们的应用程序。并且注意 2，3 这两种下载方法只会在本地（本项目的文件夹下）起作用，因为产生的 node_module 中存储了他们的依赖项。】

【nodemon 可以安装成全局依赖项 添加参数 -g 或者 --global， 可能需要权限 sudo 。使用 nodemon 的方法就是使用 nodemon 替代 node <js 文件> ，但这个是全局下载后的使用方法】

4. 本地的 nodemon 怎么使用的，需要修改 package.json 文件中的"scripts"对应的<run_name>，然后把运行脚本写在里面，最后调用是 npm run <run_name>

```
// 修改package.json文件脚本部分
"scripts": {
    "start": "nodemon index.js"
  },

// 修改完成后，在命令行输入
npm run start
```

### 如何 require npm 中的第三方模块

使用 slugify 的意义：当 query 字符中出现 id=0，这样本质上这样的查询是可理解性差的。而直接显示/<productname>可能是更希望看见的，这样就可以在查询中发现当前页面的意义。

### npm 中第三方库的版本问题

```
  "dependencies": {
    "slugify": "^1.6.6"
  },
```

以上面的代码为例:^表示的是支持次要版本和补丁版本的更新，～表示只支持补丁版本的更新。这两种更新都是兼容的，说明你的代码肯定是能继续使用的。
主要版本.次要版本.补丁版本
次要版本可以理解成在原有的库中添加内容
补丁版本可以理解成修复了一些已发现的 bug
主要版本属于是重大更新，可能是连代码命名规则或者是实现策略都进行了变化

```
指定下载版本
npm install slugigy@1.0.0

查看是否当前有过期的包
npm outdated

json文件默认^，即到次要版本的更新
wang@iZwz9docnkijw9g18bxn4uZ:~/yuhouse/basic_study/complete-node-bootcamp/2-how-node-works/wang-npm-use$ npm outdated
Package  Current  Wanted  Latest  Location              Depended by
slugify    1.0.0   1.6.6   1.6.6  node_modules/slugify  wang-npm-use

修改json文件中^->~ 可以看见Wanted版本只能到补丁版本的更新
wang@iZwz9docnkijw9g18bxn4uZ:~/yuhouse/basic_study/complete-node-bootcamp/2-how-node-works/wang-npm-use$ npm outdated
Package  Current  Wanted  Latest  Location              Depended by
slugify    1.0.0   1.0.2   1.6.6  node_modules/slugify  wang-npm-use

修改成*的话就可以到主要版本的更新

卸载/更新当前的库
npm uninstall <third_parts>
npm update <third_parts>
```

### 分享项目

分享项目的时候不应该吧 node_modules 一并分享，因为文件量太多。而是应该删除后，让接收者使用 npm install 命令下载这些项目的依赖。

### 一个管理代码格式的插件 prettierrc

通过添加一个.prettierrc 在本地文件中，然后在 setting 中设置优先选择 prettierrc 管理格式并且保存时更新代码格式。
下面这个是一个简单的有限的设置，将所有的引号限定成单引号的形式。

```
{
    "singleQuote": true
}
```

### Web 是怎么工作的

### 区分 Web 前端和后端（这一个章节很重要：BV1FY4y1H7ka p27）

web 前端：Broswer——我们可以看得见的，前端的技术栈有 HTML、CSS、JS，现在还有一些基于此开发的框架，例如 Vue、React、Angular 等
web 后端：Http server——作为 Web 后端的入口（是与 Broswer 实际通信的内容），负责接收客户端的请求并且可以解析 url 以确定请求的服务资源。

静态服务器：本质上就是托管了资源，允许通过 HTTP 向客户端提供静态资源
动态服务器（application）：相较于静态的服务器，可以理解成一个 dynamic app/web，可以通过客户端请求内容，这部分就是既可以和静态资源进行双向通信，也可以和 http server 进行双向通信。也可以和外部的 database 进行链接（增删改查）。
API 的方式将传统动态方式通过模版构建网站的阶段（原本是在服务端渲染）推迟到了 Broswer 之后进行前端渲染。【将服务端渲染转换成客户端渲染】

### Node 的架构

主要：基于谷歌的 v8 引擎（帮助理解 js 部分，实现转换），libuv（开源股，关注异步 IO，可以关注到底层，实现 nodejs 的两个重要特性事件循环和线程池）
其他：http-parser,c-ares,OpenSSL,zlib
Node 只在一个线程中运行。
当一个程序开启的时候，会先执行所有的 top-level 代码，然后再请求所需要的模块，注册事件回调函数，最后开始事件循环
initialize program -> execute top-level code -> require modules -> register event callbacks -> event loops
事件循环是整个 nodejs 的核心部分，完成大部分的任务，但是当任务比较繁重的时候就需要引入线程池。线程池是 nodejs 处理一些任务的一种机制，特别是对于那些可能会阻塞事件循环的长时间运行的任务。

### 理解事件循环

所有的应用程序代码都是在回调函数内部执行（除了 top-level code），也有可能部分代码会从事件循环中 offload 到线程池中。
事件循环有多个阶段，每个阶段都有一个回调队列，用来接受事件的回调。
事件循环的顺序：程序运行 -> setTimeout -> I/O -> setImmediate -> close callbacks
其中 nextTick 会插队在事件循环中 ，而不是一个 tick 后（相反 setImmediate 更像是一个 tick 后，而不是立即），它是一个微任务。微任务是在事件循环的不同阶段之间执行的任务，其优先级比宏任务（例如 setTimeout、setImmediate、I/O 操作等）更高。

### 查看线程池的好处，如何改变线程池的大小

```
默认情况——四个几乎同时完成
2804 password encrypted
2819 password encrypted
2970 password encrypted
2974 password encrypted
```

```
设置 线程池的大小为1->4 观察变化
process.env.UV_THREADPOOL_SIZE = 1;
1583 password encrypted
3082 password encrypted
4686 password encrypted
6322 password encrypted

process.env.UV_THREADPOOL_SIZE = 2;
1653 password encrypted
1688 password encrypted
3163 password encrypted
3215 password encrypted
```

### 事件触发机制 事件驱动架构

Event emitter --emits events--> Event listener --calls--> Attached callback function
服务器其实是一个 nodejs 中的一个实例 EventEmitter 类，继承了监听并且触发事件（request 事件）的能力。 这种 nodejs 的架构是基于观察者模式。

```
// 注册事件监听器，这个server就是一个实例类
server.on('request', (request, response) => {
  console.log('Request received');
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello, world!');
});
```

在事件驱动的编程中，你可以根据需要选择是否在事件触发时传递参数，以便监听器能够获取事件相关的信息。

```
myEmitter.on("newSale", () => {
  console.log("Happy shopping~");
});
myEmitter.on("newSale", (clock) => {
  console.log(`The activity start on ${clock} o'clock`);
});

myEmitter.emit("newSale", 9); // 即使只有这个，即使有事件监听没有接受参数也可以被触发

```
