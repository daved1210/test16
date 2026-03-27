const BLOCKS = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  WOOD: 4,
  SAND: 5,
  LEAVES: 6,
  PLANKS: 7,
  BRICK: 8,
  SNOW: 9,
  BASALT: 10,
  CLAY: 11,
  WATER: 12,
  LAVA: 13,
  CRAFTING_TABLE: 14,
};

const ITEMS = {
  STICK: 100,
};

const CHUNK_SIZE = 16;
const WORLD_HEIGHT = 72;
const RENDER_DISTANCE = 2;
const SEA_LEVEL = 18;
const PLAYER_WIDTH = 0.6;
const PLAYER_HEIGHT = 1.8;
const EYE_HEIGHT = 1.62;
const GRAVITY = 24;
const JUMP_SPEED = 8.5;
const MOVE_SPEED = 5.2;
const DAY_LENGTH = 180;
const MAX_STACK = 64;
const INVENTORY_SIZE = 36;
const HOTBAR_SIZE = 9;
const ENTITY_RENDER_DISTANCE = 40;

const FACE_DEFS = [
  { dir: [1, 0, 0], corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], name: 'east' },
  { dir: [-1, 0, 0], corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]], name: 'west' },
  { dir: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]], name: 'top' },
  { dir: [0, -1, 0], corners: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], name: 'bottom' },
  { dir: [0, 0, 1], corners: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]], name: 'south' },
  { dir: [0, 0, -1], corners: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]], name: 'north' },
];

const BLOCK_DEFS = {
  [BLOCKS.AIR]: { name: '空气', solid: false, liquid: false, hardness: 0, itemId: null, desc: '透明' },
  [BLOCKS.GRASS]: { name: '草方块', solid: true, liquid: false, hardness: 1.1, itemId: BLOCKS.GRASS, desc: '平原地表', tex: { top: 'grass_top', bottom: 'dirt', side: 'grass_side' } },
  [BLOCKS.DIRT]: { name: '泥土', solid: true, liquid: false, hardness: 0.9, itemId: BLOCKS.DIRT, desc: '基础土层', tex: { all: 'dirt' } },
  [BLOCKS.STONE]: { name: '石头', solid: true, liquid: false, hardness: 2.4, itemId: BLOCKS.STONE, desc: '坚硬岩石', tex: { all: 'stone' } },
  [BLOCKS.WOOD]: { name: '木头', solid: true, liquid: false, hardness: 1.5, itemId: BLOCKS.WOOD, desc: '树干材料', tex: { top: 'wood_top', bottom: 'wood_top', side: 'wood_side' } },
  [BLOCKS.SAND]: { name: '沙子', solid: true, liquid: false, hardness: 0.8, itemId: BLOCKS.SAND, desc: '沙地表层', tex: { all: 'sand' } },
  [BLOCKS.LEAVES]: { name: '树叶', solid: true, liquid: false, hardness: 0.3, itemId: BLOCKS.LEAVES, desc: '树冠装饰', tex: { all: 'leaves' } },
  [BLOCKS.PLANKS]: { name: '木板', solid: true, liquid: false, hardness: 1.0, itemId: BLOCKS.PLANKS, desc: '建筑材料', tex: { all: 'planks' } },
  [BLOCKS.BRICK]: { name: '砖块', solid: true, liquid: false, hardness: 1.8, itemId: BLOCKS.BRICK, desc: '砖石建材', tex: { all: 'brick' } },
  [BLOCKS.SNOW]: { name: '雪块', solid: true, liquid: false, hardness: 0.7, itemId: BLOCKS.SNOW, desc: '雪地表层', tex: { all: 'snow' } },
  [BLOCKS.BASALT]: { name: '玄武岩', solid: true, liquid: false, hardness: 2.8, itemId: BLOCKS.BASALT, desc: '火山岩石', tex: { all: 'basalt' } },
  [BLOCKS.CLAY]: { name: '黏土', solid: true, liquid: false, hardness: 1.0, itemId: BLOCKS.CLAY, desc: '湿地土层', tex: { all: 'clay' } },
  [BLOCKS.WATER]: { name: '水', solid: false, liquid: true, hardness: 0, itemId: null, desc: '液体', tex: { all: 'water' } },
  [BLOCKS.LAVA]: { name: '岩浆', solid: false, liquid: true, hardness: 0, itemId: null, desc: '危险液体', tex: { all: 'lava' } },
  [BLOCKS.CRAFTING_TABLE]: { name: '合成台', solid: true, liquid: false, hardness: 1.8, itemId: BLOCKS.CRAFTING_TABLE, desc: '打开 3x3 合成', tex: { top: 'craft_top', bottom: 'planks', side: 'craft_side' } },
};

const ITEM_DEFS = {
  [BLOCKS.GRASS]: { name: '草方块', placeBlock: BLOCKS.GRASS, desc: '可放置方块', tile: 'grass_side' },
  [BLOCKS.DIRT]: { name: '泥土', placeBlock: BLOCKS.DIRT, desc: '可放置方块', tile: 'dirt' },
  [BLOCKS.STONE]: { name: '石头', placeBlock: BLOCKS.STONE, desc: '可放置方块', tile: 'stone' },
  [BLOCKS.WOOD]: { name: '木头', placeBlock: BLOCKS.WOOD, desc: '可放置方块', tile: 'wood_side' },
  [BLOCKS.SAND]: { name: '沙子', placeBlock: BLOCKS.SAND, desc: '可放置方块', tile: 'sand' },
  [BLOCKS.LEAVES]: { name: '树叶', placeBlock: BLOCKS.LEAVES, desc: '可放置方块', tile: 'leaves' },
  [BLOCKS.PLANKS]: { name: '木板', placeBlock: BLOCKS.PLANKS, desc: '可放置方块', tile: 'planks' },
  [BLOCKS.BRICK]: { name: '砖块', placeBlock: BLOCKS.BRICK, desc: '可放置方块', tile: 'brick' },
  [BLOCKS.SNOW]: { name: '雪块', placeBlock: BLOCKS.SNOW, desc: '可放置方块', tile: 'snow' },
  [BLOCKS.BASALT]: { name: '玄武岩', placeBlock: BLOCKS.BASALT, desc: '可放置方块', tile: 'basalt' },
  [BLOCKS.CLAY]: { name: '黏土', placeBlock: BLOCKS.CLAY, desc: '可放置方块', tile: 'clay' },
  [BLOCKS.CRAFTING_TABLE]: { name: '合成台', placeBlock: BLOCKS.CRAFTING_TABLE, desc: '右键打开', tile: 'craft_top' },
  [ITEMS.STICK]: { name: '木棍', placeBlock: null, desc: '合成材料', tile: 'stick' },
};

const STARTER_ITEMS = [
  { id: BLOCKS.WOOD, count: 4 },
  { id: BLOCKS.DIRT, count: 16 },
  { id: BLOCKS.STONE, count: 8 },
  { id: BLOCKS.SAND, count: 8 },
];

const RECIPES = [
  { size: 2, input: [[BLOCKS.WOOD]], output: { id: BLOCKS.PLANKS, count: 4 } },
  { size: 2, input: [[BLOCKS.PLANKS], [BLOCKS.PLANKS]], output: { id: ITEMS.STICK, count: 4 } },
  { size: 2, input: [[BLOCKS.PLANKS, BLOCKS.PLANKS], [BLOCKS.PLANKS, BLOCKS.PLANKS]], output: { id: BLOCKS.CRAFTING_TABLE, count: 1 } },
  { size: 3, input: [[BLOCKS.STONE, BLOCKS.STONE], [BLOCKS.STONE, BLOCKS.STONE]], output: { id: BLOCKS.BRICK, count: 4 } },
  { size: 3, input: [[BLOCKS.PLANKS, BLOCKS.PLANKS, BLOCKS.PLANKS]], output: { id: BLOCKS.WOOD, count: 2 } },
  { size: 3, input: [[BLOCKS.CLAY, BLOCKS.CLAY], [BLOCKS.CLAY, BLOCKS.CLAY]], output: { id: BLOCKS.BRICK, count: 4 } },
];

const ENTITY_TYPES = {
  sheep: { name: '羊', color: '#f2f2f2', hostile: false, speed: 1.1, health: 4, spawn: 'day', dropId: BLOCKS.WOOD, dropCountRange: [1, 2], body: 'quadruped' },
  pig: { name: '猪', color: '#ef9aa7', hostile: false, speed: 1.0, health: 4, spawn: 'day', dropId: BLOCKS.DIRT, dropCountRange: [1, 2], body: 'quadruped' },
  villager: { name: '村民', color: '#c59b6d', hostile: false, speed: 0.82, health: 8, spawn: 'village', dropId: BLOCKS.PLANKS, dropCountRange: [1, 2], body: 'villager', avoidPlayer: true },
  zombie: { name: '僵尸', color: '#4a9f62', hostile: true, speed: 1.5, health: 6, spawn: 'night', damage: 2, dropId: BLOCKS.STONE, dropCountRange: [1, 2], body: 'humanoid' },
  slime: { name: '史莱姆', color: '#69d98c', hostile: true, speed: 1.2, health: 5, spawn: 'night', damage: 1, dropId: BLOCKS.CLAY, dropCountRange: [1, 2], body: 'slime' },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function floorDiv(value, divisor) {
  return Math.floor(value / divisor);
}

function positiveModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function mixColor(colorA, colorB, t) {
  const a = new THREE.Color(colorA);
  const b = new THREE.Color(colorB);
  return new THREE.Color(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t));
}

function fractalNoise2D(x, z, seed = 0) {
  let total = 0;
  let amplitude = 1;
  let frequency = 0.018 + seed * 0.0023;
  let amplitudeSum = 0;

  for (let i = 0; i < 4; i += 1) {
    total += amplitude * Math.sin((x + seed * 37) * frequency + i * 11.3) * Math.cos((z - seed * 19) * frequency * 1.11 + i * 7.1);
    amplitudeSum += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return total / amplitudeSum;
}

function hash2D(x, z) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function randomRangeInt(min, max, seed) {
  const n = hash2D(seed, seed * 1.37);
  return Math.floor(min + n * (max - min + 1));
}

function blockKey(x, y, z) {
  return `${x},${y},${z}`;
}

function createTextureAtlas() {
  const tileSize = 16;
  const names = [
    'grass_top', 'grass_side', 'dirt', 'stone',
    'wood_top', 'wood_side', 'sand', 'leaves',
    'planks', 'brick', 'snow', 'basalt',
    'clay', 'water', 'lava', 'craft_top',
    'craft_side', 'stick',
  ];
  const columns = 4;
  const rows = Math.ceil(names.length / columns);
  const canvas = document.createElement('canvas');
  canvas.width = columns * tileSize;
  canvas.height = rows * tileSize;
  const ctx = canvas.getContext('2d');

  const drawTile = (index, painter) => {
    const x = (index % columns) * tileSize;
    const y = Math.floor(index / columns) * tileSize;
    ctx.save();
    ctx.translate(x, y);
    painter(ctx, tileSize);
    ctx.restore();
  };

  const noiseDots = (ctx2, size, color, count, stepX = 7, stepY = 11) => {
    ctx2.fillStyle = color;
    for (let i = 0; i < count; i += 1) {
      ctx2.fillRect((i * stepX) % size, (i * stepY) % size, 2, 2);
    }
  };

  const painters = {
    grass_top(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#7fe070');
      gradient.addColorStop(1, '#4f9445');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#95f187', 18, 5, 9);
      noiseDots(ctx2, size, '#3f7a39', 12, 9, 5);
      ctx2.fillStyle = 'rgba(255,255,255,0.08)';
      ctx2.fillRect(0, 0, size, 2);
    },
    grass_side(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#7ac864');
      gradient.addColorStop(0.32, '#6bb85c');
      gradient.addColorStop(0.33, '#8c5b3a');
      gradient.addColorStop(1, '#6f452d');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#8bdb79', 8, 3, 7);
      noiseDots(ctx2, size, '#5f3821', 12, 7, 5);
    },
    dirt(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#9d6d48');
      gradient.addColorStop(1, '#6f452d');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#5c351f', 16, 5, 11);
      noiseDots(ctx2, size, '#b6845d', 10, 11, 5);
    },
    stone(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#b5bac1');
      gradient.addColorStop(1, '#767b83');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#676c73', 16, 5, 9);
      noiseDots(ctx2, size, '#dde1e7', 8, 9, 5);
      ctx2.fillStyle = 'rgba(255,255,255,0.08)';
      ctx2.fillRect(0, 0, size, 1);
    },
    wood_top(ctx2, size) {
      ctx2.fillStyle = '#a97b49';
      ctx2.fillRect(0, 0, size, size);
      ctx2.strokeStyle = '#6a4728';
      ctx2.lineWidth = 2;
      ctx2.beginPath();
      ctx2.arc(size / 2, size / 2, 5, 0, Math.PI * 2);
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.arc(size / 2, size / 2, 2.5, 0, Math.PI * 2);
      ctx2.stroke();
    },
    wood_side(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, 0);
      gradient.addColorStop(0, '#7b532f');
      gradient.addColorStop(0.5, '#9e7245');
      gradient.addColorStop(1, '#6a4728');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      ctx2.fillStyle = '#5b3a20';
      for (let i = 1; i < 5; i += 1) {
        ctx2.fillRect(i * 3, 0, 1, size);
      }
      ctx2.fillStyle = 'rgba(255,255,255,0.08)';
      ctx2.fillRect(0, 1, size, 1);
    },
    sand(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#f1e0a4');
      gradient.addColorStop(1, '#d0b96d');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#b79b4e', 14, 5, 7);
      noiseDots(ctx2, size, '#fff0ba', 8, 11, 5);
    },
    leaves(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#74c966');
      gradient.addColorStop(1, '#37682d');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#92e27b', 18, 3, 7);
      noiseDots(ctx2, size, '#295421', 10, 7, 3);
    },
    planks(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#cd9b66');
      gradient.addColorStop(1, '#9c6d42');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      ctx2.fillStyle = '#7b5532';
      for (let i = 0; i < 4; i += 1) {
        ctx2.fillRect(0, i * 4, size, 1);
      }
      ctx2.fillStyle = 'rgba(255,255,255,0.1)';
      ctx2.fillRect(0, 0, size, 1);
    },
    brick(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#bf6656');
      gradient.addColorStop(1, '#7e362e');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      ctx2.fillStyle = '#6c2e28';
      ctx2.fillRect(0, 5, size, 1);
      ctx2.fillRect(0, 11, size, 1);
      ctx2.fillRect(5, 0, 1, 6);
      ctx2.fillRect(11, 6, 1, 6);
      ctx2.fillStyle = 'rgba(255,255,255,0.08)';
      ctx2.fillRect(0, 0, size, 1);
    },
    snow(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#d8e6f3');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#c9dceb', 12, 5, 9);
    },
    basalt(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#5c5e65');
      gradient.addColorStop(1, '#2f3036');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#72757d', 12, 5, 7);
      noiseDots(ctx2, size, '#1f2024', 12, 9, 5);
    },
    clay(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#a0afcf');
      gradient.addColorStop(1, '#7283a9');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      noiseDots(ctx2, size, '#62749a', 14, 5, 11);
    },
    water(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#66c1ff');
      gradient.addColorStop(1, '#2d71d4');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      ctx2.fillStyle = 'rgba(255,255,255,0.2)';
      for (let i = 0; i < 3; i += 1) {
        ctx2.fillRect(0, 3 + i * 4, size, 1);
      }
    },
    lava(ctx2, size) {
      const gradient = ctx2.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, '#ffd44a');
      gradient.addColorStop(0.45, '#ff8f00');
      gradient.addColorStop(1, '#d63b15');
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, size, size);
      ctx2.fillStyle = 'rgba(255,255,255,0.18)';
      ctx2.fillRect(0, 3, size, 2);
      ctx2.fillRect(0, 10, size, 2);
    },
    craft_top(ctx2, size) {
      painters.planks(ctx2, size);
      ctx2.fillStyle = '#6d4729';
      ctx2.fillRect(3, 3, 10, 10);
      ctx2.fillStyle = '#e0ca87';
      ctx2.fillRect(5, 5, 6, 6);
      ctx2.strokeStyle = '#50321b';
      ctx2.strokeRect(3, 3, 10, 10);
    },
    craft_side(ctx2, size) {
      painters.planks(ctx2, size);
      ctx2.fillStyle = '#4a2d18';
      ctx2.fillRect(3, 4, 10, 8);
      ctx2.fillStyle = '#d7bb71';
      ctx2.fillRect(5, 6, 6, 4);
    },
    stick(ctx2, size) {
      ctx2.fillStyle = '#00000000';
      ctx2.fillRect(0, 0, size, size);
      ctx2.fillStyle = '#9b6d3f';
      ctx2.fillRect(7, 2, 2, 12);
      ctx2.fillStyle = '#c08d56';
      ctx2.fillRect(8, 2, 1, 12);
    },
  };

  names.forEach((name, index) => drawTile(index, painters[name]));

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const tileMap = Object.fromEntries(names.map((name, index) => [name, index]));
  return { texture, tileMap, tileSize, columns, rows };
}

function tileUvs(tileIndex, columns, rows) {
  const col = tileIndex % columns;
  const row = Math.floor(tileIndex / columns);
  const u0 = col / columns;
  const v0 = 1 - (row + 1) / rows;
  const u1 = (col + 1) / columns;
  const v1 = 1 - row / rows;
  return [u0, v0, u1, v1];
}

function normalizeRecipeGrid(grid, size) {
  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      cells.push(grid[y * size + x]?.id || 0);
    }
  }

  let minX = size;
  let minY = size;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const value = cells[y * size + x];
      if (!value) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX === -1) {
    return 'empty';
  }

  const rows = [];
  for (let y = minY; y <= maxY; y += 1) {
    const row = [];
    for (let x = minX; x <= maxX; x += 1) {
      row.push(cells[y * size + x]);
    }
    rows.push(row.join(','));
  }
  return rows.join('|');
}

class RecipeBook {
  constructor() {
    this.recipes = RECIPES.map((recipe) => ({
      ...recipe,
      key: recipe.input.map((row) => row.join(',')).join('|'),
    }));
  }

  match(grid, size) {
    const key = normalizeRecipeGrid(grid, size);
    return this.recipes.find((recipe) => recipe.size === size && recipe.key === key) || null;
  }
}

class SaveManager {
  constructor(storageKey = 'voxel-world-save-v4') {
    this.storageKey = storageKey;
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {}
  }
}

class Inventory {
  constructor() {
    this.slots = Array.from({ length: INVENTORY_SIZE }, () => null);
    this.selectedHotbarIndex = 0;
    this.initializeStarterItems();
  }

  initializeStarterItems() {
    for (const entry of STARTER_ITEMS) {
      this.addItem(entry.id, entry.count);
    }
  }

  serializeSlot(slot) {
    return slot ? { id: slot.id, count: slot.count } : null;
  }

  restore(data) {
    if (Array.isArray(data?.slots)) {
      this.slots = data.slots.slice(0, INVENTORY_SIZE).map((slot) => (slot ? { id: slot.id, count: slot.count } : null));
      while (this.slots.length < INVENTORY_SIZE) {
        this.slots.push(null);
      }
    }
    if (typeof data?.selectedHotbarIndex === 'number') {
      this.selectedHotbarIndex = clamp(data.selectedHotbarIndex, 0, HOTBAR_SIZE - 1);
    }
  }

  serialize() {
    return {
      slots: this.slots.map((slot) => this.serializeSlot(slot)),
      selectedHotbarIndex: this.selectedHotbarIndex,
    };
  }

  getSlot(index) {
    return this.slots[index];
  }

  setSlot(index, item) {
    this.slots[index] = item ? { id: item.id, count: item.count } : null;
  }

  getSelectedSlot() {
    return this.slots[this.selectedHotbarIndex];
  }

  getSelectedItemId() {
    return this.getSelectedSlot()?.id ?? null;
  }

  addItem(id, count = 1) {
    let remaining = count;

    for (let i = 0; i < this.slots.length; i += 1) {
      const slot = this.slots[i];
      if (slot && slot.id === id && slot.count < MAX_STACK) {
        const move = Math.min(MAX_STACK - slot.count, remaining);
        slot.count += move;
        remaining -= move;
        if (!remaining) return true;
      }
    }

    for (let i = 0; i < this.slots.length; i += 1) {
      if (!this.slots[i]) {
        const move = Math.min(MAX_STACK, remaining);
        this.slots[i] = { id, count: move };
        remaining -= move;
        if (!remaining) return true;
      }
    }

    return remaining === 0;
  }

  removeItem(id, count = 1) {
    let remaining = count;
    for (let i = 0; i < this.slots.length; i += 1) {
      const slot = this.slots[i];
      if (!slot || slot.id !== id) continue;
      const move = Math.min(slot.count, remaining);
      slot.count -= move;
      remaining -= move;
      if (slot.count <= 0) this.slots[i] = null;
      if (!remaining) return true;
    }
    return false;
  }

  removeFromSlot(index, count = 1) {
    const slot = this.slots[index];
    if (!slot || slot.count < count) return false;
    slot.count -= count;
    if (slot.count <= 0) this.slots[index] = null;
    return true;
  }

  hasItems(id, count = 1) {
    let total = 0;
    for (const slot of this.slots) {
      if (slot?.id === id) total += slot.count;
      if (total >= count) return true;
    }
    return false;
  }
}

class CraftingState {
  constructor(size) {
    this.size = size;
    this.slots = Array.from({ length: size * size }, () => null);
    this.activeIndex = 0;
  }

  serialize() {
    return this.slots.map((slot) => (slot ? { id: slot.id, count: slot.count } : null));
  }

  restore(data) {
    if (!Array.isArray(data)) return;
    this.slots = data.slice(0, this.size * this.size).map((slot) => (slot ? { id: slot.id, count: slot.count } : null));
    while (this.slots.length < this.size * this.size) {
      this.slots.push(null);
    }
  }

  clear() {
    this.slots = this.slots.map(() => null);
  }
}

class HUD {
  constructor(textureAtlas) {
    this.textureAtlas = textureAtlas;
    this.debug = document.getElementById('debug');
    this.message = document.getElementById('message');
    this.time = document.getElementById('time');
    this.mode = document.getElementById('mode');
    this.health = document.getElementById('health');
    this.targetInfo = document.getElementById('target-info');
    this.hotbar = document.getElementById('hotbar');
    this.inventoryRoot = document.getElementById('inventory');
    this.craftingTableRoot = document.getElementById('crafting-table-panel');
    this.inventoryGrid = document.getElementById('inventory-grid');
    this.craftingTableInventoryGrid = document.getElementById('crafting-table-inventory-grid');
    this.craftGridSmall = document.getElementById('craft-grid-small');
    this.craftGridLarge = document.getElementById('craft-grid-large');
    this.craftResultSmall = document.getElementById('craft-result-small');
    this.craftResultLarge = document.getElementById('craft-result-large');
    this.mineProgress = document.getElementById('mine-progress');
    this.messageTimer = 0;
    this.hotbarSlots = [];
    this.inventorySlots = [];
    this.craftingTableInventorySlots = [];
    this.craftSmallSlots = [];
    this.craftLargeSlots = [];
  }

  tileBackground(tileName) {
    const index = this.textureAtlas.tileMap[tileName];
    const x = (index % this.textureAtlas.columns) * this.textureAtlas.tileSize;
    const y = Math.floor(index / this.textureAtlas.columns) * this.textureAtlas.tileSize;
    const width = this.textureAtlas.texture.image.width;
    const height = this.textureAtlas.texture.image.height;
    return `url(${this.textureAtlas.texture.image.toDataURL()}) -${x * 2}px -${y * 2}px / ${width * 2}px ${height * 2}px`;
  }

  fillSlotVisual(element, item) {
    if (!item) {
      element.innerHTML = '<div class="slot-color"></div><div class="slot-count">空</div>';
      const swatch = element.querySelector('.slot-color');
      swatch.style.background = 'rgba(255,255,255,0.08)';
      return;
    }
    const itemDef = ITEM_DEFS[item.id];
    element.innerHTML = `
      <div class="slot-color"></div>
      <div class="slot-count">${itemDef.name} x${item.count}</div>
    `;
    const swatch = element.querySelector('.slot-color');
    swatch.style.background = this.tileBackground(itemDef.tile);
  }

  buildStaticUi(inventory, craftSmall, craftLarge) {
    this.hotbar.innerHTML = '';
    this.inventoryGrid.innerHTML = '';
    this.craftingTableInventoryGrid.innerHTML = '';
    this.craftGridSmall.innerHTML = '';
    this.craftGridLarge.innerHTML = '';

    for (let i = 0; i < HOTBAR_SIZE; i += 1) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'hotbar-slot';
      slot.dataset.index = String(i);
      this.hotbar.appendChild(slot);
      this.hotbarSlots.push(slot);
    }

    for (let i = 0; i < INVENTORY_SIZE; i += 1) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'inventory-item';
      slot.dataset.index = String(i);
      this.inventoryGrid.appendChild(slot);
      this.inventorySlots.push(slot);
    }

    for (let i = 0; i < INVENTORY_SIZE; i += 1) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'inventory-item';
      slot.dataset.index = String(i);
      this.craftingTableInventoryGrid.appendChild(slot);
      this.craftingTableInventorySlots.push(slot);
    }

    for (let i = 0; i < craftSmall.size * craftSmall.size; i += 1) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'craft-slot';
      slot.dataset.index = String(i);
      this.craftGridSmall.appendChild(slot);
      this.craftSmallSlots.push(slot);
    }

    for (let i = 0; i < craftLarge.size * craftLarge.size; i += 1) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'craft-slot';
      slot.dataset.index = String(i);
      this.craftGridLarge.appendChild(slot);
      this.craftLargeSlots.push(slot);
    }

    this.refreshInventory(inventory);
  }

  refreshInventory(inventory) {
    const fillInventoryButton = (slot, item, active) => {
      slot.classList.toggle('active', Boolean(active));
      slot.innerHTML = '';
      const swatch = document.createElement('div');
      swatch.className = 'inventory-color';
      const textWrap = document.createElement('div');
      textWrap.className = 'inventory-item-text';
      const name = document.createElement('div');
      name.className = 'inventory-name';
      const desc = document.createElement('div');
      desc.className = 'inventory-desc';
      if (item) {
        const itemDef = ITEM_DEFS[item.id];
        swatch.style.background = this.tileBackground(itemDef.tile);
        name.textContent = `${itemDef.name} x${item.count}`;
        desc.textContent = itemDef.desc;
      } else {
        swatch.style.background = 'rgba(255,255,255,0.08)';
        name.textContent = '空槽位';
        desc.textContent = '可存放物品';
      }
      textWrap.append(name, desc);
      slot.append(swatch, textWrap);
    };

    this.inventorySlots.forEach((slot, index) => {
      fillInventoryButton(slot, inventory.getSlot(index), index === inventory.selectedHotbarIndex);
    });

    this.craftingTableInventorySlots.forEach((slot, index) => {
      fillInventoryButton(slot, inventory.getSlot(index), index === inventory.selectedHotbarIndex);
    });

    this.hotbarSlots.forEach((slot, index) => {
      const item = inventory.getSlot(index);
      slot.classList.toggle('active', index === inventory.selectedHotbarIndex);
      if (item) {
        const itemDef = ITEM_DEFS[item.id];
        slot.innerHTML = `
          <div class="hotbar-color"></div>
          <div class="hotbar-key">${index + 1}</div>
          <div class="hotbar-label">${itemDef.name}</div>
          <div class="hotbar-count">x${item.count}</div>
        `;
        slot.querySelector('.hotbar-color').style.background = this.tileBackground(itemDef.tile);
      } else {
        slot.innerHTML = `
          <div class="hotbar-color"></div>
          <div class="hotbar-key">${index + 1}</div>
          <div class="hotbar-label">空</div>
          <div class="hotbar-count">-</div>
        `;
        slot.querySelector('.hotbar-color').style.background = 'rgba(255,255,255,0.08)';
      }
    });
  }

  refreshCraftGrid(craftingState, slotElements) {
    slotElements.forEach((slot, index) => {
      slot.classList.toggle('active', index === craftingState.activeIndex);
      this.fillSlotVisual(slot, craftingState.slots[index]);
    });
  }

  refreshCraftResult(button, recipe) {
    button.classList.toggle('ready', Boolean(recipe));
    if (!recipe) {
      button.textContent = '无可用配方';
      return;
    }
    const itemDef = ITEM_DEFS[recipe.output.id];
    button.textContent = `${itemDef.name} x${recipe.output.count}`;
  }

  setDebug(lines) {
    this.debug.innerHTML = lines.join('<br />');
  }

  setTimeLabel(text) {
    this.time.textContent = text;
  }

  setHealth(value) {
    this.health.textContent = `生命：${value}`;
  }

  setMode(text) {
    this.mode.textContent = text;
  }

  setTargetLabel(text) {
    this.targetInfo.textContent = text || '';
  }

  setMineProgress(progress) {
    this.mineProgress.style.width = `${clamp(progress, 0, 1) * 100}%`;
  }

  showInventory(visible) {
    this.inventoryRoot.classList.toggle('hidden', !visible);
  }

  showCraftingTable(visible) {
    this.craftingTableRoot.classList.toggle('hidden', !visible);
  }

  showMessage(text) {
    this.message.textContent = text;
    this.messageTimer = 2.5;
  }

  update(delta) {
    if (this.messageTimer > 0) {
      this.messageTimer -= delta;
      if (this.messageTimer <= 0) {
        this.message.textContent = '';
      }
    }
  }
}

class Chunk {
  constructor(chunkX, chunkZ) {
    this.chunkX = chunkX;
    this.chunkZ = chunkZ;
    this.data = new Uint16Array(CHUNK_SIZE * WORLD_HEIGHT * CHUNK_SIZE);
    this.isDirty = true;
  }

  index(x, y, z) {
    return y * CHUNK_SIZE * CHUNK_SIZE + z * CHUNK_SIZE + x;
  }

  inBounds(x, y, z) {
    return x >= 0 && x < CHUNK_SIZE && y >= 0 && y < WORLD_HEIGHT && z >= 0 && z < CHUNK_SIZE;
  }

  getLocal(x, y, z) {
    if (!this.inBounds(x, y, z)) return BLOCKS.AIR;
    return this.data[this.index(x, y, z)];
  }

  setLocal(x, y, z, value) {
    if (!this.inBounds(x, y, z)) return;
    this.data[this.index(x, y, z)] = value;
    this.isDirty = true;
  }

  serialize() {
    return Array.from(this.data);
  }

  static fromSerialized(chunkX, chunkZ, serialized) {
    const chunk = new Chunk(chunkX, chunkZ);
    chunk.data.set(serialized);
    chunk.isDirty = true;
    return chunk;
  }
}

class TerrainGenerator {
  getHeight(x, z) {
    const base = fractalNoise2D(x, z, 0);
    const ridge = fractalNoise2D(x, z, 1) * 8;
    return clamp(Math.floor(22 + base * 8 + ridge), 6, WORLD_HEIGHT - 12);
  }

  getHumidity(x, z) {
    return fractalNoise2D(x, z, 2);
  }

  getTemperature(x, z) {
    return fractalNoise2D(x, z, 3);
  }

  getBiome(x, z, height) {
    const humidity = this.getHumidity(x, z);
    const temperature = this.getTemperature(x, z);
    if (height <= SEA_LEVEL + 1 && humidity > 0.35) return 'wetland';
    if (temperature > 0.45 && humidity < -0.1) return 'desert';
    if (temperature < -0.35 || height > 33) return 'snow';
    if (temperature > 0.2 && humidity < -0.25 && height > 24) return 'volcanic';
    if (humidity > 0.25) return 'forest';
    if (height > 28) return 'rocky';
    return 'plains';
  }

  surfaceBlockForBiome(biome) {
    switch (biome) {
      case 'desert': return BLOCKS.SAND;
      case 'snow': return BLOCKS.SNOW;
      case 'rocky': return BLOCKS.BASALT;
      case 'volcanic': return BLOCKS.BASALT;
      case 'wetland': return BLOCKS.CLAY;
      default: return BLOCKS.GRASS;
    }
  }

  subSurfaceBlockForBiome(biome) {
    switch (biome) {
      case 'desert': return BLOCKS.SAND;
      case 'rocky':
      case 'volcanic': return BLOCKS.BASALT;
      case 'wetland': return BLOCKS.CLAY;
      default: return BLOCKS.DIRT;
    }
  }

  getVillageLayout(cellX, cellZ) {
    const seed = hash2D(cellX * 19 + 3, cellZ * 23 - 9);
    const layouts = [
      {
        path: { x0: -8, x1: 8, z0: -1, z1: 1 },
        houses: [
          { dx: -8, dz: -7, variant: 0 },
          { dx: 3, dz: -7, variant: 1 },
          { dx: -8, dz: 2, variant: 2 },
          { dx: 3, dz: 2, variant: 3 },
        ],
        farms: [
          { dx: -2, dz: -8, width: 4, depth: 3 },
          { dx: -2, dz: 5, width: 4, depth: 3 },
        ],
      },
      {
        path: { x0: -1, x1: 1, z0: -8, z1: 8 },
        houses: [
          { dx: -7, dz: -8, variant: 0 },
          { dx: 2, dz: -8, variant: 1 },
          { dx: -7, dz: 3, variant: 2 },
          { dx: 2, dz: 3, variant: 4 },
        ],
        farms: [
          { dx: -8, dz: -2, width: 3, depth: 4 },
          { dx: 5, dz: -2, width: 3, depth: 4 },
        ],
      },
      {
        path: { x0: -8, x1: 8, z0: -1, z1: 1 },
        houses: [
          { dx: -9, dz: -9, variant: 2 },
          { dx: -1, dz: -7, variant: 4 },
          { dx: 5, dz: 2, variant: 1 },
          { dx: -8, dz: 3, variant: 3 },
        ],
        farms: [
          { dx: 4, dz: -8, width: 4, depth: 3 },
          { dx: -5, dz: 5, width: 5, depth: 3 },
        ],
      },
    ];
    return layouts[Math.floor(seed * layouts.length) % layouts.length];
  }

  getStructureType(worldX, worldZ, biome) {
    const cellX = floorDiv(worldX, 32);
    const cellZ = floorDiv(worldZ, 32);
    const villageSeed = hash2D(cellX * 13 + 7, cellZ * 17 - 5);
    if ((biome === 'plains' || biome === 'forest') && villageSeed > 0.82) {
      return 'village';
    }
    const houseSeed = hash2D(worldX + 41, worldZ - 23);
    if ((biome === 'plains' || biome === 'forest') && houseSeed > 0.992) {
      return 'house';
    }
    return null;
  }

  canPlaceStructure(chunk, originX, originZ, width, depth, height) {
    if (originX < 2 || originZ < 2 || originX + width >= CHUNK_SIZE - 2 || originZ + depth >= CHUNK_SIZE - 2) {
      return false;
    }
    let minSurface = Infinity;
    let maxSurface = -Infinity;
    for (let x = originX; x < originX + width; x += 1) {
      for (let z = originZ; z < originZ + depth; z += 1) {
        let surfaceY = -1;
        for (let y = WORLD_HEIGHT - 1; y >= 0; y -= 1) {
          const block = chunk.getLocal(x, y, z);
          if (BLOCK_DEFS[block]?.solid && !BLOCK_DEFS[block]?.liquid) {
            surfaceY = y;
            break;
          }
        }
        if (surfaceY < 0) return false;
        minSurface = Math.min(minSurface, surfaceY);
        maxSurface = Math.max(maxSurface, surfaceY);
        const floorBlock = chunk.getLocal(x, surfaceY, z);
        if (!BLOCK_DEFS[floorBlock]?.solid || BLOCK_DEFS[floorBlock]?.liquid) return false;
        for (let y = surfaceY + 1; y <= surfaceY + height; y += 1) {
          if (y >= WORLD_HEIGHT || chunk.getLocal(x, y, z) !== BLOCKS.AIR) return false;
        }
      }
    }
    return maxSurface - minSurface <= 1;
  }

  fillFoundation(chunk, originX, originY, originZ, width, depth, blockId) {
    for (let x = originX; x < originX + width; x += 1) {
      for (let z = originZ; z < originZ + depth; z += 1) {
        chunk.setLocal(x, originY, z, blockId);
      }
    }
  }

  addFence(chunk, x, y, z) {
    if (!chunk.inBounds(x, y, z)) return;
    if (chunk.getLocal(x, y, z) !== BLOCKS.AIR) return;
    chunk.setLocal(x, y, z, BLOCKS.WOOD);
    if (chunk.inBounds(x, y + 1, z) && chunk.getLocal(x, y + 1, z) === BLOCKS.AIR) {
      chunk.setLocal(x, y + 1, z, BLOCKS.WOOD);
    }
  }

  buildFarmPatch(chunk, originX, surfaceY, originZ, width, depth) {
    if (!this.canPlaceStructure(chunk, originX, originZ, width, depth, 2)) return false;
    for (let x = originX; x < originX + width; x += 1) {
      for (let z = originZ; z < originZ + depth; z += 1) {
        const edge = x === originX || x === originX + width - 1 || z === originZ || z === originZ + depth - 1;
        chunk.setLocal(x, surfaceY + 1, z, edge ? BLOCKS.WOOD : BLOCKS.DIRT);
        if (!edge && (x + z) % 2 === 0 && chunk.inBounds(x, surfaceY + 2, z)) {
          chunk.setLocal(x, surfaceY + 2, z, BLOCKS.LEAVES);
        }
      }
    }
    const waterX = originX + Math.floor(width / 2);
    const waterZ = originZ + Math.floor(depth / 2);
    chunk.setLocal(waterX, surfaceY + 1, waterZ, BLOCKS.WATER);
    return true;
  }

  buildLamp(chunk, x, surfaceY, z, height = 3) {
    if (!chunk.inBounds(x, surfaceY + height + 1, z)) return;
    chunk.setLocal(x, surfaceY + 1, z, BLOCKS.BRICK);
    for (let y = surfaceY + 2; y <= surfaceY + height; y += 1) {
      chunk.setLocal(x, y, z, BLOCKS.WOOD);
    }
    chunk.setLocal(x, surfaceY + height + 1, z, BLOCKS.LAVA);
    if (chunk.inBounds(x, surfaceY + height, z - 1) && chunk.getLocal(x, surfaceY + height, z - 1) === BLOCKS.AIR) chunk.setLocal(x, surfaceY + height, z - 1, BLOCKS.WOOD);
    if (chunk.inBounds(x, surfaceY + height, z + 1) && chunk.getLocal(x, surfaceY + height, z + 1) === BLOCKS.AIR) chunk.setLocal(x, surfaceY + height, z + 1, BLOCKS.WOOD);
  }

  buildHouse(chunk, originX, surfaceY, originZ, variant = 0) {
    const width = 5 + (variant % 2);
    const depth = 5 + (variant % 3 === 0 ? 1 : 0);
    const height = 4 + (variant % 2);
    if (!this.canPlaceStructure(chunk, originX, originZ, width, depth, height + 2)) return false;

    const foundationBlock = variant % 2 === 0 ? BLOCKS.BRICK : BLOCKS.DIRT;
    const wallBlock = variant % 3 === 0 ? BLOCKS.BRICK : BLOCKS.PLANKS;
    const roofBlock = variant % 2 === 0 ? BLOCKS.WOOD : BLOCKS.BRICK;
    const doorSide = variant % 4;
    const door = [
      { x: originX + Math.floor(width / 2), z: originZ },
      { x: originX + width - 1, z: originZ + Math.floor(depth / 2) },
      { x: originX + Math.floor(width / 2), z: originZ + depth - 1 },
      { x: originX, z: originZ + Math.floor(depth / 2) },
    ][doorSide];

    this.fillFoundation(chunk, originX - 1, surfaceY, originZ - 1, width + 2, depth + 2, foundationBlock);

    for (let x = originX; x < originX + width; x += 1) {
      for (let z = originZ; z < originZ + depth; z += 1) {
        chunk.setLocal(x, surfaceY + 1, z, BLOCKS.PLANKS);
      }
    }

    for (let y = surfaceY + 2; y <= surfaceY + height; y += 1) {
      for (let x = originX; x < originX + width; x += 1) {
        for (let z = originZ; z < originZ + depth; z += 1) {
          const edge = x === originX || x === originX + width - 1 || z === originZ || z === originZ + depth - 1;
          if (!edge) continue;
          const isCorner = (x === originX || x === originX + width - 1) && (z === originZ || z === originZ + depth - 1);
          chunk.setLocal(x, y, z, isCorner ? BLOCKS.WOOD : wallBlock);
        }
      }
    }

    chunk.setLocal(door.x, surfaceY + 2, door.z, BLOCKS.AIR);
    chunk.setLocal(door.x, surfaceY + 3, door.z, BLOCKS.AIR);

    const windowY = surfaceY + 3;
    const windows = [
      [originX, originZ + Math.floor(depth / 2)],
      [originX + width - 1, originZ + Math.floor(depth / 2)],
      [originX + Math.floor(width / 2), originZ],
      [originX + Math.floor(width / 2), originZ + depth - 1],
    ];
    windows.forEach(([x, z], index) => {
      if (index !== doorSide && chunk.inBounds(x, windowY, z)) {
        chunk.setLocal(x, windowY, z, BLOCKS.AIR);
      }
    });

    for (let x = originX - 1; x <= originX + width; x += 1) {
      for (let z = originZ - 1; z <= originZ + depth; z += 1) {
        if (!chunk.inBounds(x, surfaceY + height + 1, z)) continue;
        const edge = x === originX - 1 || x === originX + width || z === originZ - 1 || z === originZ + depth;
        chunk.setLocal(x, surfaceY + height + 1, z, edge ? roofBlock : BLOCKS.PLANKS);
      }
    }

    if (variant % 2 === 0) {
      const ridgeZ = originZ + Math.floor(depth / 2);
      for (let x = originX; x < originX + width; x += 1) {
        if (chunk.inBounds(x, surfaceY + height + 2, ridgeZ)) {
          chunk.setLocal(x, surfaceY + height + 2, ridgeZ, roofBlock);
        }
      }
    }

    const pathStep = { x: 0, z: 0 };
    if (doorSide === 0) pathStep.z = -1;
    if (doorSide === 1) pathStep.x = 1;
    if (doorSide === 2) pathStep.z = 1;
    if (doorSide === 3) pathStep.x = -1;
    for (let step = 1; step <= 3; step += 1) {
      const px = door.x + pathStep.x * step;
      const pz = door.z + pathStep.z * step;
      if (chunk.inBounds(px, surfaceY + 1, pz)) {
        chunk.setLocal(px, surfaceY + 1, pz, BLOCKS.DIRT);
      }
    }

    const yardMinX = Math.max(1, originX - 2);
    const yardMaxX = Math.min(CHUNK_SIZE - 2, originX + width + 1);
    const yardMinZ = Math.max(1, originZ - 2);
    const yardMaxZ = Math.min(CHUNK_SIZE - 2, originZ + depth + 1);
    for (let x = yardMinX; x <= yardMaxX; x += 1) {
      this.addFence(chunk, x, surfaceY + 1, yardMinZ);
      this.addFence(chunk, x, surfaceY + 1, yardMaxZ);
    }
    for (let z = yardMinZ; z <= yardMaxZ; z += 1) {
      this.addFence(chunk, yardMinX, surfaceY + 1, z);
      this.addFence(chunk, yardMaxX, surfaceY + 1, z);
    }
    this.addFence(chunk, door.x + pathStep.x * 2, surfaceY + 1, door.z + pathStep.z * 2);
    chunk.setLocal(door.x + pathStep.x * 2, surfaceY + 1, door.z + pathStep.z * 2, BLOCKS.AIR);
    chunk.setLocal(door.x + pathStep.x * 2, surfaceY + 2, door.z + pathStep.z * 2, BLOCKS.AIR);

    if (variant % 3 !== 1) {
      const farmX = doorSide === 1 ? originX - 4 : originX + width + 1;
      const farmZ = originZ + 1;
      if (farmX > 1 && farmX + 3 < CHUNK_SIZE - 1) {
        this.buildFarmPatch(chunk, farmX, surfaceY, farmZ, 3, Math.max(3, depth - 1));
      }
    }

    this.buildLamp(chunk, yardMinX + 1, surfaceY, yardMinZ + 1, 2 + (variant % 2));
    this.buildLamp(chunk, yardMaxX - 1, surfaceY, yardMaxZ - 1, 2 + ((variant + 1) % 2));
    chunk.setLocal(originX + width - 2, surfaceY + 2, originZ + depth - 2, BLOCKS.CRAFTING_TABLE);
    return true;
  }

  buildVillage(chunk, centerX, surfaceY, centerZ) {
    const layout = this.getVillageLayout(chunk.chunkX, chunk.chunkZ);
    let built = 0;

    for (const house of layout.houses) {
      const houseX = centerX + house.dx;
      const houseZ = centerZ + house.dz;
      if (houseX < 1 || houseZ < 1 || houseX + 8 >= CHUNK_SIZE || houseZ + 8 >= CHUNK_SIZE) continue;
      if (this.buildHouse(chunk, houseX, surfaceY, houseZ, house.variant + Math.floor(hash2D(chunk.chunkX + house.dx, chunk.chunkZ + house.dz) * 2))) {
        built += 1;
      }
    }

    if (!built) return false;

    for (let x = centerX + layout.path.x0; x <= centerX + layout.path.x1; x += 1) {
      for (let z = centerZ + layout.path.z0; z <= centerZ + layout.path.z1; z += 1) {
        if (chunk.inBounds(x, surfaceY + 1, z)) chunk.setLocal(x, surfaceY + 1, z, BLOCKS.DIRT);
      }
    }

    for (const farm of layout.farms) {
      this.buildFarmPatch(chunk, centerX + farm.dx, surfaceY, centerZ + farm.dz, farm.width, farm.depth);
    }

    this.buildLamp(chunk, centerX + layout.path.x0 + 1, surfaceY, centerZ + layout.path.z0 + 1, 3);
    this.buildLamp(chunk, centerX + layout.path.x1 - 1, surfaceY, centerZ + layout.path.z1 - 1, 3);
    return true;
  }

  growTree(chunk, localX, surfaceY, localZ, biome, worldX, worldZ) {
    const trunkHeight = biome === 'forest' ? 4 + Math.floor(hash2D(worldX, worldZ) * 2) : 3 + Math.floor(hash2D(worldX + 7, worldZ) * 2);
    for (let trunk = 1; trunk <= trunkHeight; trunk += 1) {
      chunk.setLocal(localX, surfaceY + trunk, localZ, BLOCKS.WOOD);
    }

    const canopyY = surfaceY + trunkHeight;
    const radius = biome === 'forest' ? 2 : 1;
    for (let dx = -radius; dx <= radius; dx += 1) {
      for (let dz = -radius; dz <= radius; dz += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
          const dist = Math.abs(dx) + Math.abs(dz) + Math.abs(dy);
          if (dist > (biome === 'forest' ? 4 : 3)) continue;
          const x = localX + dx;
          const y = canopyY + dy;
          const z = localZ + dz;
          if (chunk.inBounds(x, y, z) && chunk.getLocal(x, y, z) === BLOCKS.AIR) {
            chunk.setLocal(x, y, z, BLOCKS.LEAVES);
          }
        }
      }
    }
  }

  fillChunk(chunk) {
    const { chunkX, chunkZ } = chunk;
    for (let x = 0; x < CHUNK_SIZE; x += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        const worldX = chunkX * CHUNK_SIZE + x;
        const worldZ = chunkZ * CHUNK_SIZE + z;
        const surface = this.getHeight(worldX, worldZ);
        const biome = this.getBiome(worldX, worldZ, surface);
        const topBlock = this.surfaceBlockForBiome(biome);
        const soilBlock = this.subSurfaceBlockForBiome(biome);

        for (let y = 0; y <= surface; y += 1) {
          if (y === surface) chunk.setLocal(x, y, z, topBlock);
          else if (y >= surface - 3) chunk.setLocal(x, y, z, soilBlock);
          else chunk.setLocal(x, y, z, biome === 'volcanic' ? BLOCKS.BASALT : BLOCKS.STONE);
        }

        if (surface < SEA_LEVEL && biome !== 'volcanic') {
          for (let y = surface + 1; y <= SEA_LEVEL; y += 1) {
            chunk.setLocal(x, y, z, BLOCKS.WATER);
          }
        }

        if (biome === 'volcanic' && hash2D(worldX * 2, worldZ * 2) > 0.96) {
          chunk.setLocal(x, surface + 1, z, BLOCKS.LAVA);
        }

        const structureType = this.getStructureType(worldX, worldZ, biome);
        if (structureType === 'village' && x === 8 && z === 8 && surface > SEA_LEVEL + 1) {
          this.buildVillage(chunk, x, surface, z);
        } else if (structureType === 'house' && x > 3 && x < CHUNK_SIZE - 8 && z > 3 && z < CHUNK_SIZE - 8 && surface > SEA_LEVEL + 1) {
          this.buildHouse(chunk, x, surface, z, Math.floor(hash2D(worldX, worldZ) * 5));
        }

        const treeChance = hash2D(worldX + 19, worldZ - 13);
        if ((biome === 'forest' && treeChance > 0.86) || (biome === 'plains' && treeChance > 0.965)) {
          if (x > 2 && x < CHUNK_SIZE - 3 && z > 2 && z < CHUNK_SIZE - 3 && surface > SEA_LEVEL + 1) {
            this.growTree(chunk, x, surface, z, biome, worldX, worldZ);
          }
        }
      }
    }
  }
}

class ChunkMeshBuilder {
  constructor(textureAtlas) {
    this.textureAtlas = textureAtlas;
  }

  resolveTile(blockId, faceName) {
    const def = BLOCK_DEFS[blockId];
    if (!def?.tex) return this.textureAtlas.tileMap.dirt;
    const tileName = def.tex[faceName] || def.tex.side || def.tex.all || 'dirt';
    return this.textureAtlas.tileMap[tileName];
  }

  addFace(target, face, tileIndex, baseX, baseY, baseZ, topScale = 1) {
    const uv = tileUvs(tileIndex, this.textureAtlas.columns, this.textureAtlas.rows);
    const [u0, v0, u1, v1] = uv;
    const corners = face.corners.map((corner) => {
      if (topScale !== 1 && corner[1] === 1) {
        return [corner[0], topScale, corner[2]];
      }
      return corner;
    });
    const brightness = face.name === 'top' ? 1 : face.name === 'bottom' ? 0.68 : face.dir[2] !== 0 ? 0.84 : 0.76;

    corners.forEach((corner) => {
      target.positions.push(baseX + corner[0], baseY + corner[1], baseZ + corner[2]);
      target.colors.push(brightness, brightness, brightness);
    });

    target.uvs.push(u0, v0, u1, v0, u1, v1, u0, v1);
    target.indices.push(
      target.vertexOffset,
      target.vertexOffset + 1,
      target.vertexOffset + 2,
      target.vertexOffset,
      target.vertexOffset + 2,
      target.vertexOffset + 3,
    );
    target.vertexOffset += 4;
  }

  build(world, chunk) {
    const solid = { positions: [], uvs: [], indices: [], colors: [], vertexOffset: 0 };
    const liquid = { positions: [], uvs: [], indices: [], colors: [], vertexOffset: 0 };

    for (let y = 0; y < WORLD_HEIGHT; y += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        for (let x = 0; x < CHUNK_SIZE; x += 1) {
          const blockId = chunk.getLocal(x, y, z);
          const blockDef = BLOCK_DEFS[blockId];
          if (!blockDef || blockId === BLOCKS.AIR) continue;

          const worldX = chunk.chunkX * CHUNK_SIZE + x;
          const worldZ = chunk.chunkZ * CHUNK_SIZE + z;
          const target = blockDef.liquid ? liquid : solid;

          for (const face of FACE_DEFS) {
            const neighborId = world.getBlock(worldX + face.dir[0], y + face.dir[1], worldZ + face.dir[2]);
            const neighborDef = BLOCK_DEFS[neighborId];
            if (blockDef.liquid) {
              if (neighborId === blockId) continue;
              if (!face.dir[1] && neighborDef?.liquid) continue;
            } else if (neighborDef?.solid && !neighborDef.liquid) {
              continue;
            }

            const topScale = blockDef.liquid ? 0.86 : 1;
            this.addFace(target, face, this.resolveTile(blockId, face.name), worldX, y, worldZ, topScale);
          }
        }
      }
    }

    const makeGeometry = (target) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(target.positions, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(target.uvs, 2));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(target.colors, 3));
      geometry.setIndex(target.indices);
      geometry.computeVertexNormals();
      return geometry;
    };

    return {
      solidGeometry: makeGeometry(solid),
      liquidGeometry: makeGeometry(liquid),
    };
  }
}

class World {
  constructor(scene, textureAtlas) {
    this.scene = scene;
    this.generator = new TerrainGenerator();
    this.meshBuilder = new ChunkMeshBuilder(textureAtlas);
    this.chunks = new Map();
    this.chunkMeshes = new Map();
    this.pendingModified = new Set();
    this.solidMaterial = new THREE.MeshLambertMaterial({ map: textureAtlas.texture, vertexColors: true });
    this.liquidMaterial = new THREE.MeshLambertMaterial({ map: textureAtlas.texture, transparent: true, opacity: 0.78, depthWrite: false, color: new THREE.Color('#9fd6ff') });
  }

  key(chunkX, chunkZ) {
    return `${chunkX},${chunkZ}`;
  }

  getChunk(chunkX, chunkZ) {
    return this.chunks.get(this.key(chunkX, chunkZ));
  }

  ensureChunk(chunkX, chunkZ) {
    const key = this.key(chunkX, chunkZ);
    if (this.chunks.has(key)) return this.chunks.get(key);
    const chunk = new Chunk(chunkX, chunkZ);
    this.generator.fillChunk(chunk);
    this.chunks.set(key, chunk);
    return chunk;
  }

  loadSerializedChunks(serializedChunks) {
    for (const item of serializedChunks) {
      const key = this.key(item.chunkX, item.chunkZ);
      this.chunks.set(key, Chunk.fromSerialized(item.chunkX, item.chunkZ, item.data));
      this.pendingModified.add(key);
    }
  }

  ensureChunksAround(position) {
    const centerChunkX = floorDiv(Math.floor(position.x), CHUNK_SIZE);
    const centerChunkZ = floorDiv(Math.floor(position.z), CHUNK_SIZE);
    for (let dz = -RENDER_DISTANCE; dz <= RENDER_DISTANCE; dz += 1) {
      for (let dx = -RENDER_DISTANCE; dx <= RENDER_DISTANCE; dx += 1) {
        this.ensureChunk(centerChunkX + dx, centerChunkZ + dz);
      }
    }

    for (const chunk of this.chunks.values()) {
      if (chunk.isDirty) this.rebuildChunkMesh(chunk.chunkX, chunk.chunkZ);
    }
  }

  getBlock(x, y, z) {
    if (y < 0 || y >= WORLD_HEIGHT) return BLOCKS.AIR;
    const chunkX = floorDiv(x, CHUNK_SIZE);
    const chunkZ = floorDiv(z, CHUNK_SIZE);
    const chunk = this.getChunk(chunkX, chunkZ);
    if (!chunk) return BLOCKS.AIR;
    return chunk.getLocal(positiveModulo(x, CHUNK_SIZE), y, positiveModulo(z, CHUNK_SIZE));
  }

  setBlock(x, y, z, blockId) {
    if (y < 0 || y >= WORLD_HEIGHT) return false;
    const chunkX = floorDiv(x, CHUNK_SIZE);
    const chunkZ = floorDiv(z, CHUNK_SIZE);
    const chunk = this.ensureChunk(chunkX, chunkZ);
    const localX = positiveModulo(x, CHUNK_SIZE);
    const localZ = positiveModulo(z, CHUNK_SIZE);
    chunk.setLocal(localX, y, localZ, blockId);
    this.pendingModified.add(this.key(chunkX, chunkZ));
    this.rebuildChunkMesh(chunkX, chunkZ);
    return true;
  }

  rebuildChunkMesh(chunkX, chunkZ) {
    const chunk = this.getChunk(chunkX, chunkZ);
    if (!chunk) return;
    const key = this.key(chunkX, chunkZ);
    const existing = this.chunkMeshes.get(key);
    if (existing) {
      if (existing.solid) {
        this.scene.remove(existing.solid);
        existing.solid.geometry.dispose();
      }
      if (existing.liquid) {
        this.scene.remove(existing.liquid);
        existing.liquid.geometry.dispose();
      }
    }

    const built = this.meshBuilder.build(this, chunk);
    const result = { solid: null, liquid: null };

    if (built.solidGeometry.attributes.position.count > 0) {
      result.solid = new THREE.Mesh(built.solidGeometry, this.solidMaterial);
      this.scene.add(result.solid);
    } else {
      built.solidGeometry.dispose();
    }

    if (built.liquidGeometry.attributes.position.count > 0) {
      result.liquid = new THREE.Mesh(built.liquidGeometry, this.liquidMaterial);
      this.scene.add(result.liquid);
    } else {
      built.liquidGeometry.dispose();
    }

    this.chunkMeshes.set(key, result);
    chunk.isDirty = false;
  }

  isSolidAt(x, y, z) {
    const block = BLOCK_DEFS[this.getBlock(x, y, z)];
    return Boolean(block && block.solid && !block.liquid);
  }

  isLiquidAt(x, y, z) {
    return Boolean(BLOCK_DEFS[this.getBlock(x, y, z)]?.liquid);
  }

  getSurfaceY(x, z) {
    for (let y = WORLD_HEIGHT - 1; y >= 0; y -= 1) {
      const blockId = this.getBlock(x, y, z);
      if (BLOCK_DEFS[blockId]?.solid && !BLOCK_DEFS[blockId]?.liquid) return y;
    }
    return 0;
  }

  raycast(origin, direction, maxDistance = 6, step = 0.05) {
    const position = origin.clone();
    let previousCell = null;
    for (let traveled = 0; traveled <= maxDistance; traveled += step) {
      position.copy(origin).addScaledVector(direction, traveled);
      const cell = new THREE.Vector3(Math.floor(position.x), Math.floor(position.y), Math.floor(position.z));
      if (!previousCell || !cell.equals(previousCell)) {
        const blockId = this.getBlock(cell.x, cell.y, cell.z);
        if (blockId !== BLOCKS.AIR) {
          return { hit: true, block: cell.clone(), previous: previousCell ? previousCell.clone() : null, blockId };
        }
        previousCell = cell.clone();
      }
    }
    return { hit: false, block: null, previous: null, blockId: BLOCKS.AIR };
  }

  collectSaveData() {
    const chunks = [];
    for (const [key, chunk] of this.chunks.entries()) {
      if (!this.pendingModified.has(key)) continue;
      chunks.push({ chunkX: chunk.chunkX, chunkZ: chunk.chunkZ, data: chunk.serialize() });
    }
    return chunks;
  }
}

class PlayerController {
  constructor(camera, canvas, world) {
    this.camera = camera;
    this.canvas = canvas;
    this.world = world;
    this.position = new THREE.Vector3(0, 34, 0);
    this.velocity = new THREE.Vector3();
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.keys = new Set();
    this.isLocked = false;
    this.onGround = false;
    this.controlsEnabled = true;
    this.health = 20;
    this.damageCooldown = 0;
    this.setupEvents();
  }

  setupEvents() {
    document.addEventListener('keydown', (event) => this.keys.add(event.code));
    document.addEventListener('keyup', (event) => this.keys.delete(event.code));
    document.addEventListener('mousemove', (event) => {
      if (!this.isLocked || !this.controlsEnabled) return;
      this.euler.y -= event.movementX * 0.0022;
      this.euler.x -= event.movementY * 0.0022;
      this.euler.x = clamp(this.euler.x, -Math.PI / 2, Math.PI / 2);
    });
    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === this.canvas;
    });
  }

  requestLock() {
    if (this.canvas.requestPointerLock && this.controlsEnabled) this.canvas.requestPointerLock();
  }

  setControlsEnabled(enabled) {
    this.controlsEnabled = enabled;
    if (!enabled && document.pointerLockElement === this.canvas) {
      document.exitPointerLock?.();
    }
  }

  getForwardVector() {
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.euler.y);
    return forward;
  }

  getRightVector() {
    const right = new THREE.Vector3(1, 0, 0);
    right.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.euler.y);
    return right;
  }

  getFeetPosition() {
    return this.position.clone();
  }

  getEyePosition() {
    return this.position.clone().add(new THREE.Vector3(0, EYE_HEIGHT, 0));
  }

  collidesAt(position) {
    const minX = Math.floor(position.x - PLAYER_WIDTH / 2);
    const maxX = Math.floor(position.x + PLAYER_WIDTH / 2);
    const minY = Math.floor(position.y);
    const maxY = Math.floor(position.y + PLAYER_HEIGHT - 0.001);
    const minZ = Math.floor(position.z - PLAYER_WIDTH / 2);
    const maxZ = Math.floor(position.z + PLAYER_WIDTH / 2);
    for (let x = minX; x <= maxX; x += 1) {
      for (let y = minY; y <= maxY; y += 1) {
        for (let z = minZ; z <= maxZ; z += 1) {
          if (this.world.isSolidAt(x, y, z)) return true;
        }
      }
    }
    return false;
  }

  moveAxis(axis, amount) {
    if (!amount) return;
    const testPosition = this.position.clone();
    testPosition[axis] += amount;
    if (!this.collidesAt(testPosition)) {
      this.position.copy(testPosition);
      return;
    }
    const step = Math.sign(amount) * 0.05;
    let moved = 0;
    while (Math.abs(moved + step) <= Math.abs(amount)) {
      testPosition.copy(this.position);
      testPosition[axis] += moved + step;
      if (this.collidesAt(testPosition)) break;
      moved += step;
    }
    this.position[axis] += moved;
  }

  applyDamage(amount) {
    if (this.damageCooldown > 0) return false;
    this.health = clamp(this.health - amount, 0, 20);
    this.damageCooldown = 1;
    if (this.health <= 0) {
      this.health = 20;
      this.position.set(0, 34, 0);
      this.velocity.set(0, 0, 0);
      return true;
    }
    return false;
  }

  update(delta) {
    const moveDirection = new THREE.Vector3();
    const forward = this.getForwardVector();
    const right = this.getRightVector();
    forward.y = 0;
    right.y = 0;
    forward.normalize();
    right.normalize();

    if (this.controlsEnabled) {
      if (this.keys.has('KeyW')) moveDirection.add(forward);
      if (this.keys.has('KeyS')) moveDirection.sub(forward);
      if (this.keys.has('KeyD')) moveDirection.add(right);
      if (this.keys.has('KeyA')) moveDirection.sub(right);
    }

    const inWater = this.world.getBlock(Math.floor(this.position.x), Math.floor(this.position.y + 0.7), Math.floor(this.position.z)) === BLOCKS.WATER;
    const inLava = this.world.getBlock(Math.floor(this.position.x), Math.floor(this.position.y + 0.7), Math.floor(this.position.z)) === BLOCKS.LAVA;
    const speedMultiplier = inWater ? 0.45 : 1;
    if (moveDirection.lengthSq() > 0) moveDirection.normalize().multiplyScalar(MOVE_SPEED * speedMultiplier);

    this.velocity.x = moveDirection.x;
    this.velocity.z = moveDirection.z;

    if (this.controlsEnabled && this.onGround && this.keys.has('Space')) {
      this.velocity.y = inWater ? 4.5 : JUMP_SPEED;
      this.onGround = false;
    }

    const gravityScale = inWater ? 0.3 : 1;
    if (!this.onGround) this.velocity.y -= GRAVITY * gravityScale * delta;
    if (this.controlsEnabled && (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'))) {
      this.velocity.y -= (inWater ? 2 : 12) * delta;
    }

    if (inWater) {
      this.velocity.y = Math.max(this.velocity.y, -2.2);
    }

    this.moveAxis('x', this.velocity.x * delta);
    this.moveAxis('z', this.velocity.z * delta);
    const previousY = this.position.y;
    this.moveAxis('y', this.velocity.y * delta);
    if (this.position.y === previousY && this.velocity.y < 0) {
      this.onGround = true;
      this.velocity.y = 0;
    } else if (this.position.y !== previousY) {
      this.onGround = false;
    }

    this.position.y = clamp(this.position.y, 1, WORLD_HEIGHT + 10);
    this.camera.position.copy(this.getEyePosition());
    this.camera.rotation.copy(this.euler);

    if (this.damageCooldown > 0) this.damageCooldown -= delta;
    if (inLava) this.applyDamage(1);
  }
}

class EntityManager {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.entities = [];
    this.damageTexts = [];
    this.spawnTimer = 0;
  }

  serialize() {
    return this.entities.map((entity) => ({
      type: entity.type,
      x: entity.position.x,
      y: entity.position.y,
      z: entity.position.z,
      health: entity.health,
    }));
  }

  restore(data) {
    if (!Array.isArray(data)) return;
    data.forEach((entry) => {
      if (ENTITY_TYPES[entry.type]) {
        this.spawnEntity(entry.type, new THREE.Vector3(entry.x, entry.y, entry.z), entry.health);
      }
    });
  }

  createDamageTextSprite(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 96;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.strokeText(text, 48, 24);
    ctx.fillStyle = '#ffd54a';
    ctx.fillText(text, 48, 24);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.9, 0.45, 1);
    return { sprite, texture };
  }

  spawnDamageText(entity, damage) {
    const text = this.createDamageTextSprite(`-${damage}`);
    text.sprite.position.copy(entity.position).add(new THREE.Vector3(0, 2.35, 0));
    this.scene.add(text.sprite);
    this.damageTexts.push({ sprite: text.sprite, texture: text.texture, life: 0.7 });
  }

  createMesh(type, maxHealth) {
    const def = ENTITY_TYPES[type];
    const group = new THREE.Group();
    const material = new THREE.MeshLambertMaterial({ color: def.color });

    if (def.body === 'quadruped') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.6), material);
      body.position.y = 0.9;
      group.add(body);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), material);
      head.position.set(0.45, 1.0, 0);
      group.add(head);
    } else if (def.body === 'villager') {
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.95, 0.42), material);
      torso.position.y = 1.0;
      group.add(torso);
      const robe = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.5), new THREE.MeshLambertMaterial({ color: '#7b5c44' }));
      robe.position.y = 0.55;
      group.add(robe);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), new THREE.MeshLambertMaterial({ color: '#e7c39f' }));
      head.position.set(0, 1.72, 0);
      group.add(head);
      const nose = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.12), new THREE.MeshLambertMaterial({ color: '#d6a782' }));
      nose.position.set(0, 1.65, 0.24);
      group.add(nose);
    } else if (def.body === 'humanoid') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.42), material);
      body.position.y = 0.95;
      group.add(body);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);
      head.position.set(0, 1.6, 0);
      group.add(head);
    } else {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.85), material);
      body.position.y = 0.75;
      group.add(body);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);
      head.position.set(0, 1.35, 0);
      group.add(head);
    }

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 128;
    labelCanvas.height = 48;
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.minFilter = THREE.LinearFilter;
    labelTexture.magFilter = THREE.LinearFilter;
    const labelMaterial = new THREE.SpriteMaterial({ map: labelTexture, transparent: true, depthTest: false });
    const healthSprite = new THREE.Sprite(labelMaterial);
    healthSprite.position.set(0, def.body === 'villager' ? 2.45 : 2.15, 0);
    healthSprite.scale.set(1.8, 0.68, 1);
    group.add(healthSprite);

    this.updateHealthSprite({ health: maxHealth, def: { health: maxHealth, name: def.name }, healthSprite, labelCanvas, labelTexture });
    return { group, healthSprite, labelCanvas, labelTexture };
  }

  updateHealthSprite(entity) {
    const canvas = entity.labelCanvas;
    const ctx = canvas.getContext('2d');
    const ratio = clamp(entity.health / entity.def.health, 0, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.58)';
    ctx.fillRect(8, 6, 112, 36);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.strokeRect(8, 6, 112, 36);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${entity.def.name} ${entity.health}/${entity.def.health}`, 64, 20);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(16, 26, 96, 8);
    ctx.fillStyle = ratio > 0.5 ? '#72e36a' : ratio > 0.25 ? '#ffd54a' : '#ff6b6b';
    ctx.fillRect(16, 26, 96 * ratio, 8);
    entity.labelTexture.needsUpdate = true;
  }

  spawnEntity(type, position, healthOverride = null) {
    const def = ENTITY_TYPES[type];
    const health = healthOverride ?? def.health;
    const meshData = this.createMesh(type, def.health);
    const entity = {
      type,
      def,
      position: position.clone(),
      velocity: new THREE.Vector3(),
      mesh: meshData.group,
      healthSprite: meshData.healthSprite,
      labelCanvas: meshData.labelCanvas,
      labelTexture: meshData.labelTexture,
      health,
      wanderTimer: 0,
      direction: new THREE.Vector3(1, 0, 0),
      attackCooldown: 0,
      hitFlashTimer: 0,
      knockback: new THREE.Vector3(),
    };
    this.updateHealthSprite(entity);
    entity.mesh.position.copy(entity.position);
    this.scene.add(entity.mesh);
    this.entities.push(entity);
  }

  removeEntity(entity) {
    this.scene.remove(entity.mesh);
    entity.mesh.traverse((child) => {
      if (child.isMesh) child.geometry.dispose();
      if (child.isMesh && child.material?.emissive) child.material.emissive.setHex(0x000000);
      if (child.isSprite) child.material.dispose();
      if (child.material?.dispose) child.material.dispose();
    });
    entity.labelTexture?.dispose();
    this.entities = this.entities.filter((item) => item !== entity);
  }

  awardDrops(entity, inventory, hud) {
    if (!entity.def.dropId) return;
    const [minDrop, maxDrop] = entity.def.dropCountRange || [1, 1];
    const count = randomRangeInt(minDrop, maxDrop, entity.position.x + entity.position.z + entity.health);
    const added = inventory.addItem(entity.def.dropId, count);
    const itemName = ITEM_DEFS[entity.def.dropId]?.name || '物品';
    hud.showMessage(added ? `击败 ${entity.def.name}，获得 ${itemName} x${count}` : `击败 ${entity.def.name}，背包已满`);
  }

  spawnVillageResidents(player) {
    const villagerCount = this.entities.filter((entity) => entity.type === 'villager').length;
    if (villagerCount >= 5) return;
    const px = Math.floor(player.position.x / CHUNK_SIZE) * CHUNK_SIZE;
    const pz = Math.floor(player.position.z / CHUNK_SIZE) * CHUNK_SIZE;
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dz = -1; dz <= 1; dz += 1) {
        const centerX = px + dx * CHUNK_SIZE + 8;
        const centerZ = pz + dz * CHUNK_SIZE + 8;
        const biome = this.world.generator.getBiome(centerX, centerZ, this.world.generator.getHeight(centerX, centerZ));
        if (this.world.generator.getStructureType(centerX, centerZ, biome) !== 'village') continue;
        const existingNear = this.entities.some((entity) => entity.type === 'villager' && entity.position.distanceToSquared(new THREE.Vector3(centerX, entity.position.y, centerZ)) < 36);
        if (existingNear) continue;
        const spawnY = this.world.getSurfaceY(centerX, centerZ) + 1;
        this.spawnEntity('villager', new THREE.Vector3(centerX + 0.5, spawnY, centerZ + 0.5));
      }
    }
  }

  trySpawnAroundPlayer(player, daylight) {
    this.spawnTimer -= 1;
    if (this.spawnTimer > 0 || this.entities.length > 14) return;
    this.spawnTimer = 180;
    this.spawnVillageResidents(player);
    const angle = Math.random() * Math.PI * 2;
    const distance = 12 + Math.random() * 18;
    const x = Math.floor(player.position.x + Math.cos(angle) * distance);
    const z = Math.floor(player.position.z + Math.sin(angle) * distance);
    const y = this.world.getSurfaceY(x, z) + 1;
    const type = daylight > 0.45 ? (Math.random() > 0.5 ? 'sheep' : 'pig') : (Math.random() > 0.5 ? 'zombie' : 'slime');
    if (Math.abs(x - player.position.x) < 6 && Math.abs(z - player.position.z) < 6) return;
    this.spawnEntity(type, new THREE.Vector3(x + 0.5, y, z + 0.5));
  }

  update(delta, player, daylight, inventory, hud) {
    this.trySpawnAroundPlayer(player, daylight);

    for (const text of [...this.damageTexts]) {
      text.life -= delta;
      text.sprite.position.y += delta * 1.4;
      text.sprite.material.opacity = clamp(text.life / 0.7, 0, 1);
      text.sprite.quaternion.copy(player.camera.quaternion);
      if (text.life <= 0) {
        this.scene.remove(text.sprite);
        text.sprite.material.dispose();
        text.texture.dispose();
        this.damageTexts = this.damageTexts.filter((item) => item !== text);
      }
    }

    for (const entity of [...this.entities]) {
      const dx = player.position.x - entity.position.x;
      const dz = player.position.z - entity.position.z;
      const dist = Math.hypot(dx, dz);

      if (dist > ENTITY_RENDER_DISTANCE) {
        this.removeEntity(entity);
        continue;
      }

      entity.wanderTimer -= delta;
      if (entity.def.hostile && daylight < 0.45 && dist < 16) {
        entity.direction.set(dx, 0, dz).normalize();
      } else if (entity.def.avoidPlayer && dist < 4) {
        entity.direction.set(-dx, 0, -dz).normalize();
      } else if (entity.wanderTimer <= 0) {
        entity.wanderTimer = 2 + Math.random() * 3;
        entity.direction.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
      }

      if (entity.knockback.lengthSq() > 0.0001) {
        entity.position.addScaledVector(entity.knockback, delta * 6);
        entity.knockback.multiplyScalar(Math.max(0, 1 - delta * 7));
      }

      entity.position.x += entity.direction.x * entity.def.speed * delta;
      entity.position.z += entity.direction.z * entity.def.speed * delta;
      entity.position.y = this.world.getSurfaceY(Math.floor(entity.position.x), Math.floor(entity.position.z)) + 1;
      entity.mesh.position.copy(entity.position);
      entity.healthSprite.quaternion.copy(player.camera.quaternion);
      entity.mesh.lookAt(entity.position.x + entity.direction.x, entity.position.y, entity.position.z + entity.direction.z);

      entity.mesh.traverse((child) => {
        if (!child.isMesh || !child.material?.emissive) return;
        child.material.emissive.setHex(entity.hitFlashTimer > 0 ? 0x662222 : 0x000000);
      });

      if (entity.hitFlashTimer > 0) {
        entity.hitFlashTimer -= delta;
      }

      if (entity.def.hostile) {
        entity.attackCooldown -= delta;
        if (dist < 1.5 && entity.attackCooldown <= 0) {
          player.applyDamage(entity.def.damage);
          entity.attackCooldown = 1.2;
        }
      }

      const blockBelow = this.world.getBlock(Math.floor(entity.position.x), Math.floor(entity.position.y - 0.2), Math.floor(entity.position.z));
      if (blockBelow === BLOCKS.LAVA) {
        entity.health = 0;
      }

      if (entity.health <= 0) {
        this.awardDrops(entity, inventory, hud);
        this.removeEntity(entity);
      }
    }
  }

  attackClosest(origin, direction) {
    let best = null;
    let bestDistance = 2.5;
    for (const entity of this.entities) {
      const toEntity = entity.position.clone().sub(origin);
      const projection = toEntity.dot(direction);
      if (projection < 0 || projection > 4) continue;
      const closestPoint = origin.clone().addScaledVector(direction, projection);
      const distance = closestPoint.distanceTo(entity.position);
      if (distance < 0.9 && projection < bestDistance) {
        best = entity;
        bestDistance = projection;
      }
    }
    if (best) {
      const damage = 2;
      const knockback = direction.clone().setY(0).normalize().multiplyScalar(0.7);
      best.health = clamp(best.health - damage, 0, best.def.health);
      best.hitFlashTimer = 0.18;
      best.knockback = knockback;
      this.spawnDamageText(best, damage);
      this.updateHealthSprite(best);
      return { entity: best, damage, remainingHealth: best.health };
    }
    return null;
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.overlay = document.getElementById('overlay');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.textureAtlas = createTextureAtlas();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    this.clock = new THREE.Clock();
    this.saveManager = new SaveManager();
    this.recipeBook = new RecipeBook();
    this.inventory = new Inventory();
    this.craftSmall = new CraftingState(2);
    this.craftLarge = new CraftingState(3);
    this.world = new World(this.scene, this.textureAtlas);
    this.player = new PlayerController(this.camera, this.canvas, this.world);
    this.entities = new EntityManager(this.scene, this.world);
    this.hud = new HUD(this.textureAtlas);
    this.hud.buildStaticUi(this.inventory, this.craftSmall, this.craftLarge);

    this.timeOfDay = 0.22;
    this.daylight = 1;
    this.lastSaveAt = 0;
    this.hasRestoredSave = false;
    this.activePanel = null;
    this.targetInfo = null;
    this.mineState = { key: null, progress: 0 };
    this.leftMouseDown = false;
    this.scene.background = new THREE.Color('#87ceeb');
    this.scene.fog = new THREE.Fog('#87ceeb', 26, 138);

    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.72);
    this.directionalLight = new THREE.DirectionalLight('#fff7d6', 1.15);
    this.directionalLight.position.set(30, 60, 20);
    this.torchLights = [];
    this.scene.add(this.ambientLight, this.directionalLight);

    this.restoreSave();
    this.bindEvents();
    this.refreshUi();
  }

  restoreSave() {
    const save = this.saveManager.load();
    if (!save) return;
    if (Array.isArray(save.chunks)) this.world.loadSerializedChunks(save.chunks);
    if (save.player) {
      this.player.position.set(save.player.x, save.player.y, save.player.z);
      this.player.euler.set(save.player.pitch, save.player.yaw, 0, 'YXZ');
      this.player.health = save.player.health ?? 20;
      this.hasRestoredSave = true;
    }
    if (save.inventory) this.inventory.restore(save.inventory);
    if (save.craftSmall) this.craftSmall.restore(save.craftSmall);
    if (save.craftLarge) this.craftLarge.restore(save.craftLarge);
    if (typeof save.timeOfDay === 'number') this.timeOfDay = save.timeOfDay;
    if (Array.isArray(save.entities)) this.entities.restore(save.entities);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    this.overlay.addEventListener('click', () => this.player.requestLock());

    document.addEventListener('pointerlockchange', () => {
      this.overlay.classList.toggle('hidden', this.player.isLocked || Boolean(this.activePanel));
    });

    document.addEventListener('mousedown', (event) => {
      if (this.activePanel) return;
      if (!this.player.isLocked) return;
      if (event.button === 0) {
        this.leftMouseDown = true;
      }
      if (event.button === 2) {
        this.handleRightClick();
      }
    });

    document.addEventListener('mouseup', (event) => {
      if (event.button === 0) {
        this.leftMouseDown = false;
        this.resetMining();
      }
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());

    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyE') {
        event.preventDefault();
        if (this.activePanel === 'craftingTable') {
          this.closePanels();
        } else {
          this.toggleInventoryPanel();
        }
        return;
      }

      if (event.code === 'Escape' && this.activePanel) {
        this.closePanels();
        return;
      }

      if (this.activePanel) return;

      const slotIndex = Number(event.key) - 1;
      if (slotIndex >= 0 && slotIndex < HOTBAR_SIZE) {
        this.inventory.selectedHotbarIndex = slotIndex;
        this.refreshUi();
      }
    });

    this.hud.inventoryGrid.addEventListener('click', (event) => {
      const slot = event.target.closest('.inventory-item');
      if (!slot) return;
      this.handleInventorySlotClick(Number(slot.dataset.index));
    });

    this.hud.craftingTableInventoryGrid.addEventListener('click', (event) => {
      const slot = event.target.closest('.inventory-item');
      if (!slot) return;
      this.handleInventorySlotClick(Number(slot.dataset.index));
    });

    this.hud.craftGridSmall.addEventListener('click', (event) => {
      const slot = event.target.closest('.craft-slot');
      if (!slot) return;
      this.craftSmall.activeIndex = Number(slot.dataset.index);
      this.refreshUi();
    });

    this.hud.craftGridLarge.addEventListener('click', (event) => {
      const slot = event.target.closest('.craft-slot');
      if (!slot) return;
      this.craftLarge.activeIndex = Number(slot.dataset.index);
      this.refreshUi();
    });

    this.hud.craftGridSmall.addEventListener('contextmenu', (event) => {
      const slot = event.target.closest('.craft-slot');
      if (!slot) return;
      event.preventDefault();
      this.takeBackFromCraft(this.craftSmall, Number(slot.dataset.index));
    });

    this.hud.craftGridLarge.addEventListener('contextmenu', (event) => {
      const slot = event.target.closest('.craft-slot');
      if (!slot) return;
      event.preventDefault();
      this.takeBackFromCraft(this.craftLarge, Number(slot.dataset.index));
    });

    this.hud.craftResultSmall.addEventListener('click', () => this.craftResult(this.craftSmall));
    this.hud.craftResultLarge.addEventListener('click', () => this.craftResult(this.craftLarge));

    this.hud.hotbar.addEventListener('click', (event) => {
      const slot = event.target.closest('.hotbar-slot');
      if (!slot) return;
      this.inventory.selectedHotbarIndex = Number(slot.dataset.index);
      this.refreshUi();
    });
  }

  toggleInventoryPanel() {
    if (this.activePanel === 'inventory') {
      this.closePanels();
      return;
    }
    this.activePanel = 'inventory';
    this.player.setControlsEnabled(false);
    this.hud.showInventory(true);
    this.hud.showCraftingTable(false);
    this.overlay.classList.add('hidden');
    this.refreshUi();
  }

  openCraftingTable() {
    this.activePanel = 'craftingTable';
    this.player.setControlsEnabled(false);
    this.hud.showInventory(false);
    this.hud.showCraftingTable(true);
    this.overlay.classList.add('hidden');
    this.refreshUi();
  }

  closePanels() {
    this.activePanel = null;
    this.player.setControlsEnabled(true);
    this.hud.showInventory(false);
    this.hud.showCraftingTable(false);
    this.overlay.classList.toggle('hidden', this.player.isLocked);
    this.refreshUi();
  }

  getActiveCraftState() {
    return this.activePanel === 'craftingTable' ? this.craftLarge : this.craftSmall;
  }

  handleInventorySlotClick(index) {
    const item = this.inventory.getSlot(index);
    if (!this.activePanel || !item) return;
    const craft = this.getActiveCraftState();
    if (!craft) return;
    const craftSlot = craft.slots[craft.activeIndex];
    if (craftSlot && craftSlot.id !== item.id) return;
    if (!this.inventory.removeFromSlot(index, 1)) return;
    if (!craft.slots[craft.activeIndex]) {
      craft.slots[craft.activeIndex] = { id: item.id, count: 0 };
    }
    craft.slots[craft.activeIndex].count += 1;
    this.refreshUi();
  }

  takeBackFromCraft(craftState, index) {
    const slot = craftState.slots[index];
    if (!slot) return;
    this.inventory.addItem(slot.id, slot.count);
    craftState.slots[index] = null;
    this.refreshUi();
  }

  craftResult(craftState) {
    const recipe = this.recipeBook.match(craftState.slots, craftState.size);
    if (!recipe) return;
    if (!this.inventory.addItem(recipe.output.id, recipe.output.count)) {
      this.hud.showMessage('背包已满');
      return;
    }
    craftState.slots = craftState.slots.map((slot) => {
      if (!slot) return null;
      const next = { ...slot, count: slot.count - 1 };
      return next.count > 0 ? next : null;
    });
    this.hud.showMessage(`合成获得 ${ITEM_DEFS[recipe.output.id].name} x${recipe.output.count}`);
    this.refreshUi();
  }

  getSelectedPlaceableBlock() {
    const itemId = this.inventory.getSelectedItemId();
    return ITEM_DEFS[itemId]?.placeBlock ?? null;
  }

  handleRightClick() {
    if (!this.targetInfo?.hit) return;
    if (this.targetInfo.blockId === BLOCKS.CRAFTING_TABLE) {
      this.openCraftingTable();
      return;
    }

    const placeBlock = this.getSelectedPlaceableBlock();
    if (!placeBlock || !this.targetInfo.previous) {
      this.hud.showMessage('当前物品不可放置');
      return;
    }

    const pos = this.targetInfo.previous;
    if (!Physics.canPlaceBlock(this.player, pos.x, pos.y, pos.z, this.world)) {
      this.hud.showMessage('这里不能放置');
      return;
    }

    if (!this.inventory.removeFromSlot(this.inventory.selectedHotbarIndex, 1)) {
      this.hud.showMessage('物品数量不足');
      return;
    }

    this.world.setBlock(pos.x, pos.y, pos.z, placeBlock);
    this.hud.showMessage(`已放置 ${BLOCK_DEFS[placeBlock].name}`);
    this.refreshUi();
  }

  updateTarget() {
    const eye = this.player.getEyePosition();
    const direction = this.camera.getWorldDirection(new THREE.Vector3());
    this.targetInfo = this.world.raycast(eye, direction);

    let targetEntity = null;
    let bestDistance = 4;
    for (const entity of this.entities.entities) {
      const toEntity = entity.position.clone().sub(eye);
      const projection = toEntity.dot(direction);
      if (projection < 0 || projection > 4) continue;
      const closestPoint = eye.clone().addScaledVector(direction, projection);
      const distance = closestPoint.distanceTo(entity.position);
      if (distance < 0.9 && projection < bestDistance) {
        bestDistance = projection;
        targetEntity = entity;
      }
    }

    if (targetEntity) {
      this.targetInfo.entity = targetEntity;
    }
  }

  attackEntityOrMine(delta) {
    if (!this.leftMouseDown || this.activePanel || !this.player.isLocked) {
      this.resetMining();
      return;
    }

    const direction = this.camera.getWorldDirection(new THREE.Vector3());
    const attacked = this.entities.attackClosest(this.player.getEyePosition(), direction);
    if (attacked) {
      this.hud.showMessage(`攻击 ${attacked.entity.def.name} -${attacked.damage}，剩余 ${attacked.remainingHealth}/${attacked.entity.def.health}`);
      this.resetMining();
      this.leftMouseDown = false;
      return;
    }

    if (!this.targetInfo?.hit) {
      this.resetMining();
      return;
    }

    const blockId = this.targetInfo.blockId;
    const def = BLOCK_DEFS[blockId];
    if (!def || !def.solid || def.hardness <= 0) {
      this.resetMining();
      return;
    }

    const key = blockKey(this.targetInfo.block.x, this.targetInfo.block.y, this.targetInfo.block.z);
    if (this.mineState.key !== key) {
      this.mineState.key = key;
      this.mineState.progress = 0;
    }

    this.mineState.progress += delta / def.hardness;
    this.hud.setMineProgress(this.mineState.progress);
    if (this.mineState.progress >= 1) {
      this.world.setBlock(this.targetInfo.block.x, this.targetInfo.block.y, this.targetInfo.block.z, BLOCKS.AIR);
      if (def.itemId) this.inventory.addItem(def.itemId, 1);
      this.hud.showMessage(`已挖掘 ${def.name}`);
      this.resetMining();
      this.refreshUi();
    }
  }

  resetMining() {
    this.mineState.key = null;
    this.mineState.progress = 0;
    this.hud.setMineProgress(0);
  }

  updateDayNight(delta) {
    this.timeOfDay = (this.timeOfDay + delta / DAY_LENGTH) % 1;
    const cycle = this.timeOfDay * Math.PI * 2;
    const sunHeight = Math.sin(cycle - Math.PI / 2);
    this.daylight = clamp((sunHeight + 0.15) / 1.15, 0, 1);
    const warmGlow = clamp(1 - Math.abs(this.daylight - 0.35) / 0.22, 0, 1);
    const sky = mixColor(mixColor('#050913', '#ff9a5c', warmGlow * 0.45), '#87ceeb', this.daylight);
    const fog = mixColor(mixColor('#0c1220', '#ffb36f', warmGlow * 0.32), '#d8efff', this.daylight);

    this.scene.background.copy(sky);
    this.scene.fog.color.copy(fog);
    this.scene.fog.near = lerp(16, 26, this.daylight);
    this.scene.fog.far = lerp(92, 138, this.daylight);
    this.ambientLight.intensity = lerp(0.22, 0.9, this.daylight);
    this.ambientLight.color.copy(mixColor('#8ea1ff', '#fff4d6', this.daylight));
    this.directionalLight.intensity = lerp(0.08, 1.28, this.daylight);
    this.directionalLight.color.copy(mixColor('#ff9e63', '#fff5d8', clamp(this.daylight + warmGlow * 0.2, 0, 1)));
    this.directionalLight.position.set(Math.cos(cycle) * 70, lerp(-10, 70, this.daylight), Math.sin(cycle) * 35);

    let phase = '夜晚';
    if (this.daylight > 0.75) phase = '白天';
    else if (this.daylight > 0.45) phase = '清晨';
    else if (this.daylight > 0.2) phase = '黄昏';
    this.hud.setTimeLabel(`时间：${phase} ${(this.timeOfDay * 24).toFixed(1)}h`);
  }

  refreshUi() {
    this.hud.refreshInventory(this.inventory);
    this.hud.refreshCraftGrid(this.craftSmall, this.hud.craftSmallSlots);
    this.hud.refreshCraftGrid(this.craftLarge, this.hud.craftLargeSlots);
    this.hud.refreshCraftResult(this.hud.craftResultSmall, this.recipeBook.match(this.craftSmall.slots, this.craftSmall.size));
    this.hud.refreshCraftResult(this.hud.craftResultLarge, this.recipeBook.match(this.craftLarge.slots, this.craftLarge.size));
    this.hud.setHealth(this.player.health);
    this.hud.setMode(`模式：生存${this.activePanel ? ' / 交互中' : ''}`);

    if (this.targetInfo?.entity) {
      this.hud.setTargetLabel(`目标：${this.targetInfo.entity.def.name}\n生命：${this.targetInfo.entity.health}/${this.targetInfo.entity.def.health}`);
    } else if (this.targetInfo?.hit) {
      const def = BLOCK_DEFS[this.targetInfo.blockId];
      this.hud.setTargetLabel(`方块：${def.name}\n硬度：${def.hardness}\n坐标：${this.targetInfo.block.x}, ${this.targetInfo.block.y}, ${this.targetInfo.block.z}`);
    } else {
      this.hud.setTargetLabel('');
    }
  }

  saveIfNeeded(elapsed) {
    if (elapsed - this.lastSaveAt < 3) return;
    this.lastSaveAt = elapsed;
    this.saveManager.save({
      player: {
        x: this.player.position.x,
        y: this.player.position.y,
        z: this.player.position.z,
        pitch: this.player.euler.x,
        yaw: this.player.euler.y,
        health: this.player.health,
      },
      inventory: this.inventory.serialize(),
      craftSmall: this.craftSmall.serialize(),
      craftLarge: this.craftLarge.serialize(),
      timeOfDay: this.timeOfDay,
      entities: this.entities.serialize(),
      chunks: this.world.collectSaveData(),
    });
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  start() {
    this.onResize();
    this.world.ensureChunksAround(this.player.position);
    if (!this.hasRestoredSave) {
      this.player.position.set(0, this.world.getSurfaceY(0, 0) + 2, 0);
    }
    const animate = () => {
      requestAnimationFrame(animate);
      this.tick();
    };
    animate();
  }

  tick() {
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.elapsedTime;

    this.world.ensureChunksAround(this.player.position);
    this.player.update(delta);
    this.updateTarget();
    this.attackEntityOrMine(delta);
    this.updateDayNight(delta);
    this.entities.update(delta, this.player, this.daylight, this.inventory, this.hud);
    this.hud.update(delta);
    this.refreshUi();

    const selectedItem = this.inventory.getSelectedItemId();
    this.hud.setDebug([
      `坐标: ${this.player.position.x.toFixed(1)}, ${this.player.position.y.toFixed(1)}, ${this.player.position.z.toFixed(1)}`,
      `当前物品: ${selectedItem ? ITEM_DEFS[selectedItem].name : '空'}`,
      `锁定: ${this.targetInfo?.hit ? `${this.targetInfo.block.x}, ${this.targetInfo.block.y}, ${this.targetInfo.block.z}` : '无'}`,
      `区块: ${this.world.chunks.size}`,
      `实体: ${this.entities.entities.length}`,
      `背包: E / 挖掘: 长按左键`,
    ]);

    this.saveIfNeeded(elapsed);
    this.renderer.render(this.scene, this.camera);
  }
}

class Physics {
  static canPlaceBlock(player, x, y, z, world) {
    const minX = player.position.x - 0.3;
    const maxX = player.position.x + 0.3;
    const minY = player.position.y;
    const maxY = player.position.y + 1.8;
    const minZ = player.position.z - 0.3;
    const maxZ = player.position.z + 0.3;
    const overlaps = !(maxX <= x || minX >= x + 1 || maxY <= y || minY >= y + 1 || maxZ <= z || minZ >= z + 1);
    return !overlaps && !world.isSolidAt(x, y, z) && !world.isLiquidAt(x, y, z);
  }
}

window.addEventListener('load', () => {
  const game = new Game();
  game.start();
});
