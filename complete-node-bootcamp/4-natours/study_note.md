## day7,8,9

### 什么是 Express

可以理解成是一种 Nodejs 的再抽象和封装，大大简约了 Nodejs 的书写。

### REST 架构

### 如何理解 HTTP 请求

对于一个 URL: www.example.com/tours

其中整个网址是一个 URL，而/tours 可以被看作是一个 endpoint

但是对于这个目标上的资源，我们采取的逻辑可能是增删改查四种，需要访问这个 URL 实现四种不同的逻辑，就需要通过设置不同 HTTP 请求。

HTTP 请求通常可以分成下面几种类型：

POST: 通常是用来创建，通常服务器希望这种是客户端的请求和数据同时发过来

GET：通常是客户端读取数据，服务器将数据发送出去

PUT 和 PATCH 都是为了更新数据，方式和 POST 类似，但是目的不同。并且 PUT 要求是整个对象发过来，而 PATCH 是希望只发送更新的过来。

DELETE：为了删除数据

### 整理所有的路由

通过定义多个方法——给不同的 http 请求对应的回调函数命名

```
const getTour = (req,res) => {
  const id = req.params();
  const find_id = req.params.id * 1;
  const tour = tours.find((el) => el.id === find_id);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "invalid request: excessive id.",
    });
  } else {
    res.status(200).json({
      status: "success",
      // data: tours[req.params.id]
      data: tour,
    });
  }
}

app.route('/api/v1/tours/id').get(getTour).patch(updateTour).delete(deleteTour);

```

```
const getALLTours = (err,data) => {

}

app.route('/api/v1/tours').get(getALLTours).post(createTour);

```

### 中间件

按照中间件的顺序，依次执行，如果不调用 next()，则不会执行后面的中间件。

express.json() 是一个中间件，用来解析 json 数据，然后将解析后的数据放到 req.body 中。和自定义中间件一样，也是通过 next() 来调用下一个中间件。它的

next() 是在解析完数据后调用的，所以后面的中间件才能拿到解析后的数据。所以，如果我们想要在自定义中间件中使用 req.body，就需要在 express.json() 之后。
当执行到 end 之后就不会再继续执行后面的请求，因此中间件也不会对后面的请求起作用。

```
app.use((req,res,next) => {
  console.log('hello from the middleware');
  next();
});
```

### 日志中间件 morgan

### 设置子路由

将程序进行分离，为每一项资源设置单独的 Router。

`app.use("/api/v1/user", user_router)`这行代码的含义是，当你的应用收到一个以`/api/v1/user`开头的请求时，它会将请求交给`user_router`来处理。

### 关于模块的分离

注意在导出模块的时候 exports.func = ()=>{} 是可以直接修改 module.exports 的属性的，因为 exports 就是 module.exports 的一个引用。

但是如果导出模块的时候 exports = funcs，funcs 是一系列的方法，可以理解成一个类。那么这个不会更改 module.exports。

在 JavaScript 中，当你将一个对象赋值给一个变量时，你实际上是将这个对象的引用赋值给了这个变量。这意味着，如果你修改了这个变量的属性，原始对象的相应属性也会被修改。

然而，当你将一个新的值（如一个函数或一个新的对象）赋值给这个变量时，你实际上是改变了这个变量的引用，使其指向了一个新的对象。这并不会影响到原始对象。

### router.param

`router.param()` 方法用于在路由中间件中加载参数。这个方法在加载路由级中间件之前执行，且只对在当前 router 上定义的中间件有效。同时可以避免在每个路由中间件中重复写相同的代码。

`router.param()` 在 Express.js 中是一种特殊类型的中间件，它用于处理 URL 参数。当路由中包含某个参数时，`router.param()` 中定义的中间件就会被执行。`router.param()` 方法接受两个参数：参数名称和一个中间件函数。当路由中包含匹配参数名称的部分时，这个中间件函数就会被调用。在你的代码中，`router.param('id', ...)` 定义了一个中间件，这个中间件会在任何包含 `:id` 参数的路由被处理之前执行。这个中间件函数接受四个参数：`req`（请求对象）、`res`（响应对象）、`next`（next 函数）和 `val`（URL 参数的值）。在这个函数中，你可以对 `val` 进行任何需要的处理，例如验证或格式化。

如果你在中间件函数中调用了 `next()`，那么控制权会被传递给下一个中间件或路由处理程序。如果你发送了一个响应（例如，通过 `res.json()`），那么请求-响应周期就会结束，不会再有其他的中间件或路由处理程序被执行。

比如说在 tourController.js 中为了验证查询的 id 是否是合理的，在很多个函数里面我们都写了重复的代码，这时候我们可以在 tourRouter.js 中使用 router.param()方法来避免这种重复的代码，这里只需要实现一次逻辑验证。

```
router.param('id',(req,res,next,val) => {
  console.log(`Tour id is ${val}`);
  if (${req.params.id} > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid request: excessive id.'
    });
  }
  next();
});
```

为什么这里需要 return?

目的是为了结束当前的中间件函数的执行。如果你不使用 return，那么即使你已经发送了响应，当前的中间件函数可能还会继续执行，这可能会导致错误或者不可预期的行为。即会继续调用 next()。然后可能后续的中间件函数会再次发送响应，这样就会报错。

一个小挑战

```
exports.checkNew = ((req,res,next)=>{
  if(!req.body.name || !req.body.price){
    return res.status(400).json({
      status: 'fail',
      message: 'create fail: missing name or price'
    })
  }
  next();
})
```

这两个在使用的区别是，一个是 url 中路由会存在 id，这种情况可能是要对所有存在 id 的路由进行这个中间件的操作，而另一个是针对指定的某一个操作有这个判断（比如说创建一个新的 tour 的时候）就可以在 Router.post(checkNew,createTour)。 通过链接这些中间件来实现。

### express.static

用来返回静态资源，而不需要使用路由来返回这些内容，比如说图片，css，html 等等。

### 环境变量

环境变量就是一个全局变量，可以在任何地方使用，但是在不同的环境下，它的值是不同的。他可以定义一个 node 正在使用的环境。nodejs 其实设置了很多的环境变量。

process.env 和 app.get('env') 都是在 Node.js 和 Express.js 中获取环境变量的方式，但它们的用途和行为有所不同。

process.env 是 Node.js 提供的一个全局对象，用于访问当前进程的环境变量。你可以使用 process.env 来获取或设置任何环境变量，例如 process.env.DB_HOST 或 process.env.PORT。

app.get('env') 是 Express.js 提供的一个方法，用于获取当前 Express 应用的运行环境。如果你没有明确设置 NODE_ENV 环境变量，那么 app.get('env') 默认返回 'development'。

在大多数情况下，app.get('env') 实际上是读取 process.env.NODE_ENV 的值。但是，如果 process.env.NODE_ENV 没有被设置，app.get('env') 会默认返回 'development'，而 process.env.NODE_ENV 则会是 undefined。

总的来说，process.env 是一个更通用的工具，可以用来访问所有的环境变量，而 app.get('env') 是一个更具体的工具，专门用来获取 Express 应用的运行环境。

将 config.env 中的环境变量配置到 node 中

```
shell上下载依赖: npm i dotenv

在server.js中引入:
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
```

### 帮助创建更好的编程规范 ESLint

```
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

```

简单解释 👆 这个 recipe，暂时不要理解，只需要按照配置来做

其中 eslint-config-prettier 是用来关闭所有和 prettier 冲突的规则

eslint-plugin-prettier 是将 prettier 作为 eslint 的规则来使用

eslint-config-airbub 是 airbub 的 eslint 规则

eslint-plugin-node 是 node 的 eslint 规则

eslint-plugin-import 是 import 的 eslint 规则

eslint-plugin-jsx-ally 是 jsx 的 eslint 规则

eslint-plugin-react 是 react 的 eslint 规则

这样的设置必须在本地完成，如果是全局可能会不工作

### 关系型数据库和非关系性数据库

MySQL, PostgreSQL, Oracle, Microsoft SQL Server, SQLite 是关系型数据库

MongoDB, Redis, CouchDB, Cassandra, Neo4j 是非关系型数据库

如何理解这个关系？

关系是指数据之间的关系，比如说一个用户和他的订单，一个订单和他的商品，这些数据之间的关系就是关系型数据库的优势，而非关系型数据库则是没有这种关系的，他们之间的数据是独立的，没有关系的。

假如说数据库中有一个文档（表），里面是关联了其他的文档（表），那么这个文档（表）就是关系型数据库，而如果这个文档（表）是独立的，没有关联其他的文档（表），那么这个文档（表）就是非关系型数据库。但是在非关系型数据可以优先考虑嵌入。

在非关系型数据库如 MongoDB 中，"嵌入"是指在一个文档中直接包含其他文档的数据，而不是通过引用其他文档的方式来关联数据。这种方式可以提高查询效率，因为数据库可以在一次查询中获取所有需要的数据。

### 数据库的使用

选择的是 atlas 云服务托管我的数据库

然后在云服务器上创建了 mongo 的客户端，并且在 atlas 设置了白名单 ip

使用了 mongosh 来连接数据库，mongosh 按照官方在服务器上下载的。

为了更好地使用数据库，在本地下载了 navaicat premium，作为一个数据库管理工具来连接云端的数据库。

然后这个数据库连接存在一些问题：主要是还是先设置白名单，然后可以用 URI 来自动配置，然后这个 URI 可以通过参考 atlas 连接 shell 的方式

```
mongodb+srv://<username>:<password>@natours.pmdnytt.mongodb.net/
然后password什么的还是要设置成username对应的密码，SSL不要选择认证就ok。
```

然后云服务器也有 mongo 客户端，我是设置了一个 alias 命令——mongo 调用。 然后进去的时候输入密码就可以。

`alias mongo="mongosh "mongodb+srv://natours.pmdnytt.mongodb.net/" --apiVersion 1 --username hawke"`

### mongodb 的基本操作

```mongodb
show dbs //显示所有的database
use sample_natours //使用sample_natours database
db.users.insertOne({name:"xiao",age:12}) // 在当前database中的users table中加入一个新的document
db.users.insertMany([{},{}]) // 加入多个document
```

```mongodb
db.tours.find() //在当前 database 中的 tours table中查找所有的数据
db.tours.find({name: 'The Forest Hiker'}) //在当前 database 中的 tours table中查找 name 为 The Forest Hiker 的数据
db.users.find({age:{$lte:25}}) // 查找所有age<=25的documents
db.users.find({name:"yubao",age:{$lte:23}}) // 逗号表示 and，$lte表示小于等于（需要使用大括号俩表示对象，然后:分隔）
db.users.find({$or:[{name:"yubao"},{age:{$gte:25}}]}) // or 的使用，注意 or 里面的对象需要使用中括号表示数组
db.users.find({$or:[{name:"yubao"},{age:{$gte:25}}]},{name:1}) // 第二个参数表示只返回 name 这个属性，1 表示返回，0 表示不返回
```

```mongodb

db.users.updateOne({name:"yubao"},{$set:{age:16}}) // 更新一个document，第一个参数是查询的条件，第二个参数是更新的内容，$set表示更新的内容
db.users.updateMany({age:{$lte:18}},{$set:{age:-1}}) // 更新多个document
```

updateOne 和 updateMany 的第二个参数可以使用 $inc 来增加一个数值，$inc:{age:1} 表示 age 这个属性增加 1

这两种方法的区别是，updateOne 只会更新第一个满足条件的 document，而 updateMany 会更新所有满足条件的 document。

```mongodb
db.users.replaceOne({name:"yubao"},{name:"xiaohuahua",age:18,sex:"male",job:true}) // 替换一个document，第一个参数是查询的条件，第二个参数是替换的内容。replaceMany不存在。
```

```mongodb
db.users.deleteOne({name:"xiaohuahua"}) // 删除一个document
db.users.deleteMany({age:{$lte:18}}) // 删除多个document
```

### mongoose

mongoose 是一个 nodejs 中的库，用来操作 mongodb 的，它的作用是将 mongodb 的操作封装成了一个对象，然后可以通过这个对象来操作 mongodb。

express 是对 node 的封装，mongoose 是对 mongodb 的封装。都属于抽象层。

属于是 ODM 的一类库：Object Document Mapping，对象文档映射，将对象和文档进行映射，将对象转换成文档，然后存储到数据库中。

可以实现更快更好地与数据库交互。

提供了一些数据和关系建模的模式，可以更好实现数据的验证、简单的 API 查询和中间件功能。

```npm
npm i mongoose
```

### 关于配置问题

通过在 mongodb atlas 的 connect 中选择 drivers 的方式,选择对应的 Node.js 方式。

然后把`mongodb+srv://hawke:<password>@natours.pmdnytt.mongodb.net/?retryWrites=true&w=majority`
中的<password>替换成设置的 USER_PASSWORD，可以在./net 后面加上对应的你想要链接到的数据库的名字，我这里是/sample_natours。如果这里不设置的话，就会默认给你创建一个 test 的数据库。

### mongoose 的使用方法

```nodejs
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<password>',process.env.USER_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((con) => {
  console.log('DB connection successful!');
}).catch(err => {
  console.log(err);
});
```

```
// 创建一个schema，用来定义表的结构
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "don't miss name"],
    unique: true // 这个属性必须是唯一，不可重复的
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "don't miss price"],
    default: 0
  }
});
```

```
// 这样就有了一个实例，但是还是空的不会显示在数据库中
const Tours = mongoose.model('tours', tourSchema);
```

```
// new了之后table tours就出现了
const testTour = new Tours({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
});

// 到这里才会真正保存到数据库中
testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log(“ERROR💥：”,err);
});
```
