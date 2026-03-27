import * as THREE from 'three';
import { Chunk } from './Chunk.js';
import { TerrainGenerator } from './TerrainGenerator.js';
import { ChunkMeshBuilder } from '../rendering/ChunkMeshBuilder.js';
import { BLOCKS, BLOCK_DEFS, CHUNK_SIZE, RENDER_DISTANCE, WORLD_HEIGHT } from './constants.js';

function chunkKey(chunkX, chunkZ) {
  return `${chunkX},${chunkZ}`;
}

function floorDiv(value, divisor) {
  return Math.floor(value / divisor);
}

function positiveModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

export class World {
  constructor(scene) {
    this.scene = scene;
    this.chunkSize = CHUNK_SIZE;
    this.worldHeight = WORLD_HEIGHT;
    this.renderDistance = RENDER_DISTANCE;
    this.generator = new TerrainGenerator();
    this.meshBuilder = new ChunkMeshBuilder();
    this.chunks = new Map();
    this.chunkMeshes = new Map();
    this.pendingModified = new Set();
    this.material = new THREE.MeshLambertMaterial({ vertexColors: true });
  }

  hasChunk(chunkX, chunkZ) {
    return this.chunks.has(chunkKey(chunkX, chunkZ));
  }

  getChunk(chunkX, chunkZ) {
    return this.chunks.get(chunkKey(chunkX, chunkZ));
  }

  setChunk(chunkX, chunkZ, chunk) {
    this.chunks.set(chunkKey(chunkX, chunkZ), chunk);
  }

  ensureChunk(chunkX, chunkZ) {
    const key = chunkKey(chunkX, chunkZ);
    if (this.chunks.has(key)) {
      return this.chunks.get(key);
    }

    const chunk = new Chunk(chunkX, chunkZ);
    this.generator.fillChunk(chunk);
    this.chunks.set(key, chunk);
    return chunk;
  }

  loadSerializedChunks(serializedChunks) {
    for (const serializedChunk of serializedChunks) {
      const { chunkX, chunkZ, data } = serializedChunk;
      this.setChunk(chunkX, chunkZ, Chunk.fromSerialized(chunkX, chunkZ, data));
    }
  }

  ensureChunksAround(position) {
    const centerChunkX = floorDiv(Math.floor(position.x), this.chunkSize);
    const centerChunkZ = floorDiv(Math.floor(position.z), this.chunkSize);

    for (let dz = -this.renderDistance; dz <= this.renderDistance; dz += 1) {
      for (let dx = -this.renderDistance; dx <= this.renderDistance; dx += 1) {
        this.ensureChunk(centerChunkX + dx, centerChunkZ + dz);
      }
    }

    for (const chunk of this.chunks.values()) {
      if (chunk.isDirty) {
        this.rebuildChunkMesh(chunk.chunkX, chunk.chunkZ);
      }
    }
  }

  getBlock(x, y, z) {
    if (y < 0 || y >= this.worldHeight) {
      return BLOCKS.AIR;
    }

    const chunkX = floorDiv(x, this.chunkSize);
    const chunkZ = floorDiv(z, this.chunkSize);
    const chunk = this.getChunk(chunkX, chunkZ);
    if (!chunk) {
      return BLOCKS.AIR;
    }

    const localX = positiveModulo(x, this.chunkSize);
    const localZ = positiveModulo(z, this.chunkSize);
    return chunk.getLocal(localX, y, localZ);
  }

  setBlock(x, y, z, blockId) {
    if (y < 0 || y >= this.worldHeight) {
      return false;
    }

    const chunkX = floorDiv(x, this.chunkSize);
    const chunkZ = floorDiv(z, this.chunkSize);
    const chunk = this.ensureChunk(chunkX, chunkZ);
    const localX = positiveModulo(x, this.chunkSize);
    const localZ = positiveModulo(z, this.chunkSize);
    chunk.setLocal(localX, y, localZ, blockId);
    this.pendingModified.add(chunkKey(chunkX, chunkZ));
    this.rebuildChunkMesh(chunkX, chunkZ);

    const edgeTouches = [
      localX === 0 ? [-1, 0] : null,
      localX === this.chunkSize - 1 ? [1, 0] : null,
      localZ === 0 ? [0, -1] : null,
      localZ === this.chunkSize - 1 ? [0, 1] : null,
    ].filter(Boolean);

    for (const [dx, dz] of edgeTouches) {
      const neighbor = this.getChunk(chunkX + dx, chunkZ + dz);
      if (neighbor) {
        neighbor.isDirty = true;
        this.rebuildChunkMesh(neighbor.chunkX, neighbor.chunkZ);
      }
    }

    return true;
  }

  rebuildChunkMesh(chunkX, chunkZ) {
    const chunk = this.getChunk(chunkX, chunkZ);
    if (!chunk) {
      return;
    }

    const key = chunkKey(chunkX, chunkZ);
    const existingMesh = this.chunkMeshes.get(key);
    if (existingMesh) {
      this.scene.remove(existingMesh);
      existingMesh.geometry.dispose();
    }

    const geometry = this.meshBuilder.build(this, chunk);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    this.chunkMeshes.set(key, mesh);
    this.scene.add(mesh);
    chunk.isDirty = false;
  }

  isSolidAt(x, y, z) {
    return BLOCK_DEFS[this.getBlock(x, y, z)]?.solid ?? false;
  }

  raycast(origin, direction, maxDistance = 6, step = 0.05) {
    const position = origin.clone();
    let previousCell = null;

    for (let traveled = 0; traveled <= maxDistance; traveled += step) {
      position.copy(origin).addScaledVector(direction, traveled);
      const cell = new THREE.Vector3(
        Math.floor(position.x),
        Math.floor(position.y),
        Math.floor(position.z),
      );

      if (!previousCell || !cell.equals(previousCell)) {
        const blockId = this.getBlock(cell.x, cell.y, cell.z);
        if (BLOCK_DEFS[blockId]?.solid) {
          return {
            hit: true,
            block: cell.clone(),
            previous: previousCell ? previousCell.clone() : null,
            blockId,
          };
        }
        previousCell = cell.clone();
      }
    }

    return { hit: false, block: null, previous: null, blockId: BLOCKS.AIR };
  }

  collectSaveData() {
    const chunks = [];
    for (const [key, chunk] of this.chunks.entries()) {
      if (!this.pendingModified.has(key)) {
        continue;
      }
      chunks.push({
        chunkX: chunk.chunkX,
        chunkZ: chunk.chunkZ,
        data: chunk.serialize(),
      });
    }
    return chunks;
  }
}
