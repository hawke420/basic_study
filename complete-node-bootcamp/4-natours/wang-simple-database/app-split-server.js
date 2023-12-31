const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 将当前的Node绑定到配置文件中
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app-split-route'); // 先定义可能在app中会出现undefined错误

const hostname = '120.79.43.97';
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    // console.log(con.connections);
    console.log('database connection success.');
  })
  .catch(err => {
    console.log(err);
  });

// 指定数据类型：相当于表中的每个元素的属性必须依据这种模式
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

// 按照上面的模式构建模型
const Tours = mongoose.model('tours', tourSchema);
// 按照Tours模型创建document实例
const testTour = new Tours({
  name: 'The Park Camper',
  price: 559
});

// 到这一步table tours就会有这条document数据了
testTour
  .save()
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log('ERROR:💥', err);
  });

/*
// express查看当前环境
console.log(app.get("env"));
// 查看进程可以使用的环境变量
console.log(process.env);
*/

app.listen(port, () => {
  console.log(`App running on port http://${hostname}:${port}`);
});
