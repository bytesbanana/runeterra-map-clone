import { CameraControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const App = () => {
  const [terrianMap, depthMap] = useLoader(TextureLoader, [
    "terrain_z1.jpg",
    "depth_z1.jpg",
  ]);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <CameraControls />
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <planeGeometry args={[10, 10, 256, 256]} />{" "}
          {/* Add segments for smooth displacement */}
          <meshStandardMaterial
            map={terrianMap}
            displacementMap={depthMap}
            displacementScale={1} // Adjust for desired depth effect
          />
        </mesh>
      </Canvas>
    </>
  );
};

export default App;
