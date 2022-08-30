import { EthProvider } from "./contexts/EthContext";
// import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import "./App.css";


function App() {
  return (
    <EthProvider>
      
      <div id="App">
          <Home />



        {/* <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div> */}
      
      </div>
    </EthProvider>
  );
}

export default App;
