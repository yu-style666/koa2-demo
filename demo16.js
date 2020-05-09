// 原生koa2实现jsonp

const Koa = require("koa");

const app = new Koa();
const port = 5200;

app.use(async (ctx) => {
  // 如果 jsonp 的请求为 GET
  console.log(ctx.url);
  if (ctx.method === "GET" && ctx.url.split("?")[0] === "/getData.json") {
    // 获取 jsonp 的 callback
    const callbackName = ctx.query.callback || "callback";
    const returnData = {
      success: true,
      data: {
        text: "this is a jsonp api",
        time: new Date().getTime(),
      },
    };

    // jsonp 的 script 字符串
    const jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

    // 用text/javascript，让请求支持跨域获取
    ctx.type = "text/javascript";

    // 输出jsonp字符串
    ctx.body = jsonpStr;
  } else {
    ctx.body = "hello jsonp";
  }
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
