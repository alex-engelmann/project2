class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    init() {
        // player variables
        this.playerSpeed = 7;
        this.playerMinX = 100;
        this.playerMaxX = 540;

        // we are not terminating
        this.isTerminating = false;

        //keyboard input to move the player

        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
                this.scene.player.setVelocity(200,0)
            }

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT) {
                this.scene.player.setVelocity(-200,0)
            }

        });
    }

    preload() {
        this.load.image('background', 'img/background.png');
        this.load.image('player', 'img/player.png');
        this.load.image('block', 'img/tech_sprites/intnode.png');
        this.load.image('goal', 'img/treasure.png');
    }
    create() {
        // create bg sprite
        let bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        // create the player
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, 450, 'player');
        this.player.setScale(1);
        this.player.setImmovable();
        this.player.setFriction(1,1);
        
        //create a falling block

        this.block = this.physics.add.sprite(this.sys.game.config.width / 2, 100, 'block');
        this.block.setGravityY(200);
        this.block.setFriction(1,1);
        this.physics.add.collider(this.player, this.block);

        // goal
        this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
        this.goal.setScale(1);

    }
    update() {

        // don't execute if we are terminating
        if (this.isTerminating) return;

        //player boundaries

        if (this.player.x > this.playerMaxX) {
            // console.log ("too far right")
            this.player.x = this.playerMaxX
        }

        if (this.player.x < this.playerMinX) {
            // console.log ("too far left")
            this.player.x = this.playerMinX
        }

        // treasure overlap check
        let playerRect = this.player.getBounds();
        let treasureRect = this.goal.getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
            console.log('reached goal!');

            // end game
            return this.gameOver();
        }
        // return this.gameOver(); this will end the game
    }
    gameOver() {

        // initiated game over sequence
        this.isTerminating = true;

        // shake camera
        this.cameras.main.shake(500);

        // listen for event completion
        this.cameras.main.on('camerashakecomplete', function (camera, effect) {

            // fade out
            this.cameras.main.fade(500);
        }, this);

        this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
            // restart the Scene
            this.scene.restart();
        }, this);
    }
}