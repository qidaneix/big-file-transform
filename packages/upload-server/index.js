const koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const formidable = require("koa2-formidable");

const app = new koa();
const router = koaRouter();

const list = [];
router.post("/upload", async (ctx, next) => {
  const body = ctx.request.body;
  list.push(body);
  await next();
  ctx.response.body = { code: 0 };
});

app.use(cors()).use(formidable()).use(bodyParser()).use(router.routes());
app.listen(4000);
console.log("app started at port 4000...");
