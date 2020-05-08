// GET请求数据获取

const Koa = require("koa");

const app = new Koa();
const port = 5200;

app.use(async (ctx) => {
  const url = ctx.url;
  // 从上下文的request对象中获取
  const request = ctx.request;
  const req_query = request.query;
  const req_querystring = request.querystring;

  // 从上下文中直接获取
  const ctx_query = ctx.query;
  const ctx_querystring = ctx.querystring;

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  };
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
