const fs=require('fs');
const hello="Hello, Nodejs";
console.log(hello);

// 写文件,同步的方式，一行接着一行来执行。存在blocking
const res=fs.readFileSync("./123.txt","utf-8")
console.log(res)

const text=`es6 syntax语法需要好好学习 cite\n[${res}]\nCreate on ${Date.now()};`
fs.writeFileSync("./out.txt",text);
console.log("write to out.txt")


// 异步，非阻塞的方法，上传复杂的任务在后台处理，然后任务处理完成调用回调函数
fs.readFile("./out.txt","utf-8",(err,data)=>{
	console.log(data);
});
console.log("Reading filename=out.txt ..."); // 这一行先被打印出来了,然后才有读出的文件内容
// Nodejs是单线程的，对于每个应用程序只有一个线程
// 用户访问每一个应用程序其实访问的都是同一个线程，在同一个部分
// 因此有用户使用同步访问的话可能导致其他的用户被阻塞
// 注意nodejs是基于回调来设计的，但是不代表回调就一定异步。js中很多设计也是基于回调的，但是不是自动异步。


// 回调地狱
fs.readFile("../starter/txt/start.txt","utf-8",(err,next)=>{
	fs.readFile(`../starter/txt/${next}.txt`,"utf-8",(err,data1)=>{
		console.log(data1);	
		fs.readFile(`../starter/txt/append.txt`,"utf-8",(err,data2)=>{
			console.log(data2);
			fs.writeFile('final.txt',`${data1}\n${data2}`,"utf-8",err=>{
				console.log("Your file has been written.");
			})
		})
	});
})
