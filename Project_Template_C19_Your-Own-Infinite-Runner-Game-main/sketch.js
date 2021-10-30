var path;   
var pathImg;
var Runner,running;
var RunnerImg;

var Dog,DogImg;
var invisibleGround;

var opstical,opsticalImg;
var opstical2,opstical2Img;
var opstical3,opstical3Img;
var YourScore = 0;

var GameOver, GameOverImg;
var Restart , RestartImg;

var path,pathImg;
var bomb,bombImg;
var energyDrink,energyDrinkImg;
var power,powerImg
var powerUp;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
pathImg = loadImage("path.png");

RunnerImg = loadAnimation("./Runner/Runner 1.png","./Runner/Runner 2.png","./Runner/Runner 3.png","./Runner/Runner 4.png","./Runner/Runner 5.png"
,"./Runner/Runner 5.png");

DogImg = loadAnimation("./Dog/Dog 1.png","./Dog/Dog 2.png","./Dog/Dog 3.png","./Dog/Dog 4.png","./Dog/Dog 5.png","./Dog/Dog 6.png"
,"./Dog/Dog 7.png","./Dog/Dog 6.png");

opsticalImg = loadImage("./obstacle/obstacle1.png");
opstical2Img = loadImage("./obstacle/obstacle2.png");
opstical3Img = loadImage("./obstacle/obstacle3.png");

bombImg = loadImage("./PowerUps/bomb.png");

energyDrinkImg = loadImage("./PowerUps/energyDrink.png");
powerImg = loadImage("./PowerUps/power.png");

GameOverImg = loadImage("./Game Over/Game-over.png");
RestartImg  = loadImage("./Game Over/Restart.png");

}

function setup() {
createCanvas(1200,300);

path = createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5

Runner = createSprite(400,150);
Runner.addAnimation("running",RunnerImg);
Runner.scale=0.7;

Dog = createSprite(150,200);
Dog.addAnimation("running",DogImg);
Dog.scale=0.7

bomb = createSprite(400,150);
bomb.addImage(bombImg);
bomb.scale=0.05
bomb.visible = false;

opstical = createSprite(1100,150);
opstical.addImage(opsticalImg);
opstical.scale=0.05
opstical.visible = false;

invisibleGround = createSprite(1200,285,10000,10);
invisibleGround.visible = false;
score=0;

GameOver = createSprite(600,100);
GameOver.addImage(GameOverImg);

Restart = createSprite(600,200);
Restart.addImage(RestartImg);

GameOver.scale = 0.05;
Restart.scale = 0.15;

BombGroup        = createGroup();
EnergyDrink = createGroup();
powerUps    = createGroup();
obstaclesGroup = createGroup();

}

function draw() {
  background(180);
  
  /*text("Score:" +score ,500,50);
  score= score + Math.round(frameCount/60);*/

  if (gameState === PLAY){

    GameOver.visible = false;
    Restart.visible = false;

    if(keyDown("space")&& Runner.y >= 120) {
      Runner.velocityY = -12;
    }
    
    Runner.velocityY = Runner.velocityY + 0.8
    
    if (path.x < 0){
    path.x = path.width/2;
    }
    
    //Runner.collide(invisibleGround);

    spawnbomb();
    spawnobstacle();

    if (obstaclesGroup.isTouching(Runner)){
      gameState = END;

      GameOver.visible = true;
      Restart.visible = true;
    }
  
  }
  
   if (gameState === END){
    
    //background('blue');

    Runner.destroy();
    Runner.visible = false;
    Dog.visible = false;
    path.velocityX = 0; 

    //Score.visible = false;
   }

   Runner.collide(invisibleGround);

  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ YourScore,1060,30);
}

function spawnbomb(){
  if (frameCount % 150 === 0){
 var BOMB = createSprite(120,250,10,40);
 BOMB.velocityX = -(6 + score/100);


 BOMB.addImage(bombImg);

 BOMB.scale=0.1;
 BOMB.lifetime = 150;
 BOMB.visible = false;

 BombGroup.add(bomb);
 }
}

function spawnobstacle(){
  if (frameCount % 110 === 0){
 var obstacle = createSprite(1200,250,10,40);
 obstacle.velocityX = -(6 + score/100);

  var rand = Math.round(random(1,6));
 switch(rand) {
  case 1: obstacle.addImage(opsticalImg);
          break;
  case 2: obstacle.addImage(opstical2Img);
          break;
  case 3: obstacle.addImage(opstical3Img);
          break;
  default: break;
  }

  if(opstical.isTouching(Runner) || Runner.y > 600){
    gameState = END;

    GameOver.visible = true;
    Restart.visible = true;  
  }
  
  obstacle.scale = 0.115;
  obstacle.lifetime = 159;

  obstaclesGroup.add(opstical);
  }
 }  