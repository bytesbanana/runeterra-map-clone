import { MAP } from "./config";

const WORLD_Z = 64;
export function pxToWorld(
  [x, y, z]: [number, number, number],
  planeWidth = 8,
  planeHeight = 8
): [number, number, number] {
  const newX = x / (MAP.width / planeWidth);
  const newY = y / (MAP.height / planeHeight);
  const newZ = z / WORLD_Z;
  return [newX, newY, newZ];
}
