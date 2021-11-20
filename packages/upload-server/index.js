const koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const formidable = require("koa2-formidable");
const fsP = require("fs/promises");
const path = require("path");
const myEmitter = require("./eventEmitter");
const merge = require("./merge");

myEmitter.on("finish", async ({ name }) => {
  // 一路芬芳，满山崖
  merge(name);
});

const app = new koa();
const router = koaRouter();

async function saveFragment(fragment, name, sequence) {
  const buf = Buffer.from(
    fragment.split(",").map((item) => Number.parseInt(item, 10))
  );
  await fsP.writeFile(
    path.join(__dirname, `./files/${name}/${name}_${sequence}`),
    buf
  );
}

router.post("/upload", async (ctx, next) => {
  // 获取 formData
  const { name, length, fragment, sequence } = ctx.request.body;
  try {
    await fsP.mkdir(path.join(__dirname, `./files/${name}`));
  } catch (e) {
    await saveFragment(fragment, name, sequence);
  }
  await saveFragment(fragment, name, sequence);

  /**
   * TODO: 这么写会有并发问题，探究一下
   */
  // // 读取文件存放目录并判断是否存在文件
  // const dirs = await fsP.readdir(path.join(__dirname, "./files"), {
  //   withFileTypes: true,
  // });
  // // 若存在，则新增文件分片（二进制）
  // if (dirs.some((item) => item.isDirectory && item.name === name)) {
  //   const buf = Buffer.form(
  //     fragment.split(",").map((item) => Number.parseInt(item, 10))
  //   );
  //   fsP.writeFile(
  //     path.join(__dirname, `./files/${name}/${name}_${sequence}`),
  //     buf
  //   );
  // } else {
  //   await fsP.mkdir(path.join(__dirname, `./files/${name}`));
  //   const buf = Buffer.form(
  //     fragment.split(",").map((item) => Number.parseInt(item, 10))
  //   );
  //   fsP.writeFile(
  //     path.join(__dirname, `./files/${name}/${name}_${sequence}`),
  //     buf
  //   );
  // }

  const files = await fsP.readdir(path.join(__dirname, `./files/${name}`));
  // 判断是否发送完成
  if (files.length === Number.parseInt(length, 10)) {
    myEmitter.emit("finish", { name });
  }
  await next();
  ctx.response.body = { code: 0 };
});

app.use(cors()).use(formidable()).use(bodyParser()).use(router.routes());
app.listen(4000);
console.log("app started at port 4000...");
