// GameStateManager.js - Controls turn-based gameplay
export class GameStateManager {
    constructor(cellManager = null, instructionPanel = null) {
        this.currentTurn = 'DANDELION'; // 'DANDELION' or 'WIND'
        this.turnsRemaining = 8; // 8 wind directions available
        this.gameActive = true;
        this.dandelionMustPlace = true; // Dandelion must place first
        this.cellManager = cellManager;
        this.instructionPanel = instructionPanel;
        
        console.log('Game initialized: Dandelion player must place a flower first');
        this.updateTurnDisplay();
    }

    getCurrentTurn() {
        return this.currentTurn;
    }

    isGameActive() {
        return this.gameActive;
    }

    canPlaceFlower() {
        return this.gameActive && this.currentTurn === 'DANDELION';
    }

    canUseWind() {
        return this.gameActive && this.currentTurn === 'WIND' && this.turnsRemaining > 0;
    }

    onFlowerPlaced() {
        if (!this.canPlaceFlower()) {
            console.log('Not your turn! Wait for wind player.');
            return false;
        }

        console.log('Dandelion placed a flower. Wind player\'s turn.');
        this.currentTurn = 'WIND';
        this.dandelionMustPlace = false;
        this.updateTurnDisplay();
        return true;
    }

    onWindUsed() {
        if (!this.canUseWind()) {
            console.log('Not your turn! Wait for dandelion player.');
            return false;
        }

        this.turnsRemaining--;
        console.log(`Wind used. ${this.turnsRemaining} wind directions remaining.`);

        if (this.turnsRemaining === 0) {
            this.endGame();
        } else {
            this.currentTurn = 'DANDELION';
            console.log('Dandelion player\'s turn.');
        }
        
        this.updateTurnDisplay();
        return true;
    }

    endGame() {
        this.gameActive = false;
        this.currentTurn = null;
        console.log('Game Over! All wind directions have been used.');
        console.log('CellManager available:', !!this.cellManager); // DEBUG
        console.log('InstructionPanel available:', !!this.instructionPanel); // DEBUG
        this.updateTurnDisplay();
        
        // Calculate end game results and show panel
        if (this.cellManager && this.instructionPanel) {
            const seedCount = this.cellManager.seedCells.size;
            const flowerCount = this.cellManager.flowerCells.size;
            const totalCells = this.cellManager.gridManager.cells.length;
            
            console.log(`End game stats: ${seedCount} seeds, ${flowerCount} flowers, ${totalCells} total cells`);
            
            // Show end game panel after a short delay for better UX
            setTimeout(() => {
                console.log('Showing end game panel...'); // DEBUG
                this.instructionPanel.showEndGame(seedCount, flowerCount, totalCells);
            }, 1000);
        } else {
            console.log('Cannot show end game panel - missing dependencies'); // DEBUG
        }
    }

    updateTurnDisplay() {
        // Find the center compass cell (it has the 'compass-placeholder' class)
        const centerCell = document.querySelector('.compass-placeholder');

        if (!centerCell) {
            console.warn('Could not find center compass cell for turn display');
            return;
        }

        // Update the center cell's background image based on current turn
        if (!this.gameActive) {
            // Game over - maybe show a different image or leave it empty
            centerCell.style.backgroundImage = '';
            centerCell.style.backgroundColor = '#333'; // Dark color for game over
        } else if (this.currentTurn === 'DANDELION') {
            // Dandelion's turn - use a random flower image
            const flowerImages = [
                'url(./assets/images/flower1.png)',
                'url(./assets/images/flower2.png)',
                'url(./assets/images/flower3.png)',
                'url(./assets/images/flower4.png)'
            ];
            const randomFlower = flowerImages[Math.floor(Math.random() * flowerImages.length)];
            centerCell.style.backgroundImage = randomFlower;
            centerCell.style.backgroundColor = '';
        } else {
            // Wind's turn - use wind.png
            centerCell.style.backgroundImage = 'url(./assets/images/wind.png)';
            centerCell.style.backgroundColor = '';
        }
    }

    // Reset game state (alternative to page reload)
    resetGame() {
        this.currentTurn = 'DANDELION';
        this.turnsRemaining = 8;
        this.gameActive = true;
        this.dandelionMustPlace = true;
        
        console.log('Game reset: Dandelion player must place a flower first');
        this.updateTurnDisplay();
    }
}
