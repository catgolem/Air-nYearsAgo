import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import World from "./World"
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { useEffect } from "react";


const Home = () => {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  // useEffect(()=>{
  //   localStorage.setItem("adress:",accounts)
  //   const getData = async () => {
  //     console.log(contract)
  //     const getObj = await contract.methods.readText().call({ from: accounts[0] });
  //   }
  //   try{
  //     getData()
  //   }catch(err){
  //     console.error(err)
  //   }
    
    
  // },[contract])
  const Init =async () => {
    localStorage.setItem("adress:",accounts)
      console.log(contract)
      const getObj = await contract.methods.readText().call({ from: accounts[0] });
      localStorage.setItem("TimeCapsules",JSON.stringify(getObj))
      console.log(getObj)
  }


    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={
              <>
                <div>
                  タイトル
                </div>
                <button onClick={()=>Init()}>test</button>
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