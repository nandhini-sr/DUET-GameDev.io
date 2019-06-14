var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');


var mouseDownX = null, mouseDownY = null;

var flightList = [flightb,flighty,flightp,flightg];
var colorList = ['#abb91b', '#7f0d92', '#ef8f01'];

var score = 0;
setMode = 0;
HFMode = 1;
spriteMode = 0;
var spre = 0; //for HFRelease


bgBtn.style.display = "none";
normBtn.style.display = "none";
hackBtn.style.display = "none";

hackPR.style.display = "none";
hack2player.style.display = "none";
hackCP.style.display = "none";
hackPU.style.display = "none";
hackSP.style.display = "none";

function randomIntFromRange(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function randomIndex(arrayName){
	return (Math.floor(Math.random()*arrayName.length));
}

function clamp(min, max, value, radius){
	if(value<min)
	{
		if(min-value < radius)
    {
      return 1;
    }
    else {
      return 0;
    }
	}
    
    else if(value>max)
    {
    	if(value-max < radius)
    {
      return 1;
    }
    else {
      return 0;
    }
    }

    else
    {
    	return 1;
    }

}

class Obstacle
{
	constructor(x,y,velocity,color)
	{
		this.x = x;
		this.y = y;
		this.velocity = velocity;
		this.color = color;
	}

	draw()
	{
		
		c.beginPath();
		c.fillStyle = this.color; 
        c.fillRect(this.x,this.y, 100, 30);
        c.fill();
        c.closePath();
        
	}

	update()
	{
		
		this.y = this.y + this.velocity;
		this.collisionDetection();
		this.draw();
	}

	collisionDetection()
	{
		if((clamp(this.x,(this.x+100),redDuet.x,15) && clamp(this.y,(this.y+30),redDuet.y,15)))
   		{
      	   	redDuet.shatter();
   		}

      if(HPU==0)
      {
        if((clamp(this.x,(this.x+100),blueDuet.x,15) && clamp(this.y,(this.y+30),blueDuet.y,15)))
      {
            blueDuet.shatter();
      }
      }
   		
	}

}


class Horlicks{
          constructor(x,y,width,height)
          {
          	this.x = x;
          	this.y = y;
          	this.width = width;
          	this.height = height;
          	this.velocity = 2;
          }

          draw()
          {
             c.drawImage(horlicks,this.x,this.y,this.width,this.height);  
          }

          update()
          {
			this.y = this.y + this.velocity;
			this.collisionDetection();
			this.draw();
          }

          collisionDetection()
	      {
		   		
   		if((clamp(this.x,(this.x+75),blueDuet.x,15) && clamp(this.y,(this.y+75),blueDuet.y,15)))
   		{
      	     HPU = 1;
    
   		}
   		
	      }

}

class Flight
{
	constructor(x,y,width,height,num)
          {
          	this.x = x;
          	this.y = y;
          	this.width = width;
          	this.height = height;
          	this.velocity = 2;
          	this.num = num;
          }

          draw()
          {
             c.drawImage(flightList[this.num],this.x,this.y,this.width,this.height);
          }

          update()
          {
			this.y = this.y + this.velocity;
			this.collisionDetection();
			this.draw();
          }

          collisionDetection()
	      {
		   		
   		if((clamp(this.x,(this.x+75),blueDuet.x,15) && clamp(this.y,(this.y+75),blueDuet.y,15)))
   		{
      	    blueDuet.flightPowerUp();
      	    redDuet.flightPowerUp();
    
   		}

   		if((clamp(this.x,(this.x+75),redDuet.x,15) && clamp(this.y,(this.y+75),redDuet.y,15)))
   		{
      	    blueDuet.flightPowerUp();
      	    redDuet.flightPowerUp();
    
   		}
   		
	      }

}

class MiniDuet{
	constructor(x,y,dx,dy,radius,color)
	{
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = color;
		this.ttl = 100; //time to live
	}

	draw()
	{
	  	c.beginPath();
    	c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
    	c.fillStyle = this.color;
    	c.fill();
    	c.closePath();
	}

	update()
	{
		this.x +=this.dx;
        this.y +=this.dy;
        this.ttl -=1;
        this.draw();
	}
}

function HFRelease()
{
	timerHF = setInterval(function(){
    spre ++;
    if(spre%2==0)
    {
      x=randomIntFromRange(canvas.width/2 - 150,canvas.width/2 - 100);
    }
    else
    {
      x=randomIntFromRange(canvas.width/2,canvas.width/2 + 50);
    }

    if(hfArray.length % 24 == 0)
    {
      var randColor = colorList[randomIndex(colorList)];
      hfArray.push(new Obstacle(x,-30,2,randColor));
    }
    else if(hfArray.length % 3 == 0)
    {
    	x=randomIntFromRange(canvas.width/2-75,canvas.width/2 + 45);
    	hfArray.push(new Horlicks(x,-75,75,75));
    }
    else if(hfArray.length % 8 == 0)
    {
      var randFlight = randomIndex(flightList);
      x=randomIntFromRange(canvas.width/2-75,canvas.width/2 + 45);
      hfArray.push(new Flight(x,-35,75,35,randFlight));
    }
    else
    {
    	var randColor = colorList[randomIndex(colorList)];
      hfArray.push(new Obstacle(x,-30,2,randColor));
    }    
 
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
  clearInterval(timerHF);
  timerHF = null;
  hfArray.splice(0,hfArray.length);
  setJS('tryAgainGame.js');
}

let hfArray = [];
let miniDuets = [];

function initializeHF()
{
    canvas.onmousedown = myMouseDown;
    canvas.onmouseup = myMouseUp;
    redDuet.velocity = 0.1;
    blueDuet.velocity = 0.1;
    var x=randomIntFromRange(canvas.width/2 - 150,canvas.width/2 - 100);
    var randColor = colorList[randomIndex(colorList)];
    hfArray.push(new Obstacle(x,-30,2,randColor));
    HFRelease();
    ScoreIncrease();
}

function hfloop(){
  
    c.clearRect(0,0,canvas.width,canvas.height); 

    hfArray.forEach(obstacle => {
       
        obstacle.update();

    });



  circle.draw();
  redDuet.draw();
  if(HPU == 1)
  {
  	blueDuet.horlicksPowerUp();
  }
  else
  {
  	blueDuet.draw();
  }
  

  miniDuets.forEach((miniDuet,index) => {
  		miniDuet.update();
  		if(miniDuet.ttl == 0)
  		{
  			miniDuets.splice(index,1);
  			gameOver();
  		}
  	});
     
  c.font = 'bold 35px Open Sans';
  c.fillStyle = 'black';
  c.textAlign = 'center';
  c.fillText('Score: ' + score,350,100);


    requestAnimationFrame(hfloop);
}


initializeHF();
hfloop();