var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');

var setMode = 1;
var normalMode = 0;

var spriteMode = 0;
var currentFrame; //for sprites

var HFMode = 0;
var HPU = 0; //for invincible 


class Circle
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
	   c.StrokeStyle = 'black';
       c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
       c.stroke();
       c.closePath(); 	
	}

}

class Duet
{
	constructor(x,y,radians,color,radius,spriteNum)
	{
		this.radians = radians;
		this.x = x + Math.cos(this.radians)*50;
	  this.y = y;
	  this.radius = radius;
		this.color = color;
		this.velocity = 0.05;
		this.centerX = x;
		this.centerY = y;
		this.radnum = 50; // for closeUp
    this.spriteNum = spriteNum;
	}

	draw()
	{
	  	c.beginPath();
	    c.fillStyle = this.color;
      c.arc(this.x,this.y,this.radius,0,Math.PI * 2,true);
      c.fill();
      c.closePath();

      if(spriteMode)
      { 
               
        if(this.spriteNum == 1)//boy
        {
        var srcXu;
        var srcXd;
        var srcY;

        var sheetWidthUp = 534;
        var sheetHeightUp = 216;

        var sheetWidthdown = 513;
        var sheetHeightdown = 214;

        var cols = 6;

        var widthUp = sheetWidthUp/cols;
        var heightUp = sheetHeightUp;

        var widthdown = sheetWidthdown/cols;
        var heightdown = sheetHeightdown;

        if(this.y<650)
         {

          if(this.x>=200 && this.x<216.7)
          {
          currentFrame = 1;
          srcXu = currentFrame * widthUp;
          srcY = 5;

          c.drawImage(upr,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=216.7 && this.x<233.4)
          {
          currentFrame = 2;
          srcXu = currentFrame * widthUp;
          srcY = 5;
          c.drawImage(upr,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=233.4 && this.x<250.1)
          {
            currentFrame = 3;
          srcXu = currentFrame * widthUp;
          srcY = 5;
          c.drawImage(upr,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }
          
          else if(this.x>=250.1 && this.x<266.8)
          {
           
           currentFrame = 4;
          srcXu = currentFrame * widthUp;
          srcY = 5;
          c.drawImage(upr,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=266.8 && this.x<283.5)
          {
            
            currentFrame = 4;
          srcXu = currentFrame * widthUp;
          srcY = 5;
          c.drawImage(upr,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=283.5 && this.x<=300)
          {
            
            currentFrame = 5;
          srcXu = currentFrame * widthUp;
          srcY = 5;
          c.drawImage(upr,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }
         }
          


         else if(this.y>=650)
         {
         
         if(this.x>=200 && this.x<216.7)
          {
          currentFrame = 1;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(downr,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=216.7 && this.x<233.4)
          {
          currentFrame = 2;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(downr,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=233.4 && this.x<250.1)
          {
            currentFrame = 3;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(downr,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }
          
          else if(this.x>=250.1 && this.x<266.8)
          {
           
           currentFrame = 4;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(downr,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=266.8 && this.x<283.5)
          {
            
            currentFrame = 4;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(downr,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=283.5 && this.x<=310)
          {
            
            currentFrame = 5;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(downr,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }



         }
        }

        else if(this.spriteNum == 2)//girl
        {

        var srcXu;
        var srcXd;
        var srcY;

        var sheetWidthUp = 397;
        var sheetHeightUp = 126;

        var sheetWidthdown = 398;
        var sheetHeightdown = 124;

        var cols = 6;

        var widthUp = sheetWidthUp/cols;
        var heightUp = sheetHeightUp;

        var widthdown = sheetWidthdown/cols;
        var heightdown = sheetHeightdown;

        if(this.y<650)
         {

          if(this.x>=200 && this.x<216.7)
          {
          currentFrame = 1;
          srcXu = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(up,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=216.7 && this.x<233.4)
          {
          currentFrame = 2;
          srcXu = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(up,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=233.4 && this.x<250.1)
          {
            currentFrame = 3;
          srcXu = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(up,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }
          
          else if(this.x>=250.1 && this.x<266.8)
          {
           
           currentFrame = 4;
          srcXu = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(up,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=266.8 && this.x<283.5)
          {
            
            currentFrame = 4;
          srcXu = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(up,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=283.5 && this.x<=300)
          {
            
            currentFrame = 5;
          srcXu = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(up,srcXu,srcY,widthUp,heightUp,this.x-15,this.y-15,50,70);
          }
         }
          


         else if(this.y>=650)
         {
         
         if(this.x>=200 && this.x<216.7)
          {
          currentFrame = 1;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(down,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=216.7 && this.x<233.4)
          {
          currentFrame = 2;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(down,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=233.4 && this.x<250.1)
          {
            currentFrame = 3;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(down,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }
          
          else if(this.x>=250.1 && this.x<266.8)
          {
           
           currentFrame = 4;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(down,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=266.8 && this.x<283.5)
          {
            
            currentFrame = 4;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(down,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }

          else if(this.x>=283.5 && this.x<=310)
          {
          currentFrame = 5;
          srcXd = currentFrame * widthUp;
          srcY = 0;
          c.drawImage(down,srcXd,srcY,widthdown,heightdown,this.x-15,this.y-15,50,70);
          }
         }
        } 
      }    //end of spriteMode  	
	  }	//end of draw

	update()
	{
		this.radians +=this.velocity;
        this.x = this.centerX + Math.cos(this.radians)*50;
        this.y = this.centerY + Math.sin(this.radians)*50;
        this.draw();
       
	}
    
	clockwiseRotate()
	{
		
		this.radians +=this.velocity;
        this.x = this.centerX + Math.cos(this.radians)*50;
        this.y = this.centerY + Math.sin(this.radians)*50; 
	}

	AnticlockwiseRotate()
	{
		
		this.radians -=this.velocity;
        this.x = this.centerX + Math.cos(this.radians)*50;
        this.y = this.centerY + Math.sin(this.radians)*50;
	}

  comeCloser()
  {
    this.radnum = this.radnum - 0.3;
    if(this.radnum>=0)
    {
            
      this.radians +=this.velocity;
      this.x = this.centerX + Math.cos(this.radians)*this.radnum;
      this.y = this.centerY + Math.sin(this.radians)*this.radnum;
    }    
  }
    
    horlicksPowerUp()
    {
      for(var i=0; i<100; i++)
      {
        c.save();
       c.beginPath();
       c.strokeStyle = this.color;
       c.moveTo(this.x,this.y);
       c.lineTo(this.x+28.3,this.y+28.3);
       c.moveTo(this.x,this.y);
       c.lineTo(this.x-28.3,this.y-28.3);
       c.moveTo(this.x,this.y);
       c.lineTo(this.x+28.3,this.y-28.3);
       c.moveTo(this.x,this.y);
       c.lineTo(this.x-28.3,this.y+28.3);
       c.moveTo(this.x,this.y);

       c.lineTo(this.x+40,this.y);
       c.moveTo(this.x,this.y);
       c.lineTo(this.x,this.y+40);
       c.moveTo(this.x,this.y);
       c.lineTo(this.x-40,this.y);
       c.moveTo(this.x,this.y);
       c.lineTo(this.x,this.y-40);
       c.stroke();
       c.closePath();
       c.restore(); 
       }
        
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x,this.y,this.radius*2,0,Math.PI * 2,true);
        c.fill();
        c.closePath();
        
  
        c.font = 'bold 25px Open Sans';
        c.fillStyle = 'black';
        c.textAlign = 'center';
        c.fillText("I'm invincible",220,300);
        

        setTimeout(function(){
          HPU = 0;
        },5000)
        
       
    }

    flightPowerUp()
    {

        this.velocity = this.velocity + 0.0008;
        console.log(this.velocity);

      c.font = 'bold 25px Open Sans';
      c.fillStyle = 'black';
      c.textAlign = 'center';
      c.fillText("Duet Speed Increase",220,400);
    }

    shatter(){
     
     this.radius = 0;
    
     for(let i=0; i<2; i++)
      {
          var dx = randomIntFromRange(-2,2);
          var dy = randomIntFromRange(-5,5);
          miniDuets.push(new MiniDuet(this.x, this.y,dx,dy,2,this.color));
      }

     }

     spriteCollided()
     {
      if(this.y<650)
      {
       this.velocity = 0;
       if(this.spriteNum == 1)
       {
        c.drawImage(hitru,this.x-15,this.y-15,50,70);
       }
       else if(this.spriteNum == 2)
       {
        c.drawImage(hitpu,this.x-15,this.y-15,50,70);
       }

       setTimeout(function()
       {
        gameOver();
       },3000);
     }

      else if(this.y>=650)
      {
       this.velocity = 0;
       if(this.spriteNum == 1)
       {
        c.drawImage(hitrd,this.x-15,this.y-15,50,70);
       }
       else if(this.spriteNum == 2)
       {
        c.drawImage(hitpd,this.x-15,this.y-15,50,70);
       }

       setTimeout(function()
       {
        gameOver();
       },3000);
      }
     }
    
    	
}

let redDuet;
let blueDuet;
let circle;

function initializeset(){

	circle = new Circle(canvas.width/2,canvas.height - 100,50);
  circle.draw();   
  blueDuet = new Duet(canvas.width/2,canvas.height - 100,Math.PI,'blue',15,1); //b=1
  blueDuet.draw();
  redDuet = new Duet(canvas.width/2,canvas.height - 100,0,'red',15,2);//r=2
  redDuet.draw();
    
}

function setloop(){

  if(setMode == 1)
    {
  	c.clearRect(0,0,canvas.width,canvas.height); 
    circle.draw();
    redDuet.update();
 	  blueDuet.update();
    requestAnimationFrame(setloop);
    }
 	     
}

initializeset();
setloop();