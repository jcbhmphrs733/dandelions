// InstructionPanel.js - Displays game instructions at the start
export class InstructionPanel {
    constructor() {
        this.panel = null;
        this.isVisible = false;
    }

    show() {
        if (this.isVisible) return;
        
        this.createPanel();
        this.isVisible = true;
        document.body.appendChild(this.panel);
    }

    hide() {
        if (!this.isVisible || !this.panel) return;
        
        this.panel.remove();
        this.isVisible = false;
        this.panel = null;
    }

    createPanel() {
        // Create overlay
        this.panel = document.createElement('div');
        this.panel.className = 'instruction-overlay';
        
        // Create panel content
        this.panel.innerHTML = `
            <div class="instruction-panel">
                <div class="instruction-content">
                    <div class="instruction-section">
                        <h3>OBJECTIVE:</h3>
                        <p>Dandelions are trying to cover the grid with flowers and seeds while the Wind tries to resist this strategic takeover. Taking turns, place flowers in empty cells and the wind will push the seeds around. The wind can only blow in each direction once. After eight rounds, the dandelions win if they occupy the entire grid, while the Wind wins if it can prevent this.</p>
                    </div>

                </div>

                <button class="instruction-ok-button">ok</button>
            </div>
        `;

        // Add click handler for OK button
        const okButton = this.panel.querySelector('.instruction-ok-button');
        okButton.addEventListener('click', () => {
            this.hide();
        });

        // Prevent clicks on overlay from closing (only OK button closes)
        this.panel.addEventListener('click', (e) => {
            if (e.target === this.panel) {
                // Clicked outside panel - don't close, just ignore
                e.preventDefault();
            }
        });
    }
}
