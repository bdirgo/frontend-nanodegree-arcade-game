// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = getRandomInt(0,300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + 10) * dt;
    // console.log("here");
    // Collision detection
  //   if((this.x == player.x) && (this.y == player.y)) {
  //   	this.x = 0;
  //   	this.y = getRandomInt(0,300);
  //   	player.x = getRandomInt(0,400);
		// player.y = 400;
  //   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = 'images/char-boy.png';
    this.x = getRandomInt(0,400);
	this.y = 400;
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
	if (allowedKeys == 'left') {
		if (this.x > 10) {
    		this.x  = this.x - 30;
		};
	} else if (allowedKeys == 'right') {
		if (this.x < 400) {
    		this.x = this.x + 30;
		};
	} else if (allowedKeys == 'up') {
		if (this.y > 10) {
    		this.y = this.y - 30;
		};
	} else if (allowedKeys == 'down') {
		if (this.y < 400) {
    		this.y = this.y + 30;
		};
	};
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [enemy1,enemy2];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
