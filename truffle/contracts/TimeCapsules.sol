// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TimeCapsules {
  address private owner;
  
  struct Content {
    string text;
    uint uploadTime;
    bool state;
  }

  mapping(address => Content) timeCapsule;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function setText(string memory _text) public onlyOwner returns(bool){
    Content memory content = Content(_text,block.timestamp,true);
    timeCapsule[msg.sender] = content;
    return true;
  }

  function readText() view public onlyOwner returns(string memory) {
    if(block.timestamp >= (timeCapsule[msg.sender].uploadTime + 1 minutes)){
      return timeCapsule[msg.sender].text;
    }else{
      return "";
    }
  }
}
