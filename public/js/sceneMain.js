class Collision {
    static checkCollide(obj1, obj2) {
        var distX = Math.abs(obj1.x - obj2.x);
        var distY = Math.floor(Math.abs(obj1.y - obj2.y));
        if (distX < obj1.width) {
            if (distY < obj1.height) {
                return true;
            }
        }
        return false;
    }
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    init() {
        // player variables
        this.playerSpeed = 200;
        this.playerMinX = 100;
        this.playerMaxX = 540;

        // we are not terminating
        this.isTerminating = false;

        //keyboard input to move the player

        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
                this.scene.player.setVelocity(this.scene.playerSpeed, 0)
            }
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT) {
                this.scene.player.setVelocity(-this.scene.playerSpeed, 0)
            }

        });
    }

    preload() {
        this.load.image('background', 'img/background.png');
        this.load.image('player', 'img/player.png');
        this.load.image('block', 'img/tech_sprites/intnode.png');
    }
    create() {
        this.score = 0;
        this.text1 = this.add.text(0,0, "Score: " + this.score, { font: '25px Share Tech Mono', fill: '#000000' });
        this.text1.depth = 1;

        // create bg sprite
        let bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        // create the player
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, 450, 'player');
        this.player.setScale(1);
        this.player.setImmovable();
        this.player.setFriction(1, 1);

        //create a falling block

        this.block = this.physics.add.sprite(this.sys.game.config.width / 2, 100, 'block');
        this.block.setGravityY(200);
        this.block.setFriction(1, 1);
        this.physics.add.collider(this.player, this.block);

    }
    update() {

        // don't execute if we are terminating
        if (this.isTerminating) return;

        if (Collision.checkCollide(this.block, this.player) === true) {
            console.log("Collision!");
            this.score += 10;
            this.text1.setText("Score: " + this.score);
            
            //removes the block and respawns it back up at a random X position
            this.block.setVisible(false);
            this.block.y = 100;
            this.block.x = Math.floor(Math.random() * this.playerMaxX - 60) + this.playerMinX + 30;
            this.block.setVisible(true);
            // this.block.setActive(true).setVisible(true);
            
        }

        //player boundaries

        if (this.player.x > this.playerMaxX) {
            // console.log ("too far right")
            this.player.x = this.playerMaxX
        }

        if (this.player.x < this.playerMinX) {
            // console.log ("too far left")
            this.player.x = this.playerMinX
        }

        //TODO set game over conditions

        // if ()) {


        //     // end game
        //     return this.gameOver();
        // }
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