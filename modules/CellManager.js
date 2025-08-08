// CellManager.js - Handles cell states (start, end, obstacles)
import { CONFIG } from './Config.js';
import { Utils } from './Utils.js';

export class CellManager {
  constructor(gridManager) {
    this.gridManager = gridManager;
    this.seedCells = new Set();
    this.flowerCells = new Set();
  }

  clearCell(cell) {
    if (!Utils.isValidCell(cell)) return;
    
    Utils.clearCellBackground(cell);
    this.seedCells.delete(cell);
    this.flowerCells.delete(cell);
  }

  setSeedCell(cell) {
    if (!Utils.isValidCell(cell)) return;
    
    if (this.isSeed(cell)) {
      this.removeSeed(cell);
    } else {
      if (this.isFlower(cell)) this.removeFlower(cell);
      this.addSeed(cell);
      this.setRandomImage(cell, CONFIG.IMAGES.SEEDS);
    }
  }

  setFlowerCell(cell) {
    if (!Utils.isValidCell(cell)) return false;
    
    // Check if cell is already occupied by a seed or flower
    if (this.isSeed(cell) || this.isFlower(cell)) {
      console.log('Cannot place flower on occupied cell!');
      return false; // Reject placement on occupied cells
    }
    
    // Cell is empty, place the flower
    this.addFlower(cell);
    this.setRandomImage(cell, CONFIG.IMAGES.FLOWERS);
    return true; // Successfully placed flower
  }

  setRandomImage(cell, images) {
    const randomImage = Utils.getRandomItem(images);
    cell.style.backgroundImage = randomImage;
  }

  removeSeed(cell) {
    cell.classList.remove("seed");
    cell.style.backgroundImage = "";
    this.seedCells.delete(cell);
  }

  removeFlower(cell) {
    cell.classList.remove("flower");
    cell.style.backgroundImage = "";
    this.flowerCells.delete(cell);
  }

  isSeed(cell) {
    return cell.classList.contains("seed");
  }

  isFlower(cell) {
    return cell.classList.contains("flower");
  }

  addFlower(cell) {
    cell.classList.add("flower");
    this.flowerCells.add(cell);
  }

  addSeed(cell) {
    cell.classList.add("seed");
    this.seedCells.add(cell);
  }

  clearAll() {
    for (const cell of this.gridManager.cells) {
      this.clearCell(cell);
    }
  }

  getSeedCells() {
    return Array.from(this.seedCells);
  }

  getFlowerCells() {
    return Array.from(this.flowerCells);
  }

  // Legacy method names for backward compatibility
  addRandomSeedImages(cell) {
    this.setRandomImage(cell, CONFIG.IMAGES.SEEDS);
  }

  addRandomFlowerImages(cell) {
    this.setRandomImage(cell, CONFIG.IMAGES.FLOWERS);
  }
}
