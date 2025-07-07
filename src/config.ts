export const TILES = ["terrain_z1.jpg", "depth_z1.jpg", "clouds.jpg"];
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
}[] = [
  {
    name: "Noxus",
    position: [0, 173, 8.470588235294118],
    color: "red",
    size: 0.02,
    label: "Noxus",
  },
  {
    name: "Demacia",
    position: [-428, 67, 5.88235294117647],
    color: "green",
    size: 0.02,
    label: "Demacia",
  },
  {
    name: "Ionia",
    position: [539, 232, 12],
    color: "blue",
    size: 0.02,
    label: "Ionia",
  },
  {
    name: "Freljord",
    position: [-351, 285, 17.647058823529413],
    color: "purple",
    size: 0.02,
    label: "Freljord",
  },
  {
    name: "Piltover-Zaun",
    position: [194, -109, 0.68],
    color: "yellow",
    size: 0.02,
    label: "Piltover-Zaun",
  },
  {
    name: "targon",
    position: [-240, -384, 0],
    color: "orange",
    size: 0.02,
    label: "targon",
  },
  {
    name: "Shurima",
    position: [67, -356, 9.411764705882353],
    color: "white",
    size: 0.02,
    label: "Shurima",
  },
  {
    name: "Ixtal",
    position: [287, -332, 15.529411764705884],
    color: "pink",
    size: 0.02,
    label: "Ixtal",
  },
  {
    name: "Bilgewater",
    position: [569, -183, 0],
    color: "cyan",
    size: 0.02,
    label: "Bilgewater",
  },
  {
    name: "Shadow Isles",
    position: [0, -173, 0],
    color: "black",
    size: 0.02,
    label: "Shadow Isles",
  },
];
