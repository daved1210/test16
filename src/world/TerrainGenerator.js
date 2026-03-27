import { CHUNK_SIZE, WORLD_HEIGHT, BLOCKS } from './constants.js';

function fractalNoise2D(x, z) {
  let total = 0;
  let amplitude = 1;
  let frequency = 0.035;
  let amplitudeSum = 0;

  for (let i = 0; i < 4; i += 1) {
    total += amplitude * Math.sin(x * frequency + i * 11.3) * Math.cos(z * frequency * 1.17 + i * 7.1);
    amplitudeSum += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return total / amplitudeSum;
}

export class TerrainGenerator {
  getHeight(x, z) {
    const base = fractalNoise2D(x, z);
    const ridge = Math.sin(x * 0.015) * 4 + Math.cos(z * 0.02) * 3;
    const height = Math.floor(22 + base * 10 + ridge);
    return Math.max(8, Math.min(WORLD_HEIGHT - 8, height));
  }

  getBlockId(x, y, z) {
    const surface = this.getHeight(x, z);

    if (y > surface) {
      return BLOCKS.AIR;
    }

    if (y === surface) {
      return surface < 18 ? BLOCKS.SAND : BLOCKS.GRASS;
    }

    if (y >= surface - 3) {
      return BLOCKS.DIRT;
    }

    return BLOCKS.STONE;
  }

  fillChunk(chunk) {
    const { chunkX, chunkZ } = chunk;

    for (let x = 0; x < CHUNK_SIZE; x += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        const worldX = chunkX * CHUNK_SIZE + x;
        const worldZ = chunkZ * CHUNK_SIZE + z;
        const surface = this.getHeight(worldX, worldZ);

        for (let y = 0; y <= surface; y += 1) {
          chunk.setLocal(x, y, z, this.getBlockId(worldX, y, worldZ));
        }

        if ((worldX * 13 + worldZ * 17) % 53 === 0 && surface > 20) {
          for (let trunk = 1; trunk <= 3; trunk += 1) {
            if (surface + trunk < WORLD_HEIGHT) {
              chunk.setLocal(x, surface + trunk, z, BLOCKS.WOOD);
            }
          }
        }
      }
    }
  }
}
