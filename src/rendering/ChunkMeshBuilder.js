import * as THREE from 'three';
import { BLOCK_DEFS, FACE_DEFS } from '../world/constants.js';

function hexToColorComponents(hex, shade) {
  const color = new THREE.Color(hex);
  return [color.r * shade, color.g * shade, color.b * shade];
}

export class ChunkMeshBuilder {
  build(world, chunk) {
    const positions = [];
    const colors = [];
    const indices = [];
    let vertexOffset = 0;

    for (let y = 0; y < world.worldHeight; y += 1) {
      for (let z = 0; z < world.chunkSize; z += 1) {
        for (let x = 0; x < world.chunkSize; x += 1) {
          const blockId = chunk.getLocal(x, y, z);
          const blockDef = BLOCK_DEFS[blockId];

          if (!blockDef?.solid) {
            continue;
          }

          const worldX = chunk.chunkX * world.chunkSize + x;
          const worldZ = chunk.chunkZ * world.chunkSize + z;

          for (const face of FACE_DEFS) {
            const neighbor = world.getBlock(worldX + face.dir[0], y + face.dir[1], worldZ + face.dir[2]);
            if (BLOCK_DEFS[neighbor]?.solid) {
              continue;
            }

            const rgb = hexToColorComponents(blockDef.color, face.shade);
            for (const corner of face.corners) {
              positions.push(worldX + corner[0], y + corner[1], worldZ + corner[2]);
              colors.push(...rgb);
            }

            indices.push(
              vertexOffset,
              vertexOffset + 1,
              vertexOffset + 2,
              vertexOffset,
              vertexOffset + 2,
              vertexOffset + 3,
            );
            vertexOffset += 4;
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }
}
