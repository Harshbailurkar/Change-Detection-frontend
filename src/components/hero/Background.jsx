import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

const Sphere = () => {
  const texture = useLoader(TextureLoader, "/earthlights1k.jpg");
  const sphereRef = useRef();

  useFrame((state, delta) => {
    // Further reduced rotation speed
    sphereRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={sphereRef}>
      {/* Set the radius to 2 for a medium-sized globe */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Stars = () => {
  const starGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, []);

  return (
    <points>
      <bufferGeometry attach="geometry" {...starGeo} />
      <pointsMaterial attach="material" size={0.5} color="white" />
    </points>
  );
};

const Background = () => {
  return (
    <div className="background">
      <Canvas style={{ background: "black" }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere />
        <Stars />
      </Canvas>
    </div>
  );
};

export default Background;
