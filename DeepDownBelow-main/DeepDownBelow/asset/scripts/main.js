// ----- CONFIGURATION INITIALE -----
var config = {

    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        width: 1620,
        height: 1000,
    },

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu
    scene: [lobby,Drill,Caves]
};

var game = new Phaser.Game(config);