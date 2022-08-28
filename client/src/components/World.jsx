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
        const value = await contract.methods.readText().call({ from: accounts[0] });
        if (value === "") {
          alert("まだ開けることは出来ません．");
          return;
        }else{
            setMessage(value);
          
          console.log(message)

        }
      };
      const setText = async e => {
        if (e.target.tagName === "INPUT") {
          return;
        }
        if (inputValue === "") {
          alert("Please enter a value to write.");
          return;
        }
        const contractObject = await contract.methods.setText_1m(inputValue,{x:0,y:0,z:0}).send({ from: accounts[0] });
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
          value={inputValue}
          onChange={handleInputChange}
        />)
      </button>
        </div>
    )
}

export default World