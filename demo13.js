// koa2 加载模板引擎

const Koa = require("koa");
const views = require("koa-views");
const path = require("path");

const app = new Koa();
const port = 5200;

// 加载模板引擎
app.use(
  views(path.join(__dirname, "./view"), {
    extension: "ejs",
  })
);

app.use(async (ctx) => {
  const title = "hello koa2";
  await ctx.render("index", {
    title,
  });
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
