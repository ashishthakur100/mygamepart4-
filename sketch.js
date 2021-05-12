var PLAY = 1;
var END = 0;
var gameState = PLAY;
var boy, boy_walking ;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5 ;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  boy_walking =   loadAnimation("boy standing 1.png","boy standing 2.png","boy standing 3.png","boy standing 4.png","boy standing 5.png","boy standing 6.png",
  "boy standing 7.png","boy standing 8.png","boy standing 9.png","boy standing 10.png","boy standing 11.png","boy standing 12.png","boy standing 13.png",
  "boy standing 14.png","boy standing 15.png",);
  boy_falling = loadAnimation("boy falling 1.png","boy falling 2.png","boy falling 3.png");
  
  
  groundImage = loadImage("ground.jpg");
  

  
  obstacle1 = loadImage("brick.png");
  obstacle2 = loadImage("bushes.png");
  obstacle3 = loadImage("sticks.png");
  obstacle4 = loadImage("stone.png");
  
  
  
  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 600);
  
 
  
  ground = createSprite(100,300);
  ground.addImage("ground",groundImage);
  ground.scale=1.3
  ground.x = ground.width /2;
  ground.velocityX = -8

  boy = createSprite(50,250,20,50);
  boy.addAnimation("walking", boy_walking);
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,240);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;
  
 invisibleGround = createSprite(10,550,1000,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(200);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
    if (ground.x <600){
      ground.x = 650;
    }
  


    if(keyDown("space") ) {
     boy.velocityY = -17;
    }
  
    boy.velocityY = boy.velocityY + 0.7
  
   
    boy.collide(invisibleGround);
    spawnObstacles();


  
   if(obstaclesGroup.isTouching(boy)){
     gameState = END;
     }
  }
 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    //change the trex animation
    boy.changeAnimation("collided",boy_falling);
  
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


    


function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,500);
    //obstacle.debug = true;
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
          
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.12;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  
  boy.changeAnimation("running",boy_walking);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}