import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"; //
import styles from "./App.module.css";
import { PerspectiveCamera, Stats } from "@react-three/drei";
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM, TILES } from "./config";

const App = () => {
  const [terrianMap, depthMap] = useLoader(THREE.TextureLoader, TILES);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    const wheelEvent = (e: WheelEvent) => {
      e.stopPropagation();

      if (!cameraRef.current) return;
      const distant = e.deltaY * 0.001;
      cameraRef.current.translateZ(distant);
      if (cameraRef.current.position.z < MIN_ZOOM) {
        cameraRef.current.position.z = MIN_ZOOM;
      }
      if (cameraRef.current.position.z > MAX_ZOOM) {
        cameraRef.current.position.z = MAX_ZOOM;
      }
      cameraRef.current.updateProjectionMatrix();
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
          position={[0, -0.25, DEFAULT_ZOOM]}
          fov={50}
        />
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <planeGeometry args={[10, 10, 256, 256]} />
          <meshStandardMaterial
            map={terrianMap}
            displacementMap={depthMap}
            displacementScale={1}
          />
        </mesh>
        <Stats />
      </Canvas>
    </div>
  );
};

export default App;
