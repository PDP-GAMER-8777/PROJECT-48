var dog, dogImg
var ground, groundImg
var obstacle, obstacleImg
var star, starImg
var gameOver, gameOverImg
var restart, restartImg
var score =  0
var gameOverSound
var jumpSound
PLAY =1
END =0
var gameState = PLAY

function preload() {
	groundImg = loadImage("background.png")
	dogImg = loadImage("dog.png")
	starImg = loadImage("star.png")
	obstacleImg = loadImage("obstacle.png")
	gameOverImg = loadImage("gameover.png")
	restartImg = loadImage("restart.png")
	gameOverSound = loadSound("gameover.mp3")
	jumpSound = loadSound("jump.mp")
}

function setup() {
	createCanvas(500, 500);
	ground = createSprite(600, 280, 100, 10)
	ground.velocityX = -4
	ground.addImage(groundImg)
	ground.visible = true
	ground.x = ground.width / 2
	dog = createSprite(150, 100, 10, 10)
	dog.addImage(dogImg)
	dog.scale = 0.1
	obstacleGroup = new Group();
	starGroup = new Group();
	gameOver = createSprite(250, 130, 25, 25)
	gameOver.addImage(gameOverImg)
	gameOver.scale = 0.5
	gameOver.visible = false
	restart = createSprite(250, 160, 25, 25)
	restart.addImage(restartImg)
	restart.visible = false
	restart.scale = 0.5
}


function draw() {
	//background(groundImg)
	

if (dog.isTouching(starGroup)) {
	score = score + 1
	jumpSound.play()
}


	

	
	spawnobstacle();
	spawnstar();
	drawSprites();
	textSize(26)
	fill("white")
	text("score: " + score, 300, 100)

	if (dog.isTouching(obstacleGroup)){
		gameState = END
	
	}
	if(gameState === END){
		gameOverSound.play()
	    restartImg.visible =true
        gameOverImg.visible = true
		ground.velocityX = 0
		dog.velocityY = 0
		obstacleGroup.setVelocityXEach(0)
		starGroup.setVelocityXEach(0)
		obstacleGroup.destroyEach()
		starGroup.destroyEach()
	}
}
function keyPressed() {
	if (keyCode === UP_ARROW) {
		dog.velocityY = - 5;
	} else if (keyCode === DOWN_ARROW) {
		dog.velocityY =  5;
	}
  }
function spawnobstacle() {
	if (frameCount % 60 === 0) {
		obstacle = createSprite(700, 220, 10, 10)
		obstacle.addImage(obstacleImg)
		obstacle.velocityX = -5
		obstacle.y = Math.round(random(50, 500))
		obstacle.scale = 0.1
		obstacle.lifetime = 500
		obstacleGroup.add(obstacle)

	}
}

function spawnstar() {
	if (frameCount % 60 === 0) {
		star = createSprite(700, 220, 10, 10)
		star.addImage(starImg)
		star.velocityX = -6
		star.y = Math.round(random(50, 500))
		star.scale = 0.1
		star.lifetime = 500
		starGroup.add(star)
		
	}
}