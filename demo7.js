// POST请求参数获取

const Koa = require("koa");
const qs = require("qs");

const app = new Koa();
const port = 5200;

// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";

      ctx.req.addListener("data", (data) => {
        postdata += data;
      });

      ctx.req.addListener("end", function () {
        let parseData = qs.parse(postdata);
        resolve(parseData);
      });
    } catch (err) {
      reject(err);
    }
  });
}

app.use(async (ctx) => {
  if (ctx.url === "/" && ctx.method === "GET") {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === "/" && ctx.method === "POST") {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData(ctx);
    ctx.body = postData;
  } else {
    // 其他请求显示404
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
  }
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
