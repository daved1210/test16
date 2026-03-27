import * as THREE from 'three';
import { World } from '../world/World.js';
import { BLOCK_DEFS, HOTBAR_BLOCKS } from '../world/constants.js';
import { PlayerController } from '../player/PlayerController.js';
import { Physics } from '../player/Physics.js';
import { HUD } from '../ui/HUD.js';
import { SaveManager } from '../storage/SaveManager.js';

export class Game {
  constructor({ canvas, overlay, hudElements }) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#87ceeb');
    this.scene.fog = new THREE.Fog('#87ceeb', 30, 140);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    this.clock = new THREE.Clock();
    this.world = new World(this.scene);
    this.player = new PlayerController(this.camera, this.canvas, this.world);
    this.hud = new HUD(hudElements);
    this.saveManager = new SaveManager();
    this.lastSaveAt = 0;
    this.targetInfo = null;
    this.hasRestoredSave = false;
    this.createLights();
    this.bindEvents();
    this.restoreSave();
  }

  createLights() {
    const ambient = new THREE.AmbientLight('#ffffff', 0.72);
    const directional = new THREE.DirectionalLight('#fff7d6', 1.15);
    directional.position.set(30, 60, 20);
    this.scene.add(ambient, directional);
  }

  restoreSave() {
    const save = this.saveManager.load();
    if (!save) {
      return;
    }

    if (Array.isArray(save.chunks)) {
      this.world.loadSerializedChunks(save.chunks);
    }

    if (save.player) {
      this.player.position.set(save.player.x, save.player.y, save.player.z);
      this.player.euler.set(save.player.pitch, save.player.yaw, 0, 'YXZ');
      this.hasRestoredSave = true;
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    this.overlay.addEventListener('click', () => this.player.requestLock());

    document.addEventListener('pointerlockchange', () => {
      this.overlay.classList.toggle('visible', !this.player.isLocked);
    });

    document.addEventListener('mousedown', (event) => {
      if (!this.player.isLocked) {
        return;
      }

      if (event.button === 0) {
        this.breakBlock();
      }

      if (event.button === 2) {
        this.placeBlock();
      }
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());

    document.addEventListener('keydown', (event) => {
      const slot = Number(event.key) - 1;
      if (slot >= 0 && slot < HOTBAR_BLOCKS.length) {
        this.player.selectHotbarSlot(slot);
        this.hud.setSelectedSlot(slot);
      }
    });
  }

  breakBlock() {
    if (!this.targetInfo?.hit || !this.targetInfo.block) {
      return;
    }

    const { x, y, z } = this.targetInfo.block;
    this.world.setBlock(x, y, z, 0);
    this.hud.showMessage('已破坏方块');
  }

  placeBlock() {
    if (!this.targetInfo?.hit || !this.targetInfo.previous) {
      return;
    }

    const position = this.targetInfo.previous;
    if (!Physics.canPlaceBlock(this.world, this.player, position.x, position.y, position.z)) {
      this.hud.showMessage('这里不能放置');
      return;
    }

    this.world.setBlock(position.x, position.y, position.z, HOTBAR_BLOCKS[this.player.selectedBlockIndex]);
    this.hud.showMessage(`已放置${BLOCK_DEFS[HOTBAR_BLOCKS[this.player.selectedBlockIndex]].name}`);
  }

  updateTarget() {
    this.targetInfo = this.world.raycast(this.player.getEyePosition(), this.camera.getWorldDirection(new THREE.Vector3()));
  }

  saveIfNeeded(elapsedTime) {
    if (elapsedTime - this.lastSaveAt < 2.5) {
      return;
    }

    this.lastSaveAt = elapsedTime;
    this.saveManager.save({
      player: {
        x: this.player.position.x,
        y: this.player.position.y,
        z: this.player.position.z,
        pitch: this.player.euler.x,
        yaw: this.player.euler.y,
      },
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
    this.hud.setSelectedSlot(0);
    if (!this.hasRestoredSave) {
      this.player.position.set(0, 36, 0);
    }
    this.renderer.setAnimationLoop(() => this.tick());
  }

  tick() {
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsedTime = this.clock.elapsedTime;
    this.world.ensureChunksAround(this.player.position);
    this.player.update(delta);
    this.updateTarget();
    this.hud.update(delta);
    this.hud.setDebug([
      `坐标: ${this.player.position.x.toFixed(1)}, ${this.player.position.y.toFixed(1)}, ${this.player.position.z.toFixed(1)}`,
      `方块: ${BLOCK_DEFS[HOTBAR_BLOCKS[this.player.selectedBlockIndex]].name}`,
      `锁定: ${this.targetInfo?.hit ? `${this.targetInfo.block.x}, ${this.targetInfo.block.y}, ${this.targetInfo.block.z}` : '无'}`,
      `区块: ${this.world.chunks.size}`,
    ]);
    this.saveIfNeeded(elapsedTime);
    this.renderer.render(this.scene, this.camera);
  }
}
