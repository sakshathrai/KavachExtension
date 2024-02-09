import "./App.css";
import { Counter } from "../counter/Counter";
import { useEffect } from "react";
import { runtime } from "webextension-polyfill";
function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
