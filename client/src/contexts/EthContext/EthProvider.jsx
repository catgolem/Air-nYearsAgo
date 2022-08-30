import React, { useReducer, useCallback, useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isUse, setIsCanUse] = useState(()=>{
    const web3 = new Web3(Web3.givenProvider)
    if(web3.givenProvider === null){
      return false
    }else{
      return true
    }

  })


  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider);
        setIsCanUse(true)
        // if(web3 !== null){
        //   setIsCanUse(true)
        // }
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          console.error(contract)
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/TimeCapsules.json");
        if(isUse){
          init(artifact);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if(isUse){
      tryInit();
    }
  }, [init]);

  useEffect(() => {
    if(isUse){
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }
  }, [init, state.artifact]);



  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
