import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import World from "./World"
import { useState ,useEffect} from "react";
import useEth from "../contexts/EthContext/useEth";
import { Canvas, useThree, useLoader ,useFrame} from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three"
import Font from "./assets/text.typeface.json"

const CameraController = () => {
  const {camera, gl} = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera,gl.domElement)
    controls.minDistance = 1
    controls.maxDistance = 10
    return () => {
      controls.dispose()
    }
  },[camera,gl])

  return null
}

function Text3d() {
  const font = new FontLoader().parse(Font);
  const textgeometry = new TextGeometry("Hello World!!",{
    font: font,
    size: 1,
    height: 1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  })
  textgeometry.center()
  const material = new THREE.MeshNormalMaterial();
  return (
    <mesh
      geometry={textgeometry}
      material={material} 
    />
  )
}

function Box() {
  const boxgeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshNormalMaterial()
  function createRandomPos() {
    return (Math.random() - 0.4) * 10
  }
  return (
    <mesh
      geometry={boxgeometry}
      material={material}
      position={[createRandomPos(),createRandomPos(),createRandomPos()]}
      rotateX={Math.random() * Math.PI}
      rotateY={Math.random() * Math.PI}
    />
  )
}

// function SurperBox() {
//   const boxgeometry = new THREE.BoxGeometry(3, 1, 1)
//   const material = new THREE.MeshNormalMaterial()
//   boxgeometry.center()
//   return (
//     <mesh
//       geometry={boxgeometry}
//       material={material}
//       position={[0,-2,0]}
//     />
//   )
// }

const Home = () => {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const arr = Array(50).fill(1)
  useEffect(()=>{
    localStorage.setItem("adress:",accounts)
    const getData = async () => {
      console.log(contract)
      const getObj = await contract.methods.readText().call({ from: accounts[0] });
    }
    try{
      getData()
    }catch(err){
      console.error(err)
    }
    
    
  },[contract])
  const Init =async () => {
    localStorage.setItem("adress:",accounts)
      console.log(contract)
      const getObj = await contract.methods.readText().call({ from: accounts[0] });
      localStorage.setItem("TimeCapsules",JSON.stringify(getObj))
      console.log(getObj)
  }


    return (
      <div style={{width: `100%` , height: `100%`}}>
        <Canvas 
          style={{ width: `100%` ,height : `100%`, background: `black`}}
        >
          <CameraController />
          <ambientLight />
          <Text3d />
          {
            arr.map((e,index) => {
              return <Box key={index}/>
            })
          }
        </Canvas>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={
              <>
                <div>
                  タイトル
                </div>
                <button onClick={()=>Init()}>test</button>
                <nav>
                  <Link to="/world">ENETR!!</Link>
                </nav>
              </>}>
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