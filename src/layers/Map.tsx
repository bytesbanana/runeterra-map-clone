import { useLoader } from "@react-three/fiber";
import { MAP_TILES } from "../config";
import * as THREE from "three";

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
    </>
  );
};
