// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

function getPlayerSpawnPoint() {
	var position = [];
	var x = getRandomInt(0,5) * 100;
	var y = 400;
	position.push(x);
	position.push(y);
	return position;
};

function getEnemySpawnPoint() {
	var position = [];
	var y = 300 - (85 * getRandomInt(1,3));
	var x = 0;
	position.push(x);
	position.push(y);
	return position;
};

var enemySpeed = 250;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    var position = getEnemySpawnPoint();
    this.x = position[0];
    this.y = position[1];
    this.speed = enemySpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 450) {
    	this.x = -5;
    	this.speed = enemySpeed;
    } else {
    	this.x += this.speed * dt;
    }

    // Collision detection
    if(player.x - this.x < 15 && player.y - this.y < 15 && player.x - this.x > 0 && player.y - this.y > 0) {
    	var enemyPosition = getEnemySpawnPoint();
    	this.x = enemyPosition[0];
    	this.y = enemyPosition[1];
    	var playerPosition = getPlayerSpawnPoint();
    	player.x = playerPosition[0];
		player.y = playerPosition[1];
    }
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
	var position = getPlayerSpawnPoint();
    this.x = position[0];
	this.y = position[1];
};

Player.prototype.update = function() {
	// TODO: Water collision detection
    if(player.y < 15)
    {
 	  	var position = getPlayerSpawnPoint();
    	this.x = position[0];
		this.y = position[1];
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
	if (allowedKeys == 'left') {
		if (this.x > 10) {
    		this.x  = this.x - 100;
		};
	} else if (allowedKeys == 'right') {
		if (this.x < 400) {
    		this.x = this.x + 100;
		};
	} else if (allowedKeys == 'up') {
		if (this.y > 10) {
    		this.y = this.y - 85;
		};
	} else if (allowedKeys == 'down') {
		if (this.y < 400) {
    		this.y = this.y + 85;
		};
	};
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [enemy1,enemy2];
// console.dir(enemy1);

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
