/*
 * Dandelions puzzle game
 * Copyright (c) 2025 Jacob Humphreys
 * All rights reserved.
 */

// main.js - Main application entry point
import { GridManager } from './modules/GridManager.js';
import { CellManager } from './modules/CellManager.js';
import { CompassManager } from './modules/CompassManager.js';
import { CONFIG } from './modules/Config.js';
import { Utils } from './modules/Utils.js';
import { WindManager } from './modules/windManager.js';

class DandelionsApp {
    constructor() {
        this.gridManager = null;
        this.cellManager = null;
        this.compassManager = null;
        this.windManager = null;
        this.initialize();
    }

    initialize() {
        // Initialize grid manager
        this.gridManager = new GridManager('tile-container');
        // Initialize cell manager
        this.cellManager = new CellManager(this.gridManager);
        // Create the initial grid
        this.gridManager.createGrid();
        // Initialize compass manager
        this.compassManager = new CompassManager('compass-container');

        // Initialize wind manager
        this.windManager = new WindManager(this.cellManager);

        console.log('Dandelions application initialized');

        // Game loop
        this.gameLoop();
    }

    gameLoop() {
        return; // Placeholder for future game loop logic
    }

    setupShortcuts() {
        // Listen for custom events from grid cells
        document.addEventListener('gridCellClick', (e) => {
            const { cell, button } = e.detail;
            
            switch(button) {
                case CONFIG.MOUSE_BUTTONS.LEFT:
                    this.cellManager.setSeedCell(cell);
                    break;
                case CONFIG.MOUSE_BUTTONS.MIDDLE:
                    this.cellManager.clearAll();
                    break;
                case CONFIG.MOUSE_BUTTONS.RIGHT:
                    this.cellManager.setFlowerCell(cell);
                    break;
            }
        });

        // Listen for custom events from compass cells
        document.addEventListener('compassClick', (e) => {
            const { direction } = e.detail;
            this.handleCompassClick(direction);
        });
    }

    handleCompassClick(direction) {     
        // Map compass directions to wind directions
        const directionMap = {
            'N': 'north',
            'S': 'south', 
            'E': 'east',
            'W': 'west',
            'NE': 'northeast',
            'NW': 'northwest', 
            'SE': 'southeast',
            'SW': 'southwest'
        };
        
        const windDirection = directionMap[direction];
        if (windDirection) {
            this.windManager.blowWind(windDirection);
        }
    }

    
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dandelionsApp = new DandelionsApp();
    window.dandelionsApp.setupShortcuts();
});

// Export for potential external use
export { DandelionsApp };