import React, { useRef, useState ,useImperativeHandle, forwardRef} from "react";
import { useFrame} from "@react-three/fiber";
import {useBox} from "@react-three/cannon";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";


const Controls = (props,ref) => {
  const controlsRef = useRef();
  const isLocked = useRef(false);
  const [canMove, setcanMove] = useState(false);
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  useFrame(() => {
    const velocity = 0.1;
    controlsRef.current.addEventListener("lock", () => {
      console.log("lock");
      setcanMove(true);
    });
    controlsRef.current.addEventListener("unlock", () => {
      console.log("unlock");
      setcanMove(false);
    });
    if(canMove){
      if (moveForward || moveBackward) {
        controlsRef.current.moveForward((Number(moveForward) - Number(moveBackward)) * velocity);
      } else if (moveLeft || moveRight) {
        controlsRef.current.moveRight((Number(moveRight) - Number(moveLeft)) * velocity);
      } 
    }
  });

  const onKeyDown = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        setMoveForward(true);
        break;

      case "ArrowLeft":
      case "KeyA":
        setMoveLeft(true);
        break;

      case "ArrowDown":
      case "KeyS":
        setMoveBackward(true);
        break;

      case "ArrowRight":
      case "KeyD":
        setMoveRight(true);
        break;

      // case "Space":
      //   if (canJump === true) velocity.y += 350;
      //   canJump = false;
      //   break;
      default:
        return;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        setMoveForward(false);
        break;

      case "ArrowLeft":
      case "KeyA":
        setMoveLeft(false);
        break;

      case "ArrowDown":
      case "KeyS":
        setMoveBackward(false);
        break;

      case "ArrowRight":
      case "KeyD":
        setMoveRight(false);
        break;

      default:
        return;
    }
  };

  function Cube(props) {
    const [ref] = useBox(() => ({
      mass: 1,
      position: [0, 5, 0],
      rotation: [0.4, 0.2, 0.5],
      ...props
    }));
    const color = props.color ? props.color : "hotpink";
    return (
      <mesh receiveShadow castShadow ref={ref}>
        <boxBufferGeometry args={[2,2,2]} />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
    );
  }

//  const clickPosition = function (){
//     if(isLocked){
//         //カメラのポジションを取得
//         console.log(controlsRef.current.camera.position);

//         //前方を取得
//         var forward = new THREE.Vector4(0, 0, 1, 0);
//         forward.applyMatrix4(controlsRef.current.camera.matrix).normalize();
//         forward.multiplyScalar(3);
//         console.log(forward);
//         console.log((controlsRef.current.camera.position.x + forward.x * -1),-20, controlsRef.current.camera.position.z + forward.z * -1)
//         console.log(document.getElementById("physics"))
//         return <Cube />
//         //physics.appendChild(<Cube color="red"/>)
//     }
//   }

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
//   document.addEventListener("mousedown", clickPosition, false);

//   useImperativeHandle(
//     ref,
//     clickPosition()
//   )

  return (
        <PointerLockControls
      onUpdate={() => {
        if (controlsRef.current) {
          controlsRef.current.addEventListener("lock", () => {
            console.log("lock");
            isLocked.current = true;
          });
          controlsRef.current.addEventListener("unlock", () => {
            console.log("unlock");
            isLocked.current = false;
          });
        }
      }}
      ref={controlsRef}
    />
  );
};

export default forwardRef(Controls);