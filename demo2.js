const Koa = require("koa");
const loggerAsync = require("./middleware/logger-async");

const app = new Koa();
const port = 5200;

app.use(loggerAsync());

app.use((ctx) => {
  ctx.body = "hello world";
});

app.listen(port);

console.log("访问地址为: http://localhost:%s", port);
