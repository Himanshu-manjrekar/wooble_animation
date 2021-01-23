import React, { useRef, useState } from 'react';
import './Main.scss';
import { Canvas, useFrame } from "react-three-fiber";

import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei';

import { useSpring, a } from "react-spring/three";

softShadows();



const Spiningmesh = ({ position, color, args, speed }) => {
    const mesh = useRef(null);

    const [expand, setExpand] = useState(false);

    const props = useSpring({
        scale: expand ? [2.4, 2.4, 2.4] : [1, 1, 1]
    })

    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
        <a.mesh
            onClick={() => setExpand(!expand)}
            scale={props.scale}
            castShadow position={position} ref={mesh}>
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={1} />
        </a.mesh>
    );

}



function Main() {
    return (
        <>
            <Canvas
                shadowMap
                colorManagement
                camera={{ position: [-5, 2, 10], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <directionalLight
                    castShadow
                    position={[0, 10, 0]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}

                />
                <pointLight position={[-10, 0, -10]} intensity={0.5} />
                <pointLight position={[0, -10, 0]} intensity={1.5} />

                <group>
                    <mesh
                        receiveShadow
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, -3, 0]}>
                        <planeBufferGeometry attach='geometry' args={[100, 100]} />
                        <shadowMaterial attach='material' opacity={0.3} />
                    </mesh>
                    <Spiningmesh position={[0, 1, 0]} color='red' args={[2, 2, 2]} speed={2} />
                    <Spiningmesh position={[-2, 1, -5]} color='hotpink' args={[1, 1, 1]} speed={6} />
                    <Spiningmesh position={[5, 1, -2]} color='hotpink' args={[1, 1, 1]} speed={6} />
                </group>

                <OrbitControls />
            </Canvas>
        </>
    )
}

export default Main
