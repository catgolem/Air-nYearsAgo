import Web3 from "web3";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";

const World = () => {
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("")
    const handleInputChange = e => {
        setInputValue(e.target.value);
      };
    const readText = async () => {
        const index = await contract.methods.getCapsule().call({ from: accounts[0] });
        console.log(index)
    
        const value = await contract.methods.timeCapsules(index).call({ from: accounts[0] });

        const t = await contract.methods.deleteCapsule(index).call({ from: accounts[0] });

          console.log(value)
          console.log(t)

        
      };
      const setText = async e => {
        if (e.target.tagName === "INPUT") {
          return;
        }
        if (inputValue === "") {
          alert("Please enter a value to write.");
          return;
        }
        const contractObject = await contract.methods.createCapsule("test",0,-1,3,0).send({ from: accounts[0],gas:100000000 });
        console.log(contractObject)
        

      };
    return (
        <div>
            <div>
                World
                {message}
            </div>
            <button onClick={()=>{readText()}}>
                readtext
            </button>
            <button 
        onClick={setText} 
        className="input-btn"
      >
        setText(<input
          type="text"
          placeholder="string"
          onChange={handleInputChange}
        />)
      </button>
        </div>
    )
}

export default World