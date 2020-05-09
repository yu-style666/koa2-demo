// koa2 实现 session

const Koa = require("koa");
const session = require("koa-session-minimal");
// const MysqlSession = require("koa-mysql-session");

const app = new Koa();
const port = 5200;

/* // 配置存储session信息的mysql
let store = new MysqlSession({
  user: "root",
  password: "abc123",
  database: "koa_demo",
  host: "127.0.0.1",
}); */

// 存放sessionId的cookie配置
const cookie = {
  maxAge: "", // cookie有效时长
  expires: "", // cookie失效时间
  path: "", // 写cookie所在的路径
  domain: "", // 写cookie所在的域名
  httpOnly: "", // 是否只用于http请求中获取
  overwrite: "", // 是否允许重写
  secure: "",
  sameSite: "",
  signed: "",
};

// 使用session中间件
app.use(
  session({
    key: "SESSION_ID",
    // store: store,
    cookie,
  })
);

app.use(async (ctx) => {
  // 设置session
  if (ctx.url === "/set") {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0,
    };
    ctx.body = ctx.session;
  } else if (ctx.url === "/") {
    // 读取session信息
    ctx.session.count += 1;
    ctx.body = ctx.session;
  }
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
