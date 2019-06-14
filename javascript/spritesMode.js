var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');


var mouseDownX = null, mouseDownY = null;

var score = 0;
setMode = 0;
spriteMode = 1;
var spre = 0; //for spriteRelease
var hit = 0;//to change image when sprite hit


bgBtn.style.display = "none";
normBtn.style.display = "none";
hackBtn.style.display = "none";

hackPR.style.display = "none";
hack2player.style.display = "none";
hackCP.style.display = "none";
hackPU.style.display = "none";
hackSP.style.display = "none";

//rectangle- rectangle collision
function collided(im1x,im1y,im1width,im1height,im2x,im2y,im2width,im2height)
{
  if (im1x < im2x + im2width &&
   im1x + im1width > im2x &&
   im1y < im2y + im2height &&
   im1y + im1height > im2y) {
    return 1;
  }
  else
  {
  return 0;
  }

}

function randomIntFromRange(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

class ObstacleSprite
{
  constructor(x,y,width,height)
  {
    this.x = x;
    this.y = y;
    this.velocity = 2;
    this.width = width;
    this.height = height;
  }

  draw()
  {
    if(hit == 0)
    {
      c.drawImage(obstacles,this.x,this.y,this.width,this.height);
    } 

    else
    {
      c.drawImage(obstacleHit,this.x,this.y,this.width,this.height);
    }
           
  }

  update()
  {    
    
    this.y = this.y + this.velocity;
    this.collisionDetection();  
    this.draw();
  }

  collisionDetection()
  {
    if(collided(this.x,this.y,this.width,this.height,blueDuet.x-15,blueDuet.y-15,50,70))
    {
      hit = 1;
      blueDuet.spriteCollided();
    }
    if(collided(this.x,this.y,this.width,this.height,redDuet.x-15,redDuet.y-15,50,70))
    {
      hit = 2;
      redDuet.spriteCollided();
    }

  }

}

function SpriteRelease(){

  timerSprite = setInterval(function(){
    spre ++;
    if(spre%2==0)
    {
      x=randomIntFromRange(canvas.width/2 - 150,canvas.width/2 - 100);
    }
    else
    {
      x=randomIntFromRange(canvas.width/2,canvas.width/2 + 50);
    }

  spriteArray.push(new ObstacleSprite(x,-30,100,30));
 
  }, 3000);

}

function ScoreIncrease()
{
  timerScore = setInterval(function(){
        score = score + 1;
  }, 1000);
}
function myMouseDown(e){

  timerDuet = setInterval(function(){
  mouseDownX = e.offsetX;  
  mouseDownY = e.offsetY; 
  
  if(mouseDownX > canvas.width/2)
  {
    redDuet.clockwiseRotate();
    blueDuet.clockwiseRotate();
  }
  else if(mouseDownX < canvas.width/2) 
  {
    redDuet.AnticlockwiseRotate();
    blueDuet.AnticlockwiseRotate();
  }

  }, 20);
}


function myMouseUp(e)
{
  clearInterval(timerDuet);
}

function gameOver()
{
  clearInterval(timerScore);
  timerScore = null;
  clearInterval(timerSprite);
  timerSprite = null;
  spriteArray.splice(0,spriteArray.length);
  setJS('tryAgainGame.js');
}



let spriteArray = []

function initializeSprite()
{
    canvas.onmousedown = myMouseDown;
    canvas.onmouseup = myMouseUp;
    redDuet.velocity = 0.1;
    blueDuet.velocity = 0.1;
    spriteArray.push(new ObstacleSprite(canvas.width/2 - 160,-30,100,30));
    SpriteRelease();
    ScoreIncrease();
}

function spriteloop(){
  
    c.clearRect(0,0,canvas.width,canvas.height); 

    spriteArray.forEach(obstacle => {
       
        obstacle.update();

    });

  circle.draw();
  if(hit == 0)
  {
     redDuet.draw();
     blueDuet.draw(); 
  }
  
  else if(hit == 1)
  {
    blueDuet.spriteColllided();
    redDuet.draw();
  }

  else if(hit == 2)
  {
    redDuet.spriteColllided();
    blueDuet.draw();
  }

     
  c.font = 'bold 35px Open Sans';
  c.fillStyle = 'black';
  c.textAlign = 'center';
  c.fillText('Score: ' + score,350,100);


    requestAnimationFrame(spriteloop);
}


initializeSprite();
spriteloop();
