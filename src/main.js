import { Game } from './game/Game.js';

const canvas = document.getElementById('game-canvas');
const overlay = document.getElementById('overlay');
const game = new Game({
  canvas,
  overlay,
  hudElements: {
    debug: document.getElementById('debug'),
    message: document.getElementById('message'),
    hotbar: document.getElementById('hotbar'),
  },
});

game.start();
