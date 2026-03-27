# Voxel World Survival

[中文](README.md) | [English](README.en.md)

A browser-based 3D voxel survival game built with **HTML + Three.js**.
The goal is to provide a Minecraft-like experience that works directly in the browser.

Repository: <https://github.com/daved1210/test16>

## Highlights

- No build step required. The core version runs directly from `index.html`
- Frontend-only local save system using `localStorage`
- Procedural voxel terrain generation
- Multiple biomes: plains, forest, desert, snow, wetland, volcanic areas
- Survival loop: mining, block placement, inventory, hotbar, 2x2 / 3x3 crafting
- Entity system: sheep, pigs, villagers, zombies, slimes
- Combat feedback: instant damage, hit flash, knockback, floating damage text, HP bars
- Structure generation: houses, villages, fences, farmland, courtyards, lamp posts
- Day-night cycle, fog effects, texture detail, and basic lighting atmosphere

## Run Online / Locally

### Option 1: Open Directly

Double-click `index.html` to run.

> Note: Some browsers enforce stricter interaction, pointer lock, and asset loading rules under `file://`.
> If anything behaves unexpectedly, use the local static server option below.

### Option 2: Local Static Server (Recommended)

Run this in the project directory:

```bash
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

## Controls

- `Click screen`: start game / lock cursor
- `W A S D`: move
- `Space`: jump
- `Shift`: descend
- `Hold left mouse`: mine blocks
- `Left click entity`: attack
- `Right click`: place block / open crafting table
- `1 ~ 9`: switch hotbar slot
- `E`: open inventory
- `Esc`: close current panel

## Current Gameplay Content

### 1. World and Terrain

- Chunk-based voxel world
- Procedural terrain height generation
- Surface materials switch automatically by biome
- Natural content such as trees, lava, and water
- Houses and villages generate automatically in suitable areas

### 2. Survival and Building

- Mine resources such as grass, dirt, stone, wood, and sand
- Place mined resources back into the world to build
- Hotbar and full inventory support
- 2x2 inventory crafting and 3x3 crafting table crafting

### 3. Combat and Entities

- Passive mobs during daytime: sheep, pigs, villagers
- Hostile mobs at night: zombies, slimes
- Entities include:
  - Health points
  - Overhead health bars
  - Instant damage feedback
  - Hit flash effect
  - Knockback
  - Death drops

### 4. HUD and Interaction

- Crosshair target info
- Mining progress bar
- Health display
- Time / mode display
- Debug info panel
- Message prompts

## Project Structure

```text
test16/
├─ index.html          # Entry page
├─ app.js              # Current main version logic (core implementation)
├─ styles/
│  └─ main.css         # UI and HUD styles
├─ vendor/
│  └─ three.min.js     # Three.js
└─ src/                # Reserved / modularized source directory
```

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Three.js

## Save Data

The game automatically saves the following to browser local storage:

- Player position and HP
- Inventory contents
- Crafting grid state
- World modifications
- Time progression
- Entity states

To start fresh, clear the site's `localStorage` in your browser.

## What This Project Is Good For

- Three.js / WebGL learning practice
- Voxel world and chunk system exploration
- Browser game prototyping
- Minecraft-like gameplay experiments

## Possible Next Extensions

- More blocks and crafting recipes
- Tool system (pickaxes, axes, weapons)
- Real torch point lights
- More complete villager AI behavior
- Animal drops and food system
- More structure templates and underground structures
- Sound effects, ambience, and footsteps
- Mobile adaptation

## License

No standalone license is currently declared in this repository.
If you plan long-term public maintenance, consider adding a `LICENSE` file.
