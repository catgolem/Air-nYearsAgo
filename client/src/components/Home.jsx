import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import World from "./World"
import useEth from "../contexts/EthContext/useEth";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import * as THREE from "three"
import * as Drei from "@react-three/drei"
import colors from "nice-color-palettes"
import Font from "./assets/text.typeface.json"
import { useState, useRef } from "react";


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
  const { state: { contract, accounts } } = useEth();
  const arr = Array(200).fill(1)
  const Init = async () => {
    localStorage.setItem("adress:",accounts)
      console.log(contract)
      const getObj = await contract.methods.readText().call({ from: accounts[0] });
      localStorage.setItem("TimeCapsules",JSON.stringify(getObj))
      console.log(getObj)
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
                <Drei.Float floatIntensity={6} speed={3}>
                  <Drei.Text3D
                    font={Font}
                    bevelEnabled
                    bevelSize={0.1}
                    size={2}
                    position={[-8,0,0]}
                  >
                    TimeCapsule
                    <meshNormalMaterial />
                  </Drei.Text3D>
                </Drei.Float>
                <Drei.Float floatIntensity={10} speed={2}>
                  <Drei.Text3D
                    font={Font}
                    bevelEnabled
                    bevelSize={0.07}
                    size={1.4}
                    position={[-4, -3.5, 0]}
                    onClick={() => { window.location = "/world" }}
                  >
                    To World
                    <meshBasicMaterial color={"#494646"} />
                  </Drei.Text3D>
                </Drei.Float>
                <Drei.Box 
                  position={[0,-3,0.5]} 
                  args={[10,3,2]}
                  onClick={() => {window.location = "/world"}}
                >
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
              <World/>
            }>
            </Route>
          </Routes>
        </BrowserRouter> 
      </div>
    )
}

export default Home