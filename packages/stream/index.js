const stream = require("stream");

// // 可读流
// const Readable = stream.Readable;
// const readableStream = stream.Readable();

// readableStream._read = function () {
//   this.push("阿门阿前一棵葡萄树，");
//   this.push("阿东阿东绿的刚发芽，");
//   this.push("阿东背着那重重的的壳呀，");
//   this.push("一步一步地往上爬。");
//   this.push(null);
// };

// readableStream.on("data", (data) => {
//   console.log(data.toString());
// });

// readableStream.on("end", () => {
//   console.log("done");
// });

// class ReadableDong2 extends Readable {
//   constructor() {
//     super();
//   }

//   _read() {
//     this.push("阿门阿前一棵葡萄树，2");
//     this.push("阿东阿东绿的刚发芽，2");
//     this.push("阿东背着那重重的的壳呀，2");
//     this.push("一步一步地往上爬。2");
//     this.push(null);
//   }
// }

// const readableStream2 = new ReadableDong2();

// readableStream2.on("data", (data) => {
//   console.log(data.toString());
// });

// readableStream2.on("end", () => {
//   console.log("done2");
// });

// class ReadableDong3 extends Readable {
//   constructor(iterator) {
//     super();
//     this.iterator = iterator;
//   }

//   _read() {
//     const next = this.iterator.next();
//     if (next.done) {
//       return this.push(null);
//     }
//     this.push(next.value);
//   }
// }

// function* songGenerator() {
//   yield "阿门阿前一棵葡萄树，3";
//   yield "阿东阿东绿的刚发芽，3";
//   yield "阿东背着那重重的的壳呀，3";
//   yield "一步一步地往上爬。3";
// }

// const songIterator = songGenerator();

// const readableStream3 = new ReadableDong3(songIterator);

// readableStream3.on("data", (data) => {
//   console.log(data.toString());
// });

// readableStream3.on("end", () => {
//   console.log("done3");
// });

// // 可写流
// const Writable = stream.Writable;

// class WriteDong extends Writable {
//   _write(data, enc, next) {
//     console.log(data.toString());
//     // 每秒写一次
//     setTimeout(next, 1000);
//   }
// }
// const writableStream = new WriteDong();
// writableStream.on("finish", () => console.log("don5"));
// writableStream.write("阿门阿前一棵葡萄树，5");
// writableStream.write("阿东阿东绿的刚发芽，5");
// writableStream.write("阿东背着那重重的的壳呀，5");
// writableStream.write("一步一步地往上爬。5");
// writableStream.end();

// // 双工流
// const Duplex = stream.Duplex;
// class DuplexDong extends Duplex {}

// // 转换流
// const Transform = stream.Transform;
// class TransformDong extends Transform {
//   _transform(buf, enc, next) {
//     const res = buf.toString().split("").reverse().join("");
//     this.push(res);
//     next();
//   }
// }

// const transform = new TransformDong();
// transform.on("data", (data) => console.log(data.toString()));
// transform.on("on", (data) => console.log("read done~"));
// transform.write("阿门阿前一棵葡萄树6");
// transform.write("阿东阿东绿的刚发芽6");
// transform.write("阿东背着那重重的的壳呀6");
// transform.write("一步一步地往上爬6");
// transform.end();

// transform.on("finish", (data) => console.log("write done~"));

// const Writable = stream.Writable();
// const Duplex = stream.Duplex();
// const Transform = stream.Transform();
