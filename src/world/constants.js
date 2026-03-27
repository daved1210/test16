export const CHUNK_SIZE = 16;
export const WORLD_HEIGHT = 64;
export const RENDER_DISTANCE = 2;

export const BLOCKS = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  WOOD: 4,
  SAND: 5,
};

export const BLOCK_DEFS = {
  [BLOCKS.AIR]: { name: '空气', color: null, solid: false },
  [BLOCKS.GRASS]: { name: '草方块', color: '#69b55b', solid: true },
  [BLOCKS.DIRT]: { name: '泥土', color: '#8b5a3c', solid: true },
  [BLOCKS.STONE]: { name: '石头', color: '#8e9198', solid: true },
  [BLOCKS.WOOD]: { name: '木头', color: '#7a5736', solid: true },
  [BLOCKS.SAND]: { name: '沙子', color: '#d9c27a', solid: true },
};

export const HOTBAR_BLOCKS = [
  BLOCKS.GRASS,
  BLOCKS.DIRT,
  BLOCKS.STONE,
  BLOCKS.WOOD,
  BLOCKS.SAND,
];

export const FACE_DEFS = [
  {
    dir: [1, 0, 0],
    corners: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    shade: 0.86,
  },
  {
    dir: [-1, 0, 0],
    corners: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    shade: 0.72,
  },
  {
    dir: [0, 1, 0],
    corners: [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
    shade: 1,
  },
  {
    dir: [0, -1, 0],
    corners: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
    shade: 0.56,
  },
  {
    dir: [0, 0, 1],
    corners: [
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
    ],
    shade: 0.8,
  },
  {
    dir: [0, 0, -1],
    corners: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
    shade: 0.68,
  },
];
