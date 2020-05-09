// 单元测试

const Koa = require("koa");

const app = new Koa();
const port = 5200;

const server = async (ctx, next) => {
  const { url } = ctx;

  const result = {
    success: true,
    data: null,
  };

  const ctxUrlMap = {
    "/getString.json": () => {
      return {
        ...result,
        data: "this is string data",
      };
    },
    "/getNumber.json": () => {
      return {
        ...result,
        data: 123456,
      };
    },
    "/postData.json": () => {
      return {
        ...result,
        data: "ok",
      };
    },
  };

  ctx.body = ctxUrlMap[url] ? ctxUrlMap[url]() : "hello world";

  if (next) {
    next();
  }
};

app.use(server);

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});

module.exports = app;
