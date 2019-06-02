var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');

class Circleset
{
	constructor(x,y,radius)
	{
		this.x = x;
		this.y = y;
		this.radius = radius
	}
	draw()
	{
	   c.beginPath();
       c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
       c.StrokeStyle = 'black';
       c.stroke();
       c.closePath(); 	
	}

}

class Duetset
{
	constructor(x,y,radians,color,radius)
	{
		this.radians = radians;
		this.x = x + Math.cos(this.radians)*50;
	    this.y = y;
	    this.radius = radius;
		this.color = color;
		this.velocity = 0.05;
		this.centerX = x;
		this.centerY = y;
	}

	draw()
	{
	   c.beginPath();
	   c.fillStyle = this.color;
       c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
       c.fill();
       c.closePath(); 	
	}	

	update()
	{
		this.radians +=this.velocity;
        this.x = this.centerX + Math.cos(this.radians)*50;
        this.y = this.centerY + Math.sin(this.radians)*50; 
        this.draw();
	}
	
}

let redDuetset;
let blueDuetset;
let circleset;

function initializeset(){

	circleset = new Circleset(canvas.width/2,canvas.height - 100,50);
    circleset.draw();

    redDuetset = new Duetset(canvas.width/2,canvas.height - 100,0,'red',15);
    redDuetset.draw();
    blueDuetset = new Duetset(canvas.width/2,canvas.height - 100,Math.PI,'blue',15);
    blueDuetset.draw();
    
}

function setloop(){
	
  	c.clearRect(0,0,canvas.width,canvas.height); 

    circleset.draw();
 	redDuetset.update();
 	blueDuetset.update(); 

    requestAnimationFrame(setloop);
}

initializeset();
setloop();