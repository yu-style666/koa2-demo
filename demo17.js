// koa-jsonp 中间件

const Koa = require("koa");
const jsonp = require("koa-jsonp");

const app = new Koa();
const port = 5200;

// 使用中间件
app.use(jsonp());

app.use(async (ctx) => {
  const returnData = {
    success: true,
    data: {
      text: "this is a jsonp api",
      time: new Date().getTime(),
    },
  };

  // 直接输出JSON
  ctx.body = returnData;
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
