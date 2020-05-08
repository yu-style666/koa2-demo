const Koa = require("koa");
const path = require("path");
const static = require("koa-static");

const app = new Koa();
const port = 5200;

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = "./static";

app.use(static(path.join(__dirname, staticPath)));

app.use(async (ctx) => {
  const url = `http://localhost:${port}/images/icon-fire.png`;

  ctx.body = `<a href="${url}" target="_blank">${url}</a>`;
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
