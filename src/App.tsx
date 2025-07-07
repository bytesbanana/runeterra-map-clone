import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"; //
import styles from "./App.module.css";
import { PerspectiveCamera, Stats } from "@react-three/drei";
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from "./config";
import { useIsMounted } from "./useIsMounted";
import { MapLayer } from "./MapLayer";

const MAP_MIN_X = -4;
const MAP_MAX_X = 4;
const MAP_MIN_Y = -4;
const MAP_MAX_Y = 4;

const App = () => {
  const isMounted = useIsMounted();

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  function clampCamera(camera: THREE.PerspectiveCamera) {
    // Calculate half view size at current Z
    const vFOV = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const width = height * camera.aspect;

    // Clamp so frustum stays inside map
    camera.position.x = Math.max(
      MAP_MIN_X + width / 2,
      Math.min(MAP_MAX_X - width / 2, camera.position.x)
    );
    camera.position.y = Math.max(
      MAP_MIN_Y + height / 2,
      Math.min(MAP_MAX_Y - height / 2, camera.position.y)
    );
  }

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
      clampCamera(cameraRef.current); // <-- Add this
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("wheel", wheelEvent);

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
      clampCamera(cameraRef.current);
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
        {/* <OrbitControls /> */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, DEFAULT_ZOOM]}
        />
        <MapLayer />
        <Stats />
      </Canvas>
    </div>
  );
};

export default App;
