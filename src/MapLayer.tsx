import { useLoader } from "@react-three/fiber";
import { MAP_TILES, PINS } from "./config";
import * as THREE from "three";
import { pxToWorld } from "./helpers";

export const MapLayer = () => {
  const [terrianMap, depthMap] = useLoader(THREE.TextureLoader, MAP_TILES);

  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[8, 8, 2048, 2048]} />
        <ambientLight intensity={4} />
        <meshStandardMaterial
          map={terrianMap}
          displacementMap={depthMap}
          displacementScale={1}
        />
      </mesh>

      {PINS.map((pin) => (
        <group key={pin.name}>
          <mesh position={pxToWorld(pin.position)}>
            <axesHelper />
            <sphereGeometry args={[0.02, 32, 32]} />
            <meshBasicMaterial transparent opacity={0} />
            <meshStandardMaterial color={pin.color} />
          </mesh>
        </group>
      ))}
    </>
  );
};
