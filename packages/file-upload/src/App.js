import { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const postChunk = (formData) => {
  return axios({
    method: "post",
    url: "http://localhost:4000/upload",
    headers: {
      "Content-Type": "multipart/formData",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    data: formData,
  });
};

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

              console.log(file);

              // 读取文件
              const fileReader = new FileReader();

              fileReader.onload = ({ target: { result: buffer } }) => {
                // 数据
                const list = [];
                // 定型数组接口
                const view = new Uint8Array(buffer);
                let j = 0;
                for (let i = 0; i < view.length; i += 1024) {
                  const formData = new FormData();
                  formData.append(j, view.slice(i, i + 1024));

                  // 获取文件名
                  if (j === 0) formData.append("name", file.name);

                  if (i + 1024 > view.length) formData.append("amount", j + 1);

                  list.push(formData);
                  j += 1;
                }
                const pA = Promise.all(
                  list.map((formData) => postChunk(formData))
                );
                pA.then((res) => {
                  console.log(res);
                  console.log("finished");
                });
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
