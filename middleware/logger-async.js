// async 中间件
// async 中间件只能在 koa v2 中使用

const log = (ctx) => {
  console.log(ctx.method, ctx.header.host + ctx.url);
};

module.exports = () => async (ctx, next) => {
  log(ctx);
  await next();
};
