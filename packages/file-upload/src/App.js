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
              const [file] = inputEl.current.files;
              const fileReader = new FileReader();
              fileReader.onload = ({ target: { result: buffer } }) => {
                const view = new Uint8Array(buffer);
                const list = [];
                let j = 0;
                for (let i = 0; i < view.length; i += 1024) {
                  const formData = new FormData();
                  formData.append(j, view.slice(i, i + 1024));
                  j += 1;
                  list.push(formData);
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
