import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three"; //
import styles from "./App.module.css";
import { PerspectiveCamera, Stats } from "@react-three/drei";
import {
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  PINS,
  REGION_IMAGES,
} from "./config";
import { useIsMounted } from "./useIsMounted";
import { MapLayer } from "./layers/Map";
import { Cloud } from "./layers/Cloud";
import { gsap } from "gsap";
import { useLoader } from "@react-three/fiber";

import { pxToWorld } from "./helpers";

const MAP_MIN_X = -4;
const MAP_MAX_X = 4;
const MAP_MIN_Y = -4;
const MAP_MAX_Y = 4;

const App = () => {
  const isMounted = useIsMounted();

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const regionImages = useLoader(THREE.TextureLoader, REGION_IMAGES);

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
    function handleWheelEvent(e: WheelEvent) {
      if (!cameraRef.current) return;
      const distant = e.deltaY * 0.05;
      let newZ = cameraRef.current.position.z + distant;
      newZ = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZ));

      gsap.to(cameraRef.current.position, {
        z: newZ,
        duration: 0.3,
        ease: "power4",
        onUpdate: () => {
          clampCamera(cameraRef.current!);
          cameraRef.current!.updateProjectionMatrix();
        },
      });
    }
    window.addEventListener("wheel", handleWheelEvent);

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
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, DEFAULT_ZOOM]}
        />
        <Cloud />

        {PINS.map((pin) => {
          const [x, y, z] = pxToWorld(pin.position);
          return (
            <group key={pin.name}>
              <mesh position={[x, y, z + 0.2]} renderOrder={0}>
                {pin.type === "circle" && (
                  <>
                    <circleGeometry args={[pin.size, 32]} />
                  </>
                )}
                {pin.type === "rectangle" && (
                  <boxGeometry args={[pin.size, pin.size * 2, 0]} />
                )}
                <meshBasicMaterial
                  transparent
                  opacity={1}
                  map={regionImages[pin.regionImageIndex]}
                />
              </mesh>
            </group>
          );
        })}

        <MapLayer />
        <Stats />
      </Canvas>
    </div>
  );
};

export default App;
