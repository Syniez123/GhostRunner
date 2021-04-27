var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost,ghostAnimation;
var door,doorImage,climber,climberImage,object;
var tower,towerImage;
var spookySound;


function preload() {
  
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.y = tower.height /2;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImage);
  
  ghost.scale = 0.5;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleGroup = createGroup();
  
}
  
  function draw() {
    
    background("white");
    
    if(gameState === PLAY) {
      
      tower.velocityY = 5;
      ghost.velocityY=5;
      
       if(climbersGroup.isTouching(ghost)) {
        ghost.velocityY=0;
      }
      
     if(keyDown(UP_ARROW)) {
       ghost.velocityY=-5;
     }   
      if(keyDown(LEFT_ARROW)) {
       ghost.velocityX=-5;
     }
       if(keyDown(RIGHT_ARROW)) {
       ghost.velocityX=5;
     }
      
     
      
      if(invisibleGroup.isTouching(ghost)) {
        gameState = END;
      }
      
      
    
      
      
      Obstacles();
      
      if (tower.y > 400){
      tower.y = 300;
    }
    }
    else if (gameState === END) {
      ghost.velocityX=0;
        ghost.velocityY=0;
      
      tower.velocityY=0;
      
      invisibleGroup.destroyEach();
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
    }
    
    drawSprites();
  }

 


function Obstacles() {
    if (frameCount % 60 === 0) {
    var door = createSprite(300,0,10,10);
    var climber = createSprite(300,60,10,10);
    door.addImage(doorImage);
    climber.addImage(climberImage);
    var object = createSprite(300,65,100,20);
    object.visible=false;
    door.velocityY=5;
    climber.velocityY=5;
    object.velocityY=5;
  door.lifetime=300;
  climber.lifetime=300;
  object.lifetime=300;
      
       var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: door.x=300;
        climber.x=300;
        object.x=300;
              break;
      case 2: door.x=400;
        climber.x=400;
        object.x=400;
              break;
              case 3: door.x=200;
        climber.x=200;
        object.x=200;
              break;
              case 4: door.x=150;
        climber.x=150;
        object.x=150;
              break;
              case 5: door.x=450;
        climber.x=450;
        object.x=450;
              break;
      default: break;
    }
     
   doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleGroup.add(object);
  }
}
    
