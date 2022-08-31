import * as THREE from "three"
import { PerspectiveCamera, OrbitControls, Box, AccumulativeShadows, RandomizedLight ,Environment, Text3D} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics ,usePlane, useBox} from "@react-three/cannon"
import { PointLight } from "three"
import { useRef } from "react"
import Font from "./assets/text.typeface.json"

function Text(props) {
    const [textRef,api] = useBox(() => ({mass: 1, ...props}))
    const createNum = () => {
        return Math.floor(Math.random() * 15) - 7
    }
    return (
        <Text3D
            castShadow
            receiveShadow 
            font={Font}
            ref={textRef}
            scale={10}
            onClick={() => api.applyImpulse([0,createNum(),-20], [0, 0, 0])} 
        >
            <meshNormalMaterial />
            {props.text}
        </Text3D>
    )
}

function Cube(props) {
    const [ref,api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))

    return (
        <Box 
            castShadow 
            receiveShadow 
            ref={ref} 
            scale={10}
            onClick={() => api.applyImpulse([5, 5, -20], [0, 0, 0])} 
        >
            <meshNormalMaterial attach={"material"}/>
        </Box>
    )
}

function Plane(props) {
    const [ref] = usePlane(() => ({ ...props }))
    return (
        <mesh ref={ref}>
            <planeGeometry args={[100, 100]} attach={"geometry"}/>
            <meshPhongMaterial attach={"material"} color={"#FFFEF9"}/>
        </mesh>
    )
}

const Temp = () => {
    //const shadow = useRef()
    const textInfo = [
        { text: "U", position: [-60, 20, 0] },
        { text: "s", position: [-50, 20, 0] },
        { text: "e", position: [-42, 20, 0] },
        { text: "E", position: [-25, 20, 0] },
        { text: "t", position: [-16, 20, 0] },
        { text: "h", position: [-10, 20, 0] },
        { text: "P", position: [-2, 20, 0] },
        { text: "r", position: [6, 20, 0] },
        { text: "o", position: [10, 20, 0] },
        { text: "v", position: [18, 20, 0] },
        { text: "i", position: [26, 20, 0] },
        { text: "d", position: [30, 20, 0] },
        { text: "e", position: [38, 20, 0] },
        { text: "r", position: [46, 20, 0] },
    ]
    return (
        <div style={{ width: `100%`, height: `100%` }}>
            <Canvas 
                style={{ width: `100%`, height: `100%` }} 
                shadows
                camera={{ position: [0, 10, 60], fov: 80 }}
            > 
                <Physics>
                    {/* <fog attach="fog" args={['#gray', 0, 0]} /> */}
                    <ambientLight intensity={0.3}/>
                    {/* <Cube /> */}
                    {
                        textInfo.map((e,index) => {
                            
                            return (
                                <Text text={e.text} position={e.position} key={index} />
                            )
                        })
                    }
                    <Plane position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />
                    {/* <Plane position={[0,0,-20]} receiveShadow/> */}
                </Physics> 
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default Temp