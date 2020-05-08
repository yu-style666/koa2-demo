// koa2 原生路由实现

const Koa = require("koa");

const app = new Koa();
const port = 5200;

app.use((ctx) => {
  const url = ctx.request.url;
  ctx.body = url;
});

app.listen(port);

console.log("访问地址为: http://localhost:%s", port);
