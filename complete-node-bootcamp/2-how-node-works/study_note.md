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