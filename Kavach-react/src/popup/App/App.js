import "./App.css";
import Popup from "../pages/Popup";
import { useEffect } from "react";
import { runtime } from "webextension-polyfill";
function App() {
  return (
    <div className="App">
      <Popup />
    </div>
  );
}

export default App;
