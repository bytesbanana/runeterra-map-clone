import { useFrame, useLoader } from "@react-three/fiber";
import { PINS, TILES } from "./config";
import * as THREE from "three";
import { useRef } from "react";
import { pxToWorld } from "./helpers";

const CLOUD_SPEED = 0.005;
const CLOUD_OPACITY = 0.3;
const CLOUD_SIZE = 8;

const Cloud = ({ cloudMap }: { cloudMap: THREE.Texture }) => {
  const cloud1 = useRef<THREE.Mesh>(null);
  const cloud2 = useRef<THREE.Mesh>(null);
  const cloud3 = useRef<THREE.Mesh>(null);
  const clouds = [cloud1, cloud2, cloud3];

  useFrame(() => {
    if (cloud1.current) {
      cloud1.current.position.x += CLOUD_SPEED;
    }
    if (cloud2.current) {
      cloud2.current.position.x += CLOUD_SPEED;
    }
    if (cloud3.current) {
      cloud3.current.position.x += CLOUD_SPEED;
    }

    clouds.forEach((cloudRef, idx) => {
      const cloud = cloudRef.current;
      if (cloud && cloud.position.x > CLOUD_SIZE) {
        // Move the cloud to the left of the leftmost cloud
        // Find the leftmost cloud
        const leftmost = Math.min(
          ...clouds.map((ref) => ref.current?.position.x ?? 0)
        );
        cloud.position.x = leftmost - CLOUD_SIZE;
        // Move this cloud ref to the front of the stack
        clouds.splice(idx, 1);
        clouds.unshift(cloudRef);
      }
    });
  });

  return (
    <>
      <mesh position={[-CLOUD_SIZE, 0, 1]} ref={cloud1}>
        <planeGeometry args={[CLOUD_SIZE, CLOUD_SIZE]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent={true}
          opacity={CLOUD_OPACITY}
        />
      </mesh>
      <mesh position={[0, 0, 1]} ref={cloud2}>
        <planeGeometry args={[CLOUD_SIZE, CLOUD_SIZE]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent={true}
          opacity={CLOUD_OPACITY}
        />
      </mesh>
      <mesh position={[CLOUD_SIZE, 0, 1]} ref={cloud3}>
        <planeGeometry args={[CLOUD_SIZE, CLOUD_SIZE]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent={true}
          opacity={CLOUD_OPACITY}
        />
      </mesh>
    </>
  );
};

export const MapLayer = () => {
  const [terrianMap, depthMap, cloudMap] = useLoader(
    THREE.TextureLoader,
    TILES
  );

  return (
    <>
      <Cloud cloudMap={cloudMap} />
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
