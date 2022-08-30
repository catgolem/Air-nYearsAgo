import * as Drei from "@react-three/drei"
import { useState, useRef } from "react"
import Font from "./assets/text.typeface.json"

const Title = () => {
    const [speed, setSpeed] = useState(1)
    const ref = useRef()
    const [position, setPosition] = useState(null)
    return (
        <>
        <Drei.Float floatIntensity={6} speed={3} >
        <Drei.Text3D
        
          font={Font}
          bevelEnabled
          bevelSize={0.1}
          size={2}
          position={[-8,0,0]}
          onClick={()=>{
            setPosition(ref.current.position)
            console.log(ref.current.position)
            setSpeed((s)=>{
            return(s+=5)})}}
        >
          TimeCapsule
          <meshNormalMaterial />
        </Drei.Text3D>
      </Drei.Float>
      <Drei.Float ref={ref} floatIntensity={10} speed={speed} position={position??[0,0,0]}>
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
      </>
  )
}

export default Title