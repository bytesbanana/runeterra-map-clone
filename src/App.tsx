import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"; //
import styles from "./App.module.css";
import { PerspectiveCamera, Stats } from "@react-three/drei";
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM, TILES } from "./config";
import { useIsMounted } from "./useIsMounted";

const App = () => {
  const isMounted = useIsMounted();
  const [terrianMap, depthMap] = useLoader(THREE.TextureLoader, TILES);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (!isMounted()) return;
    const abortController = new AbortController();
    const { signal } = abortController;
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
    // Implement panning event
    let isPanning = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isPanning = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isPanning || !cameraRef.current) return;
      const deltaX = (e.clientX - lastX) * 0.001;
      const deltaY = (e.clientY - lastY) * 0.001;
      cameraRef.current.position.x -= deltaX;
      cameraRef.current.position.y += deltaY;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = () => {
      isPanning = false;
    };

    window.addEventListener("mousedown", onPointerDown, { signal });
    window.addEventListener("mousemove", onPointerMove, { signal });
    window.addEventListener("mouseup", onPointerUp, { signal });

    return () => {
      abortController.abort();
    };
  }, [isMounted]);

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
