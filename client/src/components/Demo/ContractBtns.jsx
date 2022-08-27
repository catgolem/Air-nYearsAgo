import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [alreadyCreated,setAlreadyCreated] = useState(() =>{
    if(localStorage.getItem("alreadyCreated")){
      return !(localStorage.getItem("alreadyCreated") === "false")
    }else{
      return false
    }
  })
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const readText = async () => {
    const value = await contract.methods.readText().call({ from: accounts[0] });
    if (value === "") {
      alert("まだ開けることは出来ません．");
      return;
    }else{
      setValue(value);
      localStorage.setItem("alreadyCreated",false)
      setAlreadyCreated(false)
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
    // const newValue = parseInt(inputValue);
    const contractObject = await contract.methods.setText(inputValue).send({ from: accounts[0] });
    console.log(contractObject)
    if(contractObject.status){
      localStorage.setItem("alreadyCreated",true)
      setAlreadyCreated(true)
    }
  };

  return (
    <div className="btns">

      <button onClick={readText} disabled={!alreadyCreated}> 
        readText()
      </button>

      <button 
        onClick={setText} 
        className="input-btn"
        disabled={alreadyCreated}
      >
        setText(<input
          type="text"
          placeholder="string"
          value={inputValue}
          onChange={handleInputChange}
          disabled={alreadyCreated}
        />)
      </button>

    </div>
  );
}

export default ContractBtns;
