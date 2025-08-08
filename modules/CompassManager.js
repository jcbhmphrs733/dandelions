// CompassManager.js - Handles compass creation, sizing, and DOM management

import { CONFIG } from './Config.js';

export class CompassManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.cells = [];
        this.usedDirections = new Set(); // Track used directions
        this.createCompass();
    }

    isDirectionUsed(direction) {
        return this.usedDirections.has(direction);
    }

    markDirectionUsed(direction) {
        this.usedDirections.add(direction);
        
        const targetCell = this.cells.find(cell => 
            cell && cell.dataset.direction === direction
        );
        
        if (targetCell) {
            targetCell.classList.add('used');
            targetCell.style.backgroundImage = ""; // Clear background image
        }
    }
    
    createCompass() {
        this.setupGrid();
        this.createCells();
        console.log('Compass created');
    }
    
    setupGrid() {
        const size = `${CONFIG.CELL_SIZE}px`;
        this.container.style.gridTemplateColumns = `repeat(${CONFIG.COMPASS.SIZE}, ${size})`;
        this.container.style.gridTemplateRows = `repeat(${CONFIG.COMPASS.SIZE}, ${size})`;
        this.container.innerHTML = '';
        this.cells = [];
    }
    
    createCells() {
        for (let i = 0; i < CONFIG.COMPASS.SIZE ** 2; i++) {
            const cell = this.createCell(i);
            this.container.appendChild(cell);
            this.cells.push(i === CONFIG.COMPASS.CENTER_INDEX ? null : cell);
        }
    }
    
    createCell(index) {
        const cell = document.createElement('div');
        const direction = CONFIG.COMPASS.DIRECTIONS[index];
        
        cell.classList.add('cell');
        
        if (index === CONFIG.COMPASS.CENTER_INDEX) {
            cell.classList.add('compass-placeholder');
        } else {
            cell.classList.add('compass');
            cell.dataset.index = index;
            cell.dataset.direction = direction;
            cell.textContent = direction;
            
            // Add event listeners directly to compass cells
            cell.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCompassClick(direction);
            });
            
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.handleCompassClick(direction);
            });
        }
        
        return cell;
    }
    
    handleCompassClick(direction) {
        // Check if this direction has already been used
        if (this.isDirectionUsed(direction)) {
            console.log(`Direction ${direction} already used!`); // DEBUG
            return; // Don't dispatch event if already used
        }

        console.log(`Dispatching compassClick event for direction: ${direction}`); // DEBUG
        
        // Dispatch custom event for the main app to handle
        const event = new CustomEvent('compassClick', {
            detail: { direction }
        });
        document.dispatchEvent(event);
    }
}