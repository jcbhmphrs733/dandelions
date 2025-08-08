// Utils.js - Shared utility functions

export class Utils {
    static getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    static isValidCell(cell) {
        return cell && 
               cell.classList.contains('cell') && 
               !cell.classList.contains('compass');
    }
    
    static clearCellBackground(cell) {
        cell.style.backgroundImage = '';
        cell.classList.remove('seed', 'flower');
    }
    
    static isCompassCell(cell) {
        return cell && cell.classList.contains('compass');
    }
    
    static getClickedCellType(cell) {
        if (this.isCompassCell(cell)) return 'compass';
        if (this.isValidCell(cell)) return 'grid';
        return 'other';
    }
}
