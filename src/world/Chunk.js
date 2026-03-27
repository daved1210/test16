import { CHUNK_SIZE, WORLD_HEIGHT, BLOCKS } from './constants.js';

export class Chunk {
  constructor(chunkX, chunkZ) {
    this.chunkX = chunkX;
    this.chunkZ = chunkZ;
    this.data = new Uint8Array(CHUNK_SIZE * WORLD_HEIGHT * CHUNK_SIZE);
    this.isDirty = true;
  }

  index(x, y, z) {
    return y * CHUNK_SIZE * CHUNK_SIZE + z * CHUNK_SIZE + x;
  }

  inBounds(x, y, z) {
    return x >= 0 && x < CHUNK_SIZE && y >= 0 && y < WORLD_HEIGHT && z >= 0 && z < CHUNK_SIZE;
  }

  getLocal(x, y, z) {
    if (!this.inBounds(x, y, z)) {
      return BLOCKS.AIR;
    }

    return this.data[this.index(x, y, z)];
  }

  setLocal(x, y, z, value) {
    if (!this.inBounds(x, y, z)) {
      return;
    }

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
