// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TimeCapsules {

  struct Position {
    int256 x;
    int256 y;
    int256 z;
  }

  struct TimeCapsule {
    address user;
    string text;
    uint uploadTime;
    uint timeLimit;
    Position position;
  }

  TimeCapsule[] timeCapsules;

  // constructor() {
  //   available[msg.sender] = true;
  // }

  // modifier onlyOwner {
  //   require(msg.sender == owner);
  //   _;
  // }

  //event Notice(address indexed from, bool isCreated);

  function setText_1m(string memory _text, Position memory _pos) public {
    Position memory pos = Position(_pos.x, _pos.y, _pos.z);
    TimeCapsule memory content = TimeCapsule(msg.sender,_text,block.timestamp,1 minutes,pos);
    timeCapsules.push(content);
  }

  function setText_1h(string memory _text, Position memory _pos) public {
    Position memory pos = Position(_pos.x, _pos.y, _pos.z);
    TimeCapsule memory content = TimeCapsule(msg.sender,_text,block.timestamp,1 hours,pos);
    timeCapsules.push(content);
  }

  function setText_1d(string memory _text, Position memory _pos) public {
    Position memory pos = Position(_pos.x, _pos.y, _pos.z);
    TimeCapsule memory content = TimeCapsule(msg.sender,_text,block.timestamp,1 days,pos);
    timeCapsules.push(content);
  }

  function setText_1w(string memory _text, Position memory _pos) public {
    Position memory pos = Position(_pos.x, _pos.y, _pos.z);
    TimeCapsule memory content = TimeCapsule(msg.sender,_text,block.timestamp,1 weeks,pos);
    timeCapsules.push(content);
  }

  function setText_1Y(string memory _text, Position memory _pos) public {
    Position memory pos = Position(_pos.x, _pos.y, _pos.z);
    TimeCapsule memory content = TimeCapsule(msg.sender,_text,block.timestamp,365 days,pos);
    timeCapsules.push(content);
  }

  function readText() view public returns(TimeCapsule[] memory) {
    return timeCapsules;
  }
}
