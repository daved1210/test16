import { BLOCK_DEFS, HOTBAR_BLOCKS } from '../world/constants.js';

export class HUD {
  constructor({ debug, message, hotbar }) {
    this.debug = debug;
    this.message = message;
    this.hotbar = hotbar;
    this.messageTimer = 0;
    this.buildHotbar();
  }

  buildHotbar() {
    this.hotbar.innerHTML = '';
    HOTBAR_BLOCKS.forEach((blockId, index) => {
      const slot = document.createElement('div');
      slot.className = 'hotbar-slot';
      slot.dataset.index = index;
      slot.innerHTML = `
        <div class="hotbar-color" style="background:${BLOCK_DEFS[blockId].color}"></div>
        <div class="hotbar-key">${index + 1}</div>
        <div class="hotbar-label">${BLOCK_DEFS[blockId].name}</div>
      `;
      this.hotbar.appendChild(slot);
    });
  }

  setSelectedSlot(index) {
    [...this.hotbar.children].forEach((slot, slotIndex) => {
      slot.classList.toggle('active', slotIndex === index);
    });
  }

  setDebug(lines) {
    this.debug.innerHTML = lines.join('<br />');
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
