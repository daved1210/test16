import * as THREE from 'three';
import { WORLD_HEIGHT } from '../world/constants.js';

const PLAYER_WIDTH = 0.6;
const PLAYER_HEIGHT = 1.8;
const EYE_HEIGHT = 1.62;
const GRAVITY = 24;
const JUMP_SPEED = 8.5;
const MOVE_SPEED = 5.4;

export class PlayerController {
  constructor(camera, canvas, world) {
    this.camera = camera;
    this.canvas = canvas;
    this.world = world;
    this.position = new THREE.Vector3(0, 30, 0);
    this.velocity = new THREE.Vector3();
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.keys = new Set();
    this.isLocked = false;
    this.onGround = false;
    this.selectedBlockIndex = 0;
    this.setupEvents();
  }

  setupEvents() {
    document.addEventListener('keydown', (event) => {
      this.keys.add(event.code);
    });

    document.addEventListener('keyup', (event) => {
      this.keys.delete(event.code);
    });

    document.addEventListener('mousemove', (event) => {
      if (!this.isLocked) {
        return;
      }
      this.euler.y -= event.movementX * 0.0022;
      this.euler.x -= event.movementY * 0.0022;
      this.euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.euler.x));
    });

    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === this.canvas;
    });
  }

  requestLock() {
    this.canvas.requestPointerLock();
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

  selectHotbarSlot(index) {
    this.selectedBlockIndex = index;
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
          if (this.world.isSolidAt(x, y, z)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  moveAxis(axis, amount) {
    if (amount === 0) {
      return;
    }

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
      if (this.collidesAt(testPosition)) {
        break;
      }
      moved += step;
    }

    this.position[axis] += moved;
  }

  update(delta) {
    const moveDirection = new THREE.Vector3();
    const forward = this.getForwardVector();
    const right = this.getRightVector();
    forward.y = 0;
    right.y = 0;
    forward.normalize();
    right.normalize();

    if (this.keys.has('KeyW')) moveDirection.add(forward);
    if (this.keys.has('KeyS')) moveDirection.sub(forward);
    if (this.keys.has('KeyD')) moveDirection.add(right);
    if (this.keys.has('KeyA')) moveDirection.sub(right);

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize().multiplyScalar(MOVE_SPEED);
    }

    this.velocity.x = moveDirection.x;
    this.velocity.z = moveDirection.z;

    if (this.onGround && this.keys.has('Space')) {
      this.velocity.y = JUMP_SPEED;
      this.onGround = false;
    }

    if (!this.onGround) {
      this.velocity.y -= GRAVITY * delta;
    }

    if (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')) {
      this.velocity.y -= 12 * delta;
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

    this.position.y = Math.max(1, Math.min(WORLD_HEIGHT + 10, this.position.y));

    this.camera.position.copy(this.getEyePosition());
    this.camera.rotation.copy(this.euler);
  }
}
