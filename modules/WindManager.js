import { CONFIG } from "./Config.js";
import { Utils } from "./Utils.js";

// WindManager.js - Handles wind effects on cells
// This class will manage the wind effects on the grid cells, allowing for directional blowing of seeds and flowers.

export class WindManager {
  constructor(cellManager) {
    this.cellManager = cellManager;
    this.blowWind = this.blowWind.bind(this);
  }

  getWindDirection(direction) {
    const directions = {
      north: { x: 0, y: -1 },
      south: { x: 0, y: 1 },
      east: { x: 1, y: 0 },
      west: { x: -1, y: 0 },
      northeast: { x: 1, y: -1 },
      northwest: { x: -1, y: -1 },
      southeast: { x: 1, y: 1 },
      southwest: { x: -1, y: 1 },
    };
    return directions[direction] || { x: 0, y: 0 };
  }

  blowWind(windDirection) {
    if (!windDirection) return;
    
    console.log(`blowWind called with: ${windDirection}`); // DEBUG
    console.log(`Number of flowers on grid: ${this.cellManager.flowerCells.size}`); // DEBUG
    
    const direction = this.getWindDirection(windDirection);
    console.log(`Converted to direction object:`, direction); // DEBUG

    this.cellManager.flowerCells.forEach(async (cell) => {
      console.log(`Processing flower cell:`, cell); // DEBUG
      let activePosition = this.cellManager.gridManager.getCellPosition(cell);
      console.log(`Starting position:`, activePosition); // DEBUG

      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 175));
        activePosition.y += direction.y;
        activePosition.x += direction.x;
        let targetCell = this.cellManager.gridManager.getCellAtPosition(
          activePosition.x,
          activePosition.y
        );

        if (!targetCell) break; // Hit grid boundary

        if (
          this.cellManager.isFlower(targetCell) ||
          this.cellManager.isSeed(targetCell)
        ) {
          continue; // Skip flowers and seeds
        }

        if (Utils.isValidCell(targetCell)) {
          console.log(`Setting seed at position:`, activePosition); // DEBUG
          this.cellManager.setSeedCell(targetCell);
        }
      }
    });
  }
}
