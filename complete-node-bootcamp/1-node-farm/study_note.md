## day1，2
实现了用json对象作为一个API，为html中填充对应部分的内容。

{%%}占位符的格式

读入文件最好是一次读取，不要在每个路由的部分进行读取。使用同步阻塞的方式。

异步阻塞会导致回调地狱，但是后续是有办法减少这样的可读性差的方法。

利用writeHead设置header一定要在end返回响应之前。

使用模块的思想：每个文件都是一个module，使用require可以导入并调用模块对应的方法。

导出模块的设置: module.exports ; 对应的接收模块的设置: require('./path')，这里使用.是因为这里的不是当前工作路径（运行node的地方），对于require比较特别---选择的会是以调用require的那个文件作为相对路径

### 关于网页的状态码
200 OK

404 NOT FOUND


### 上传到自己的github上
```
删除clone的仓库下的.git文件
然后 git init
git add .
git --config ...(邮箱，用户名)
git commit 
git remote add origin/main(分支名字) url(远程的仓库的地址)
git push
```

### 一些问题 
url.parse 为什么要用{query,pathname}来接收？

json_obj.map 中传入的回调函数是怎么调用的？

什么是回调地狱？

__dirname 和 . 使用时候的区别？什么时候前者和后者是等效的？

