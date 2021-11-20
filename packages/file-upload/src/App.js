import { useRef } from "react";
import logo from "./logo.svg";
import axios from "axios";
import { Scheduler } from "./Scheduler";
import "./App.css";

const postChunk = (formData) =>
  axios({
    method: "post",
    url: "http://localhost:4000/upload",
    headers: {
      "Content-Type": "multipart/formData",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    data: formData,
  });

function App() {
  const inputEl = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form>
          <input
            ref={inputEl}
            type="file"
            onChange={() => {
              // useRef 获取文件
              const [file] = inputEl.current.files;

              // 读取文件
              const fileReader = new FileReader();

              fileReader.onload = ({ target: { result: buffer } }) => {
                // 数据
                const list = [];
                // 定型数组视图
                const view = new Uint8Array(buffer);
                const length = Math.ceil(view.length / 1024);
                for (let i = 0; i < length; i += 1) {
                  const formData = new FormData();
                  // 文件分片
                  formData.append(
                    "fragment",
                    view.slice(i * 1024, (i + 1) * 1024)
                  );
                  //
                  formData.append("sequence", i);
                  // 获取文件名
                  formData.append("name", file.name);
                  // 分片总数
                  formData.append("length", length);

                  list.push(formData);
                }
                /**
                 * 任务管理器：同时最多发5个请求
                 */
                const sch = new Scheduler(5);
                list.forEach((formData) => sch.add(() => postChunk(formData)));
                sch.taskStart();
                // const pA = Promise.all(
                //   list.map((formData) => postChunk(formData))
                // );
                // pA.then((res) => {
                //   console.log(res);
                //   console.log("finished");
                // });
              };

              fileReader.readAsArrayBuffer(file);
            }}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
