// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TimeCapsules {

  struct Position {
    int256 x;
    int256 y;
    int256 z;
    address user;
    bool is_opened;
  }

  struct TimeCapsule {
    string text;
    bool is_deleted;
    uint canOpenTime;
    Position position;
  }
  
  Position[] public positions;
  TimeCapsule[] public timeCapsules;

  mapping(uint => address) public capsuleToOwner;
  mapping(address => bool) isCreated;

  modifier onlyMine(uint id){
    require(capsuleToOwner[id] == msg.sender,"onlyMine!!");
    _;
  }

  function getCapsule() external view returns(int){
    //0の時は空配列を返す
    if(isCreated[msg.sender] == false){
      return -1;
    }
    uint result;
    for (uint i = 0; i < timeCapsules.length; i++) {
      if (capsuleToOwner[i] == msg.sender && timeCapsules[i].is_deleted == false) {
        if(block.timestamp >= (timeCapsules[i].canOpenTime)){
          result = i;
        }else{
          return -2;
        }
      }
    }
    return int(result);
  }

  function getPositionLength() view public returns(uint){
    return positions.length;
  }

  function createCapsule(string memory _content, int256 _x, int256 _y, int256 _z, uint _canOpen) public {
    require(isCreated[msg.sender] == false,"already created");
    Position memory pos = Position(_x,_y,_z,msg.sender,false);
    positions.push(pos);
    timeCapsules.push(TimeCapsule(_content, false, _canOpen, pos));
    uint id = timeCapsules.length - 1;
    capsuleToOwner[id] = msg.sender;

    // Capsule数を増やす
    isCreated[msg.sender] = true;
  }

  function deleteCapsule(uint _id) public onlyMine(_id) {
    require(timeCapsules[_id].is_deleted == false, "this id's capsule already deleted");
    //指定のidのカプセルは開封済みとする
    positions[_id].is_opened = true;
    // 指定のidのCapsuleを削除する
    timeCapsules[_id].is_deleted = true;
    // Capsule数を減らす
    isCreated[msg.sender] = false;
  }
}