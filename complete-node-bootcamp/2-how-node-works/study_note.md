## day3
### npm是什么
节点包管理器

是一个命令行界面的软件包

安装和管理开源包，包存储器

npmjs.com中可以看到里面所有的开源包，并且可以搜索对应的文档

预装了nodejs


### npm的使用方法
1. npm init // 通常创建一个package.json，可以理解成配置文件

2. npm install <dependency> --save(这个参数新的版本可以省略)// 下载依赖项，我们的项目依赖这些代码才可以运行。 常规依赖项 并观察json文件的变化

3. npm install <dev-dependency> --save-dev// 下载开发依赖项，例如代码打包器，调试器工具或者测试库，生产过程中不需要依赖他们。

【可以把常规依赖项理解成实际构建我们代码库的一部分，而开发依赖项是一种工具用来辅助开发我们的应用程序。并且注意2，3这两种下载方法只会在本地（本项目的文件夹下）起作用，因为产生的node_module中存储了他们的依赖项。】

【nodemon可以安装成全局依赖项 添加参数 -g 或者 --global， 可能需要权限 sudo 。使用nodemon的方法就是使用nodemon 替代 node <js文件> ，但这个是全局下载后的使用方法】

4. 本地的nodemon怎么使用的，需要修改package.json文件中的"scripts"对应的<run_name>，然后把运行脚本写在里面，最后调用是npm run <run_name>
```
// 修改package.json文件脚本部分
"scripts": {
    "start": "nodemon index.js"
  },

// 修改完成后，在命令行输入
npm run start
```

### 如何require npm中的第三方模块
使用slugify的意义：当query字符中出现id=0，这样本质上这样的查询是可理解性差的。而直接显示/<productname>可能是更希望看见的，这样就可以在查询中发现当前页面的意义。


### npm中第三方库的版本问题
```
  "dependencies": {
    "slugify": "^1.6.6"
  },
```
以上面的代码为例:^表示的是支持次要版本和补丁版本的更新，～表示只支持补丁版本的更新。这两种更新都是兼容的，说明你的代码肯定是能继续使用的。
主要版本.次要版本.补丁版本
次要版本可以理解成在原有的库中添加内容
补丁版本可以理解成修复了一些已发现的bug
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
分享项目的时候不应该吧node_modules一并分享，因为文件量太多。而是应该删除后，让接收者使用npm install 命令下载这些项目的依赖。

