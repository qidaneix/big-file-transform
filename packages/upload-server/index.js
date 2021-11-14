const koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const formidable = require("koa2-formidable");
const myEmitter = require("./eventEmitter");
const fs = require("fs");
const path = require("path");

myEmitter.on("finish", ({ name, list }) => {
  const ws = fs.createWriteStream(path.join(__dirname, "./", name));
  const buf = new Buffer.from();
});

const app = new koa();
const router = koaRouter();

const list = [];
let len = 0;
let name = "";
router.post("/upload", async (ctx, next) => {
  const body = ctx.request.body;
  list.push(body);
  if (body.amount) {
    len = body.amount;
  }
  if (body.name) {
    name = body.name;
  }
  if (len && list.length === len) {
    myEmitter.emit("finish", {
      name,
      list,
    });
  }
  await next();
  ctx.response.body = { code: 0 };
});

app.use(cors()).use(formidable()).use(bodyParser()).use(router.routes());
app.listen(4000);
console.log("app started at port 4000...");
