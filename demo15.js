// 异步上传图片实现
const Koa = require("koa");
const Views = require("koa-views");
const path = require("path");
const Static = require("koa-static");
const { uploadFile } = require("./util/upload-v2");

const app = new Koa();
const port = 5200;

// 使用第三方中间件 start
app.use(Views(path.join(__dirname, "./view"), { extension: "ejs" }));
app.use(Static(path.join(__dirname, "./static")));
// 使用第三方中间件 end

app.use(async (ctx) => {
  if (ctx.method === "GET") {
    const title = "异步传图";
    await ctx.render("upload", { title });
  } else if (ctx.url === "/api/picture/upload.json" && ctx.method === "POST") {
    // 上传文件请求处理
    let result = { success: false };
    const serverFilePath = path.join(__dirname, "static/image");

    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: "album",
      path: serverFilePath,
    });

    ctx.body = result;
  } else {
    // 其他请求显示404
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
  }
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
