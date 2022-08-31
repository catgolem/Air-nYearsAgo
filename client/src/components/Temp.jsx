import * as THREE from "three"
import { PerspectiveCamera, OrbitControls, Box, AccumulativeShadows, RandomizedLight ,Environment} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics ,usePlane, useBox} from "@react-three/cannon"
import { PointLight } from "three"
import { useRef } from "react"

function Cube(props) {
    const [ref,api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))

    return (
        <Box 
            castShadow 
            receiveShadow 
            ref={ref} 
            scale={4}
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
                    <Cube />
                    <Plane position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />
                    {/* <Plane position={[0,0,-20]} receiveShadow/> */}
                </Physics> 
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default Temp