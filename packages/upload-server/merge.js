const fs = require("fs");
const fsP = require("fs/promises");
const path = require("path");

async function merge(name) {
  const ws = fs.createWriteStream(path.join(__dirname, `./res/${name}`));
  const files = await fsP.readdir(path.join(__dirname, `./files/${name}`));
  // 重排序
  files.sort((x, y) => {
    const regRxp = /^.+_(\d+)$/;
    const xNum = parseInt(regRxp.exec(x)[1], 10);
    const yNum = parseInt(regRxp.exec(y)[1], 10);
    return xNum - yNum;
  });
  for (const fileName of files) {
    const file = await fsP.readFile(
      path.join(__dirname, `./files/${name}/${fileName}`)
    );
    ws.write(file);
  }
  ws.end();

  ws.on("finish", () => {
    console.log(`${name} 生成了！`);
    /**
     * TODO: 删除分片文件
     */
  });
}

module.exports = merge;
