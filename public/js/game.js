
// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 640,
  height: 480,
  scene: gameScene,
  parent: "gameWindow"  //target a specific div
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

// initiate scene parameters
gameScene.init = function () {
  // player speed
  this.playerSpeed = 7;
  this.playerMinX = 50;
  this.playerMaxX = 600;


  // enemy speed
  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 4.5;

  // boundaries
  this.enemyMinY = 80;
  this.enemyMaxY = 280;

  // we are not terminating
  this.isTerminating = false;


  // handle keyboard input to move the player

  this.input.keyboard.on('keydown', function (event) {

    if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
      gameScene.player.x += gameScene.playerSpeed;
    }

    if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT) {
      gameScene.player.x -= gameScene.playerSpeed;
    }

  });
};

// load assets
gameScene.preload = function () {
  // load images
  this.load.image('background', 'img/background.png');
  this.load.image('player', 'img/player.png');
  this.load.image('enemy', 'img/dragon.png');
  this.load.image('goal', 'img/treasure.png');
};

// called once after the preload ends
gameScene.create = function () {
  // create bg sprite
  let bg = this.add.sprite(0, 0, 'background');

  // change the origin to the top-left corner
  bg.setOrigin(0, 0);

  // create the player
  this.player = this.add.sprite(40, 450, 'player');

  // we are reducing the width and height by 70%
  this.player.setScale(0.3);

  // goal
  this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
  this.goal.setScale(0.6);

  // setting scale to all group elements

};

// this is called up to 60 times per second
gameScene.update = function () {

  // don't execute if we are terminating
  if (this.isTerminating) return;

  // treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log('reached goal!');

    // end game
    return this.gameOver();
  }


  // return this.gameOver(); this will end the game
  };

gameScene.gameOver = function () {

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


};
