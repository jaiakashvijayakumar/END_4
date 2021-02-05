
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,fruit;

var ThemeSong;

var BackGrouund,BackGroundImg;


function preload(){
  
  swordImage = loadImage("space.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  fruit1 = loadImage("download.jpg");
  fruit2 = loadImage("download.jpg");
  fruit3 = loadImage("download.jpg");
  fruit4 = loadImage("download.jpg");
  gameOverImage = loadImage("gameover.png")
  knifeSwooshSound = loadSound ("knifeSwooshSound.mp3")
  gameoverSound = loadSound ("gameover.mp3");
  
  BackGroundImg = loadImage("0.png");
  
  ThemeSong = loadSound("Among Us Theme.mp3");

  
}



function setup() {
createCanvas(400, 400);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.5
  
  
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background(  BackGroundImg);
  
 
    drawSprites();
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
   // fruit();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
     
      score=score+1;

      
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
    
        gameState=END;
        
         
       
      }
    }
  }
  if(gameState === END){
   fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
    textSize(20);
    fill("red");
    text("Press 'r' to restart",0,20)
    score = 0
      
        
        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
  }  
  
  if(keyDown("r")){
    
    gameState = PLAY;
     sword.addImage(swordImage)
    
  }

  
  //Display score
  fill('black');
  text("Score : "+ score,300,30);
      
}


function Enemy(){
  if(World.frameCount%50===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score / 10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%20===0){
    fruit=createSprite(400,200,20,20);
    position=Math.round(random(1,2));
    console.log(position);
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX= -(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
      
   
    fruit.y=Math.round(random(50,340));
   
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

   
    
  
