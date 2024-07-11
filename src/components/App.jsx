import "./App.css";
import { ToastContainer } from "react-toastify";

import Game from "./Game";

function App() {
  return (
    <>
      <header>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition:Bounce
        />
        <h1>Towers of Hanoi</h1>
      </header>
      <Game />
      <footer>
        <p>Created by Bailey</p>
      </footer>
    </>
  );
}

export default App;
