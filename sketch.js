var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
}

function draw(){
  background(0);
  if (gameState === "play") 
  {
    
    ghost.debug = true;
    
    spawnDoors();
    
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      gameState = "end";
    }
    
    console.log(frameCount);
    
    if (tower.y > 600) {
      tower.y = height / 2;
    }
    
    if (keyWentDown("space")) {
      ghost.velocityY = -8;
    }
    
    if (keyDown("right")) {
      ghost.x = ghost.x + 5;
    }
    
    if (keyDown("left")) {
      ghost.x = ghost.x - 5;
    }
    
    ghost.velocityY = ghost.velocityY + 0.5;
    
    drawSprites();
  }
  
  if (gameState === "end"){
    background("black");
    stroke("yellow");
    textSize(50);
    text("Game Over", 150, 250);
    ghost.destroy();
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if(frameCount % 250 === 0 && frameCount !== 0) {
    door = createSprite(Math.round(random(120, 400)), -50, 10, 10);
    door.addImage("door", doorImg);
    door.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth += 1;
    doorsGroup.add(door);
    climber = createSprite(door.x, door.y + 55, 10, 10);
    climber.addImage("climber", climberImg);
    climber.debug = true;
    climber.velocityY = 1;
    climbersGroup.add(climber);
    invisibleBlock = createSprite(door.x, climber.y + 10, climber.width, climber.height);
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    // invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.setLifetimeEach(800);
    doorsGroup.setLifetimeEach(800);
    invisibleBlockGroup.setLifetimeEach(800);
  }
}

