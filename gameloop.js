//Inital setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

function randomIntFromRange(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

var num = 2;

function anti()
{
   num = 0;
   blueDuet.update();
   redDuet.update();
}

function clock()
{
   num = 1;
   blueDuet.update();
   redDuet.update();
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

function Circle(){

	this.update = function(){

		this.draw();
	}

	this.draw = function(){
		c.beginPath();
        c.arc(200,600,50,0,Math.PI * 2,true);
        c.StrokeStyle = 'black';
        c.stroke();
        c.closePath(); 
	}
         
}


function Duet(x, y,radians,color){
	this.x = x;
	this.y = y;
	this.radius = 15;
	this.radians = radians;
	this.color = color;
	this.velocity = 0.2;
	
	this.update = function(){

		const lastPoint = {x:this.x, y:this.y};

		if(num == 1)
		{
			
			this.radians +=this.velocity;
            this.x = x + Math.cos(this.radians)*50;
            this.y = y + Math.sin(this.radians)*50; 

		}

		else if(num == 0)
		{
			
            this.radians +=this.velocity;
            this.x = x - Math.cos(this.radians)*50;
            this.y = y + Math.sin(this.radians)*50;
            
		}

		this.draw();
	}

	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.color;
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
    c.fill();
    c.closePath();   

	}
         
}



function Rectangle(x,y,velocity){
	this.x = x;
	this.y = y;
	this.velocity = velocity;

	this.update = function(){

		this.y = this.y + this.velocity;

		if((clamp(this.x,(this.x+150),redDuet.x,15) && clamp(this.y,(this.y+30),redDuet.y,15)))
   		{
      	   	redDuet.color = 'yellow';
   		}
   		/*else
   		{
	        redDuet.color = 'red';
   		}
   		*/

   		if((clamp(this.x,(this.x+150),blueDuet.x,15) && clamp(this.y,(this.y+30),blueDuet.y,15)))
   		{
      	   	blueDuet.color = 'yellow';
   		}

   		/*else()
   		{
	        blueDuet.color = 'blue';
   		}
   		*/
   		
		this.draw();
	}

	this.draw = function(){
		c.beginPath();
		c.fillStyle = 'green';
        c.fillRect(this.x,this.y, 150, 30);
        c.fill();
        c.closePath(); 
	}


         
}

var blueDuet;
var redDuet;
var circle;

var rectArray = [];
var speed = 1.5;

function init(){

blueDuet = new Duet(200,600,Math.PI,'blue');
redDuet = new Duet(200,600,0,'red');
circle = new Circle();

num = 1;
blueDuet.update();
redDuet.update();
num = 2;

    x = randomIntFromRange(0, canvas.width-150);
    //if rectangle is exactly between 100-150 then it will block the circle itself 
	if(x>100 && x<125)
	{
		x = x - 50;
	}

	else if(x>125 && x<150)
	{
        x = x + 50;
	}

	rectArray.push(new Rectangle(x,-30,speed));
	
}


var timer = 0;
var maxTime = 250;
var timeLimit = 70;
var speedLimit = 3;

function gameLoop(){

	timer++;
  	c.clearRect(0,0,innerWidth,innerHeight);
 	
 	circle.update();
 	blueDuet.draw();
 	redDuet.draw();  


 	if(timer>maxTime)
 	{
 			x = randomIntFromRange(0, canvas.width-150);
    
			if(x>100 && x<125)
			{
				x = x - 60;
			}

			else if(x>125 && x<150)
			{
       		     x = x + 60;
			}

			//rectArray.push(new Rectangle(x,-30,speedLimit));
            // to check change >10 and %10 <=10 to >3 and %3 <=3 - perfect!
			if(rectArray.length >= 10)
			{ 
				if(rectArray.length % 10 == 0)
			 {
                speed = speed + 0.5;
                maxTime = maxTime - 50;
                if(speed>=speedLimit)
                {
                	speed = 5;
                }
                if(maxTime <= 100)
                {
                	maxTime = timeLimit;
                }
               rectArray.push(new Rectangle(x,-30,speed));
               rectArray.splice(0,1);
               redDuet.color = 'red';
               redDuet.draw();
               blueDuet.color = 'blue';
			   blueDuet.draw();
			 }

			else
			{
				rectArray.push(new Rectangle(x,-30,speed));
				rectArray.splice(0,1);
				redDuet.color = 'red';
				blueDuet.color = 'blue';
				redDuet.draw();
				blueDuet.draw();
			}

			}
			
			else if(rectArray.length <10)
			{
				rectArray.push(new Rectangle(x,-30,speed));
				redDuet.color = 'red';
				blueDuet.color = 'blue';
				redDuet.draw();
				blueDuet.draw();
			}

			timer = 0;
			//console.log(rectArray.length);
			
 	}

 	rectArray.forEach(rect => {
       
        rect.update();

    });

   requestAnimationFrame(gameLoop);

}

init();
gameLoop();