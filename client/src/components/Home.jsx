import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import World from "./World"
import Title from "./Title";
import Scene from "./Scene";
import useEth from "../contexts/EthContext/useEth";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import * as THREE from "three"
import * as Drei from "@react-three/drei"
import colors from "nice-color-palettes"
import { useState, useRef } from "react";
import Temp from "./Temp";
import Web3 from "web3";

function Box() {
  const boxgeometry = new THREE.SphereGeometry(0.5)
  const material = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * 100)][Math.floor(Math.random()*5)]})
  boxgeometry.center()
  function createRandomPos() {
    return (Math.random() - 0.5) * 40
  }
  return (
    <Drei.Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh
        geometry={boxgeometry}
        material={material}
        position={[createRandomPos(), createRandomPos(), createRandomPos()]}
      />
    </Drei.Float>
  )
}

const HandPoint = () => {
  const ref = useRef()
  let delta = 0.05;
  useFrame(() => {
    if(ref.current.position.x > -8.8 && ref.current.position.y > -4.3){
      delta = -0.05
    }else if(ref.current.position.x < -9.7 && ref.current.position.y < -5.4) {
      delta = 0.05
    }
    ref.current.position.x += delta
    ref.current.position.y += delta
  })
  const [visibilitiy, setVisibility] = useState(false)
  const stl = useLoader(STLLoader, "handPoint.stl")
  console.log(stl)
  setTimeout(() => {
    setVisibility(true)
  },15000)
  return (
    <mesh
      ref={ref}
      scale={0.2}
      position={[-9.5, -5, 0]}
      rotation={[0, 0, Math.PI / 6]}
      visible={visibilitiy}
    >
      <primitive
        object={stl}
        attach="geometry"
      />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  )
}

const Home = () => {
  const { state: { contract, accounts} } = useEth();
  const arr = Array(200).fill(1)

  const keepData = async () => {
    console.log(contract)
    const web3 = new Web3(Web3.givenProvider)
    if(web3.givenProvider === null){
      window.location = "/sorry"
      return
    }
    const limit = await contract.methods.getPositionLength().call({ from: accounts[0] });
    console.log(limit)
    const timeCapsules=[];
    const opendCapsules = [];
    const closedCapsules = []
    for(var i = 0; i < limit; i++){
        timeCapsules.push(await contract.methods.positions(i).call({ from: accounts[0] }))
        if(!timeCapsules[i].is_opened){
            opendCapsules.push(timeCapsules[i])
            if(timeCapsules[i].user === String(accounts[0])){
                localStorage.setItem("MyTimeCapsule!!",JSON.stringify(timeCapsules[i]))
                console.log("OK")
            }
        }else{
            closedCapsules.push(timeCapsules)
        }
    }
    localStorage.setItem("opendCapsules",JSON.stringify(opendCapsules))
    localStorage.setItem("timeCapsules",JSON.stringify(timeCapsules))
    window.location = "/world"
}


    return (
      <div style={{width: `100%` , height: `100%`}}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={
              <Canvas
                style={{ width: `100%`, height: `100%`, background: `#F2F3F5` }}
              >
                <Drei.PerspectiveCamera makeDefault position={[0,0,16]}/>
                <ambientLight />
                <Title/>
                <Drei.Box 
                  position={[0,-3,0.5]} 
                  args={[10,3,2]}
                  onClick={() => {
                    keepData()
                  }}>
                  <meshBasicMaterial visible={false}/>
                </Drei.Box>
                {
                  arr.map((e, index) => {
                    return <Box key={index} />
                  })
                }
                <HandPoint />
                <Drei.OrbitControls
                  maxDistance={25} 
                  minDistance={10}
                />
              </Canvas>
            }>
            </Route>
            <Route exact path="/world" element={              
                <Scene/>
            }>
            </Route>
            <Route  path="/sorry" element={
              <Temp />
            }>
            </Route>
          </Routes>
        </BrowserRouter> 
      </div>
    )
}

export default Home