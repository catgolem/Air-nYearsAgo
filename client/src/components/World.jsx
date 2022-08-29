import Web3 from "web3";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";

const World = () => {
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = e => {
        setInputValue(e.target.value);
      };

    const readText = async () => {
        const index = await contract.methods.getCapsule().call({ from: accounts[0] });
        if(index == -1){
            console.log('まだタイムカプセルを作成していません')
            return
        }else if(index == -2){
            console.log('まだタイムカプセルを開けません')
            return
        }
        const value = await contract.methods.timeCapsules(index).call({ from: accounts[0] });
        const t = await contract.methods.deleteCapsule(index).send({ from: accounts[0] });
        console.log(value)
      };

    
    const setText = async e => {
    if (e.target.tagName === "INPUT") {
        return;
    }
    if (inputValue === "") {
        alert("Please enter a value to write.");
        return;
    }
    const contractObject = await contract.methods.createCapsule(inputValue,0,1,3,selectDay(0)).send({ from: accounts[0] });
    console.log(contractObject)
    };

    // データ保存用の関数
    const keepData = async () => {
        const limit = await contract.methods.getPositionLength().call({ from: accounts[0] });
        console.log(limit)
        const timeCapsules=[];
        const opendCapsules = [];
        const closedCapsules = []
        for(var i = 0; i < limit; i++){
            timeCapsules.push(await contract.methods.positions(i).call({ from: accounts[0] }))
            if(!timeCapsules[i].is_opened){
                opendCapsules.push(timeCapsules[i])
                if(timeCapsules[i].user == accounts){
                    localStorage.setItem("MyTimeCapsule!!",JSON.stringify(timeCapsules[i]))
                    console.log("OK")
                }
            }else{
                closedCapsules.push(timeCapsules)
            }
        }
        localStorage.setItem("opendCapsules",JSON.stringify(opendCapsules))
        localStorage.setItem("timeCapsules",JSON.stringify(timeCapsules))
    }

    // 日付選択用の関数
    const selectDay = (x) => {
        var canOpenTime = new Date()
        canOpenTime.setDate( canOpenTime.getDate() + x )
        console.log(canOpenTime.getTime())
        return Math.floor(canOpenTime.getTime()/1000)
    }

    return (
        <div>
            <div>
                World
            </div>
            <button onClick={()=>{readText()}}>
                readtext
            </button>
            <button onClick={()=>{keepData()}}>
                test
            </button>
            <button 
                onClick={setText} 
                className="input-btn"
            >
                setText(<input
                    type="text"
                    placeholder="string"
                    onChange={handleInputChange}
                    value={inputValue}
                />)
            </button>
        </div>
    )
}

export default World