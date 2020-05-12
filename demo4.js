// koa2 原生路由实现

const Koa = require("koa");
const fs = require("fs");
const path = require("path");

const app = new Koa();
const port = 5200;

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
const render = (page) => {
  return new Promise((resolve, reject) => {
    const viewUrl = path.join(__dirname, `./view/${page}`);

    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
const route = async (url) => {
  let view = "404.html";
  switch (url) {
    case "/":
      view = "index.html";
      break;
    case "/index":
      view = "index.html";
      break;
    case "/todo":
      view = "todo.html";
      break;
    case "/404":
      view = "404.html";
      break;
    default:
      break;
  }
  let html = await render(view);
  return html;
};

app.use(async (ctx) => {
  const url = ctx.request.url;
  const html = await route(url);

  ctx.body = html;
});

app.listen(port);

console.log("访问地址为: http://localhost:%s", port);
