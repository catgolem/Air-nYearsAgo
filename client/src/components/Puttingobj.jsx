import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
  Suspense, 
} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { PointerLockControls,useGLTF } from "@react-three/drei";
import * as THREE from "three";
import niceColors from "nice-color-palettes";
import { CircleBufferGeometry } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Puttingobj = (props) => {
  const tempColor = new THREE.Color();
  const data = Array.from({ length: 1000 }, () => ({
    color:
      niceColors[Math.floor(Math.random() * 100)][
        Math.floor(Math.random() * 5)
      ],
    scale: 1,
  }));
  const controlsRef = useRef();
  const capcelref = useRef(null);
  const circleref = useRef(null);
  const isLocked = useRef(false);
  const [canMove, setcanMove] = useState(false);
  const [isSetObj, setObj] = useState(false);
  const [boxposition, setpos] = useState(new THREE.Vector3(0, -500, 0));
  const [circleposition, setposcircle] = useState(
    new THREE.Vector3(0, -500, 0)
  );

  useFrame(() => {
    controlsRef.current.addEventListener("lock", () => {
      setcanMove(true);
    });
    controlsRef.current.addEventListener("unlock", () => {
      setcanMove(false);
    });

    if (canMove) {
      var forward = new THREE.Vector4(0, 0, 1, 0);
      forward.applyMatrix4(controlsRef.current.camera.matrix).normalize();
      forward.multiplyScalar(6);
      setposcircle(
        new THREE.Vector3(
          controlsRef.current.camera.position.x + forward.x * -1,
          -19,
          controlsRef.current.camera.position.z + forward.z * -1
        )
      );
      if(!isSetObj){
        circleref.current.position.x = circleposition.x;
        circleref.current.position.y = circleposition.y;
        circleref.current.position.z = circleposition.z;
      } else {
        circleref.current.position.x = circleposition.x;
        circleref.current.position.y = -500;
        circleref.current.position.z = circleposition.z;
      }
    }

    if (isSetObj) {
      capcelref.current.position.y += 0.01;
    } else {
      if (canMove && !isSetObj) {
        if (capcelref.current.position.y !== -17.5) {
          capcelref.current.position.x = boxposition.x;
          capcelref.current.position.y = boxposition.y;
          capcelref.current.position.z = boxposition.z;
        } else {
          setObj(true);
        }
      }
    }
    // const velocity = 0.1;
    // if (moveForward || moveBackward) {
    //   controlsRef.current.moveForward((Number(moveForward) - Number(moveBackward)) * velocity);
    // } else if (moveLeft || moveRight) {
    //   controlsRef.current.moveRight((Number(moveRight) - Number(moveLeft)) * velocity);
    // }
  });

  function Cube(props) {
    const [ref] = useBox(() => ({
      mass: 1,
      position: [0, 5, 0],
      rotation: [0.4, 0.2, 0.5],
      ...props,
    }));
    const color = props.color ? props.color : "hotpink";
    return (
      <mesh receiveShadow castShadow ref={ref}>
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshLambertMaterial attach="material" color={color} />
      </mesh>
    );
  }
  const clickPosition = function () {
    if (canMove) {
      //前方を取得
      var forward = new THREE.Vector4(0, 0, 1, 0);
      forward.applyMatrix4(controlsRef.current.camera.matrix).normalize();
      forward.multiplyScalar(6);
      if (!isSetObj) {
        setpos(
          new THREE.Vector3(
            controlsRef.current.camera.position.x + forward.x * -1,
            -17.5,
            controlsRef.current.camera.position.z + forward.z * -1
          )
        );
      }
    }
  };

  document.addEventListener("mousedown", clickPosition, false);

  const LoadModel = () => {
    const gltf = useLoader(
      GLTFLoader,
      "/uploads_files_3450222_Stojak+z+balonami.glb"
    );
    return <primitive object={gltf.scene} dispose={null} />;
  };

  const UseModel = () => {
    return (
      <Suspense fallback={null}>
        <LoadModel />
      </Suspense>
    );
  };

  return (
    <>
      {/* <mesh receiveShadow castShadow ref={capcelref} position={[0, -500, 0]}>
        <sphereGeometry args={[1, 32, 32]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colorArray, 3]}
          />
        </sphereGeometry>
        <meshStandardMaterial roughness={0} toneMapped={false} vertexColors />
        <pointLight color={"skyblue"} intensity={1} />
      </mesh> */}
      <mesh ref={capcelref} position={[0, -500, 0]} scale={[3,3,3]}>
        <UseModel/>
        <pointLight color={"skyblue"} intensity={1} />
      </mesh>
      <mesh
        ref={circleref}
        position={[0, -19, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={"#995555"} />
      </mesh>
      <PointerLockControls
        onUpdate={() => {
          if (controlsRef.current) {
            controlsRef.current.addEventListener("lock", () => {
              isLocked.current = true;
            });
            controlsRef.current.addEventListener("unlock", () => {
              isLocked.current = false;
            });
          }
        }}
        ref={controlsRef}
      />
    </>
  );
};

export default forwardRef(Puttingobj);
