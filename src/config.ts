export const MAP_TILES = ["terrain_z1.jpg", "depth_z1.jpg"];
export const CLOULDS = ["clouds.jpg"];
export const REGION_IMAGES = [
  "noxus.png",
  "demacia.png",
  "ionia.png",
  "freljord.png",
  "piltover-zaun.png",
  "targon.png",
  "shurima.png",
  "ixtal.png",
  "bilgewater.png",
  "shadow-isles.png",
];
export const MIN_ZOOM = 1.75;
export const DEFAULT_ZOOM = 4;
export const MAX_ZOOM = 5;
export const MAP = {
  width: 2048,
  height: 2048,
};

export const PINS: {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  regionImageIndex: number;
  type: "circle" | "rectangle";
}[] = [
  {
    name: "Noxus",
    position: [0, 173, 8.470588235294118],
    color: "red",
    size: 0.1,
    label: "Noxus",
    regionImageIndex: 0,
    type: "circle",
  },
  {
    name: "Demacia",
    position: [-428, 67, 5.88235294117647],
    color: "green",
    size: 0.1,
    label: "Demacia",
    regionImageIndex: 1,
    type: "circle",
  },
  {
    name: "Ionia",
    position: [539, 232, 12],
    color: "blue",
    size: 0.1,
    label: "Ionia",
    regionImageIndex: 2,
    type: "circle",
  },
  {
    name: "Freljord",
    position: [-351, 285, 17.647058823529413],
    color: "purple",
    size: 0.1,
    label: "Freljord",
    regionImageIndex: 3,
    type: "circle",
  },
  {
    name: "Piltover-Zaun",
    position: [194, -109, 0.68],
    color: "yellow",
    size: 0.2,
    label: "Piltover-Zaun",
    regionImageIndex: 4,
    type: "rectangle",
  },
  {
    name: "targon",
    position: [-240, -384, 0],
    color: "orange",
    size: 0.1,
    label: "targon",
    regionImageIndex: 5,
    type: "circle",
  },
  {
    name: "Shurima",
    position: [67, -356, 9.411764705882353],
    color: "white",
    size: 0.1,
    label: "Shurima",
    regionImageIndex: 6,
    type: "circle",
  },
  {
    name: "Ixtal",
    position: [287, -332, 15.529411764705884],
    color: "pink",
    size: 0.1,
    label: "Ixtal",
    regionImageIndex: 7,
    type: "circle",
  },
  {
    name: "Bilgewater",
    position: [569, -183, 0],
    color: "cyan",
    size: 0.1,
    label: "Bilgewater",
    regionImageIndex: 8,
    type: "circle",
  },
  {
    name: "Shadow Isles",
    position: [0, -173, 0],
    color: "black",
    size: 0.1,
    label: "Shadow Isles",
    regionImageIndex: 9,
    type: "circle",
  },
];
