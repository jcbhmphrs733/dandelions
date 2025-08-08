// Config.js - Application constants and configuration

export const CONFIG = {
    CELL_SIZE: 30,
    GRID_GAP: 2,
    COMPASS: {
        DIRECTIONS: ['NW', 'N', 'NE', 'W', '', 'E', 'SW', 'S', 'SE'],
        TRANSITIONNORTH: { x: 0, y: -1 },
        TRANSITIONSOUTH: { x: 0, y: 1 },
        TRANSITIONEAST: { x: 1, y: 0 },
        TRANSITIONWEST: { x: -1, y: 0 },
        TRANSITIONNORTHEAST: { x: 1, y: -1 },
        TRANSITIONNORTHWEST: { x: -1, y: -1 },
        TRANSITIONSOUTHEAST: { x: 1, y: 1 },
        TRANSITIONSOUTHWEST: { x: -1, y: 1 },
        CENTER_INDEX: 4,
        SIZE: 3
    },
    TILESACROSS: 8,
    TILESDOWN: 8,
    IMAGES: {
        SEEDS: [
            'url(../assets/images/seed1.png)',
            'url(../assets/images/seed2.png)',
            'url(../assets/images/seed3.png)',
            'url(../assets/images/seed4.png)'
        ],
        FLOWERS: [
            'url(../assets/images/flower1.png)',
            'url(../assets/images/flower2.png)',
            'url(../assets/images/flower3.png)',
            'url(../assets/images/flower4.png)'
        ]
    },
    MOUSE_BUTTONS: {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    }
};
