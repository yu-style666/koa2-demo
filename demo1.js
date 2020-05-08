// 快速开始

const Koa = require("koa");

const app = new Koa();
const port = 5200;

app.use(async (ctx) => {
  ctx.body = "hello koa2";
});

app.listen(port);

console.log("访问地址为: http://localhost:%s", port);
