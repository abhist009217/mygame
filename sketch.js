var back;
var des;
var bul;
var bg;
var mycar;
var pol;
var gun;
var en2;
var en1;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var edge1,edge2;
var obstacle;
var res;
var score=0;

var bulen;
var obstaclesGroup;
var bullet,bulletGroup;
var bule,buleGroup;



function preload(){
back=loadImage("images/road5.jpg");
des=loadImage("images/des.png");
bul=loadImage("images/bul.png");
pol=loadImage("images/pol.png");
en1=loadImage("images/en1.png");
en2=loadImage("images/en2.png");
bulen=loadImage("images/bule.png");
over=loadImage("images/over.jpg");
res=loadImage("images/re.png");

}








function setup() {
  createCanvas(800,800);
 bg = createSprite(400,400,10,10);



 bg.scale=5.0;
 mycar=createSprite(400,650,10,10);
 mycar.addImage(pol);
mycar.scale=0.3

edge1=createSprite(10,400,10,800);
edge2=createSprite(790,400,10,800)

edge1.visible=false
edge2.visible=false


obstaclesGroup=new Group();

bulletGroup=new Group();

buleGroup=new Group();

re=createSprite(400,400,50,50);
re.addImage(res);









}

function draw() {
background("black");
if(gameState===PLAY){
  bg.addImage(back);
  bg.velocityY=3;
  re.visible=false;
  mycar.visible=true;
  

if(bg.y>600){
  bg.y=100;
}

spawnObstacles();
if(keyWentDown("space")){
  Bullet();
}

if(keyDown("left_arrow")||keyDown("a")){
mycar.x = mycar.x-5;

}

if(keyDown("right_arrow")||keyDown("d")){
  mycar.x = mycar.x+5
}
if(keyDown("down_arrow")||keyDown("s")){
  bg.velocityY=0;
}
if(keyDown("up_arrow")||keyDown("w")){
  bg.velocityY=3
}
if(bulletGroup.isTouching(buleGroup)||bulletGroup.isTouching(obstaclesGroup)){
  obstacle.addImage(des);
  obstaclesGroup[0].destroy;
  score=score+1;
}
if(buleGroup.isTouching(mycar)){
  gameState=END;
  
}
}



 mycar.collide(edge1);
 

 mycar.collide(edge2);

 if(gameState===END){
 
  


bg.velocityY=0;
bg.addImage(over);
bg.scale= 4.5;  
re.visible=true;  
mycar.visible=false;
obstaclesGroup.destroyEach();
buleGroup.setVisibleEach(); 
if(mousePressedOver(re)){
  reset();

}
}




  drawSprites();
 textSize(25);
 fill("white");  
 text("Car destroyed: "+score,550,50);
 
}
function spawnObstacles(){
  if (frameCount % 65 === 0){
    obstacle = createSprite(mycar.x,0,10,40);
    bule=createSprite(obstacle.x,80,10,40);
    bule.addImage(bulen);
    
    obstacle.velocityY = (6);
    bule.velocityY = (6);
    bule.lifetime = 300;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(en1);
               break;
       case 2: obstacle.addImage(en2);
               break;

      
 
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
     bule.scale = 0.2
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
     buleGroup.add(bule);
     
  }
 }

 function Bullet(){
   bullet=createSprite(mycar.x,mycar.y);bullet.addImage(bul); 
   bullet.velocityY=-6;
   bullet.lifetime = 300;
   bullet.scale = 0.2
   bulletGroup.add(bullet);
   


 }
function reset(){
gameState=PLAY;

} 
