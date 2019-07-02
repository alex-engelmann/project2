let game;

window.onload = function () {

    // set the configuration of the game
    let config = {
        type: Phaser.AUTO,
        width: 640,
        height: 480,
        scene: SceneMain,
        parent: "gameWindow",  //target a specific div
        physics: {
            default: 'arcade',
            arcade: {
            //    x: 0,
            //    y: 0,
            //    width: scene.sys.game.config.width,
            //    height: scene.sys.game.config.height,
                // gravity: {
                //     x: 0,
                //     y: 0
                // },
            //    checkCollision: {
            //        up: true,
            //        down: true,
            //        left: true,
            //        right: true
            //    },
            //    fps: 60,
            //    timeScale: 1,     // 2.0 = half speed, 0.5 = double speed
            //    overlapBias: 4,
            //    tileBias: 16,
            //    forceX: false,
            //    isPaused: false,
               debug: true,
            //    debugShowBody: true,
            //    debugShowStaticBody: true,
            //    debugShowVelocity: true,
            //    debugBodyColor: 0xff00ff,
            //    debugStaticBodyColor: 0x0000ff,
            //    debugVelocityColor: 0x00ff00,
            //    maxEntries: 16,
            //    useTree: true   // set false if amount of dynamic bodies > 5000
            }
        }
    };

    game = new Phaser.Game(config);
}