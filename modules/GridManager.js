// GridManager.js - Handles grid creation, sizing, and DOM management
import { CONFIG } from './Config.js';

export class GridManager {
  constructor(gridContainer) {
    this.container = document.getElementById(gridContainer);
    this.cells = [];
  }

  createGrid() {
    // Use CONFIG constants for grid dimensions
    this.tilesAcross = CONFIG.TILESACROSS;
    this.tilesDown = CONFIG.TILESDOWN;

    // Get cell size from CONFIG
    const cellSize = CONFIG.CELL_SIZE;

    this.container.style.gridTemplateColumns = `repeat(${this.tilesAcross}, ${cellSize}px)`;
    this.container.style.gridTemplateRows = `repeat(${this.tilesDown}, ${cellSize}px)`;

    // Clear existing cells
    this.container.innerHTML = "";
    this.cells = [];

    // Create new cells
    for (let i = 0; i < this.tilesAcross * this.tilesDown; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;

      // Add event listeners directly to grid cells
      cell.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.handleGridCellClick(cell, e.button);
      });
      
      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      this.container.appendChild(cell);
      this.cells.push(cell);
    }

    console.log(`Created grid: ${this.tilesAcross} × ${this.tilesDown} cells`);
  }
  
  handleGridCellClick(cell, button) {
    
    // Dispatch custom event for the main app to handle
    const event = new CustomEvent('gridCellClick', {
      detail: { cell, button }
    });
    document.dispatchEvent(event);
  }

  getCellAtPosition(x, y) {
    if (x >= 0 && x < this.tilesAcross && y >= 0 && y < this.tilesDown) {
      const index = y * this.tilesAcross + x;
      return this.cells[index];
    }
    return null;
  }

  getCellPosition(cell) {
    const index = parseInt(cell.dataset.index);
    const x = index % this.tilesAcross;
    const y = Math.floor(index / this.tilesAcross);
    return { x, y, index };
  }

  getNeighbors(x, y) {
    const neighbors = [];
    const directions = [
      { dx: -1, dy: -1 }, // Northwest
      { dx: 0, dy: -1 }, // North
      { dx: 1, dy: -1 }, // Northeast
      { dx: -1, dy: 0 }, // West
      { dx: 1, dy: 0 }, // East
      { dx: -1, dy: 1 }, // Southwest
      { dx: 0, dy: 1 }, // South
      { dx: 1, dy: 1 }, // Southeast
    ];

    directions.forEach(({ dx, dy }) => {
      const newX = x + dx;
      const newY = y + dy;
      const cell = this.getCellAtPosition(newX, newY);
      if (cell) {
        neighbors.push({ cell, x: newX, y: newY });
      }
    });

    return neighbors;
  }
}
