import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"; //
import styles from "./App.module.css";
import { PerspectiveCamera } from "@react-three/drei";

const App = () => {
  const [terrianMap, depthMap] = useLoader(THREE.TextureLoader, [
    "terrain_z1.jpg",
    "depth_z1.jpg",
  ]);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    const wheelEvent = (e: WheelEvent) => {
      e.stopPropagation();

      if (cameraRef.current) {
        const distant = e.deltaY * 0.001;
        if (cameraRef.current.position.z > 1.5) {
          cameraRef.current.translateZ(distant);
          cameraRef.current.updateProjectionMatrix();
        }
      }
    };
    window.addEventListener("wheel", wheelEvent);
    return () => {
      window.removeEventListener("wheel", wheelEvent);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Canvas>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, -0.5, 5]}
          fov={50}
        />
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <planeGeometry args={[10, 10, 256, 256]} /> <axesHelper />
          <meshStandardMaterial
            map={terrianMap}
            displacementMap={depthMap}
            displacementScale={1} // Adjust for desired depth effect
          />
        </mesh>
      </Canvas>
    </div>
  );
};

export default App;
