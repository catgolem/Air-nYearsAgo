import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import World from "./World"
import useEth from "../contexts/EthContext/useEth";
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import * as Drei from "@react-three/drei"
import colors from "nice-color-palettes"
import Font from "./assets/text.typeface.json"

function Box() {
  const boxgeometry = new THREE.SphereGeometry(0.5)
  const material = new THREE.MeshBasicMaterial({color: colors[Math.floor(Math.random()*100)][Math.floor(Math.random()*5)]})
  boxgeometry.center()
  function createRandomPos() {
    return (Math.random() - 0.5) * 35
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
                <Drei.PerspectiveCamera makeDefault position={[0,0,15]}/>
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
                <Drei.Text3D
                  font={Font}
                  bevelEnabled
                  bevelSize={0.05}
                  size={1.4}
                  position={[-4,-3.5,0]}
                  onClick={() => {window.location = "/world"}}
                >
                  To World
                  <meshBasicMaterial color={"#494646"}/>
                </Drei.Text3D>
                {
                  arr.map((e, index) => {
                    return <Box key={index} />
                  })
                }
                <Drei.OrbitControls />
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