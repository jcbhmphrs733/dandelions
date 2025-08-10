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
import { WindManager } from './modules/WindManager.js';
import { GameStateManager } from './modules/GameStateManager.js';
import { InstructionPanel } from './modules/InstructionPanel.js';

class DandelionsApp {
    constructor() {
        this.gridManager = null;
        this.cellManager = null;
        this.compassManager = null;
        this.windManager = null;
        this.gameStateManager = null;
        this.instructionPanel = null;
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

        // Initialize game state manager AFTER compass is created
        this.gameStateManager = new GameStateManager();

        // Initialize and show instruction panel
        this.instructionPanel = new InstructionPanel();
        this.instructionPanel.show();

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
                    // Flower placement - check if it's dandelion's turn
                    if (this.gameStateManager.canPlaceFlower()) {
                        const success = this.cellManager.setFlowerCell(cell);
                        if (success) {
                            console.log('Flower placed! Switching to wind turn.'); // DEBUG
                            console.log(`Total flowers now: ${this.cellManager.flowerCells.size}`); // DEBUG
                            this.gameStateManager.onFlowerPlaced();
                        } else {
                            console.log('Cannot place flower on occupied cell! Try an empty cell.');
                        }
                    } else {
                        console.log('Not dandelion\'s turn! Wait for your turn to place flowers.');
                    }
                    break;
                case CONFIG.MOUSE_BUTTONS.MIDDLE:
                    // Clear all (only during dandelion turn to prevent cheating)
                    if (this.gameStateManager.canPlaceFlower()) {
                        this.cellManager.clearAll();
                    } else {
                        console.log('Cannot clear during wind turn!');
                    }
                    break;
                case CONFIG.MOUSE_BUTTONS.RIGHT:
                    // Seeds can be placed anytime (for testing/manual placement)
                    this.cellManager.setSeedCell(cell);
                    break;
            }
        });

        // Listen for custom events from compass cells
        document.addEventListener('compassClick', (e) => {
            const { direction } = e.detail;
            console.log(`Compass clicked: ${direction}`); // DEBUG
            
            // Check if it's wind's turn and direction hasn't been used
            if (this.gameStateManager.canUseWind() && !this.compassManager.isDirectionUsed(direction)) {
                console.log('Wind turn confirmed, calling handleCompassClick'); // DEBUG
                this.handleCompassClick(direction);
                
                // Mark direction as used AFTER the wind effect
                this.compassManager.markDirectionUsed(direction);
                
                // Update game state AFTER the wind effect
                this.gameStateManager.onWindUsed();
            } else if (!this.gameStateManager.canUseWind()) {
                console.log('Not wind\'s turn! Wait for dandelion player to place a flower.');
            } else {
                console.log('This wind direction has already been used!');
            }
        });
    }

    handleCompassClick(direction) {
        console.log(`handleCompassClick called with: ${direction}`); // DEBUG
        
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
            console.log(`Calling blowWind with: ${windDirection}`); // DEBUG
            this.windManager.blowWind(windDirection);
        } else {
            console.log(`Unknown direction: ${direction}`);
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