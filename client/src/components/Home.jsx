import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import World from "./World"
import Web3 from "web3";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";


const Home = () => {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");


    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={
              <>
                <div>
                  タイトル
                </div>
                <nav>
                  <Link to="/world">ENETR!!</Link>
                </nav>
              </>}>
            </Route>
            <Route exact path="/world" element={
              <World/>
            }>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default Home