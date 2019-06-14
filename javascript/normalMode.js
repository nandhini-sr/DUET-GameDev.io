
var mouseDownX = null, mouseDownY = null;

var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');

var colorList = ['#abb91b', '#7f0d92', '#ef8f01'];

var score = 0;
var rank = 0;

var move = 0;
var barValue = 0;
setMode = 0;
var spre = 0; //for obstacleRelease


var bgBtn = document.getElementById('bgBtn');
var normBtn = document.getElementById('normBtn');
var hackBtn = document.getElementById('hackBtn');
var table = document.getElementById('cont');
var button = document.getElementById('button');
var gameOverBtn = document.getElementById('gameOverBtn');
var tryAgainBtn = document.getElementById('tryAgainBtn');



bgBtn.style.display = "none";
normBtn.style.display = "none";
hackBtn.style.display = "none";
table.style.display = "inline";
button.style.display = 'inline';
gameOverBtn.style.display = 'none';


var scoreTab = document.getElementById('scoreTable');



function randomIntFromRange(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function randomIndex(arrayName){
  return (Math.floor(Math.random()*arrayName.length));
}

function clearLS()
{
	TotalTrials = scoreTab.rows.length;
	 for(var i=1; i<TotalTrials; i++)
    {
    	localStorage.removeItem('sn'+i);
    	localStorage.removeItem('rn'+i);
    }
    document.location.reload();
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
      
      if((clamp(this.x,(this.x+100),blueDuet.x,15) && clamp(this.y,(this.y+30),blueDuet.y,15)))
      {
            blueDuet.shatter();
      }
  }

}

function ObstacleRelease(maxTime,maxSpeed){

	
	timerObs = setInterval(function(){
    
    spre ++;
    if(spre%2==0)
    {
      x=randomIntFromRange(canvas.width/2 - 150,canvas.width/2 - 100);
    }
    else
    {
      x=randomIntFromRange(canvas.width/2,canvas.width/2 + 50);
    }

    var randColor = colorList[randomIndex(colorList)];
    obstacleArray.push(new Obstacle(x,-30,2,randColor));
    

	if(obstacleArray.length > 7) //after 8 obs increase speed
	{
		obstacleArray.splice(0,5);
		SpeedIncrease();
	}
	

	}, maxTime);

   }



function SpeedIncrease()
{
	clearInterval(timerObs);
	speed = speed + 0.5;
	time = 6000/speed;
	if(speed>=10)
	{
		speed = 10;
	}
    if(time<=600)
    {
    	time = 600;
    }
	ObstacleRelease(time,speed);

}

function ScoreIncrease()
{
	timerScore = setInterval(function(){
        score = score + 1;
		document.getElementById('score'+ rank).innerHTML = score;
		localStorage.setItem('sn'+ rank,score);
		moveAboveTable();

	}, 1000);
}

function moveAboveTable()
{
	
    var numTrial = scoreTab.rows.length - 1;
	if(numTrial>=2)
	{
       if(rank!=1)
       {


        var nowRow = document.getElementById('row'+rank);
		var aboveRow = document.getElementById('row'+(rank-1));
		var aboveScore = aboveRow.cells[1].childNodes[0].innerHTML;
		/*console.log(rank);
		console.log(scoreTab);
		console.log(nowRow);
		console.log(aboveRow);
		console.log('score' + score);
        console.log('aboveScore' + aboveScore);*/

	   while(score >= aboveScore)
	   {

          	var rPres =  nowRow.cells[0].childNodes[0].innerHTML;
          	var rTop =  aboveRow.cells[0].childNodes[0].innerHTML;
          	var sPres= score;
          	var sTop = aboveScore;
            
            rank = rank - 1;
          localStorage.setItem('sn'+ rank,sPres);
          localStorage.setItem('sn'+ (rank+1),sTop);

          localStorage.setItem('rn'+ rank,rPres);
          localStorage.setItem('rn'+ (rank+1),rTop);

        
          nowRow.cells[0].childNodes[0].innerHTML = localStorage.getItem('rn'+ (rank+1));
          aboveRow.cells[0].childNodes[0].innerHTML = localStorage.getItem('rn'+ (rank));

          nowRow.cells[1].childNodes[0].innerHTML = localStorage.getItem('sn'+ (rank+1));
          aboveRow.cells[1].childNodes[0].innerHTML = localStorage.getItem('sn'+ (rank));

          if(rank == 1)
          {
          	break;
          }

          nowRow = document.getElementById('row'+rank);
		  aboveRow = document.getElementById('row'+(rank-1));
		  aboveScore = aboveRow.cells[1].childNodes[0].innerHTML;
            
            console.log('rank'+rank); 
	     }
	   }
     }
   }

function displayTable()
{
	var a=1;
	var rowExist = localStorage.getItem('rn'+ a);
	while(rowExist)
	{
        var rowCnt = scoreTab.rows.length;        
        var tr = scoreTab.insertRow(rowCnt);     
        tr.id = 'row'+rowCnt;

        for (var c = 0; c < arrHead.length; c++) {
            var td = document.createElement('td');          
            td = tr.insertCell(c);

            if (c == 0) {  

            	var element = document.createElement('p');
                index = scoreTab.rows.length - 1;
                element.innerHTML = localStorage.getItem('rn'+ a);

                td.appendChild(element);
                
            }
            else if (c==1) {
            	var element = document.createElement('p');
               
                element.innerHTML = localStorage.getItem('sn'+ a);
                element.id = 'score'+ (scoreTab.rows.length - 1);
                td.appendChild(element);
               }
        }

        a = a+1;
        rowExist = localStorage.getItem('rn'+ a);
	}
}

function addRow() {
        
        var rowCnt = scoreTab.rows.length;        
        var tr = scoreTab.insertRow(rowCnt);      
        tr.id = "row"+rowCnt;

        for (var c = 0; c < arrHead.length; c++) {
            var td = document.createElement('td');          
            td = tr.insertCell(c);

            if (c == 0) {  

            	var element = document.createElement('p');
                index = scoreTab.rows.length - 1;
                element.innerHTML = 'Trial '+ index;

                td.appendChild(element);
               
                
            }
            else if (c==1) {
            	var element = document.createElement('p');
               
                element.innerHTML = score;
                element.id = 'score'+ (scoreTab.rows.length - 1);
                td.appendChild(element);
               
            }
        }

        rank = scoreTab.rows.length - 1;
        localStorage.setItem('sn'+ (scoreTab.rows.length - 1),score);
        localStorage.setItem('rn'+ (scoreTab.rows.length - 1),'Trial '+(scoreTab.rows.length - 1));



    }


let obstacleArray = []
let speed = 2;
let time = 3000;
let miniDuets 


function initialize(){

	obstacleArray = []
	miniDuets = []
	
	canvas.onmousedown = myMouseDown;
  canvas.onmouseup = myMouseUp;
  
  blueDuet.velocity = 0.1;
  redDuet.velocity = 0.1;
	

  ObstacleRelease(time,speed);
  displayTable();
  addRow();
  ScoreIncrease();

    
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
    clearInterval(timerObs);
    timerObs = null;
		setJS('tryAgainGame.js');
		
	}


function gameloop(){
	
  	c.clearRect(0,0,canvas.width,canvas.height); 

  	obstacleArray.forEach(obstacle => {
       
        obstacle.update();

    });

    circle.draw();
 	redDuet.draw();
 	blueDuet.draw(); 

    miniDuets.forEach((miniDuet,index) => {
  		miniDuet.update();
  		if(miniDuet.ttl == 0)
  		{
  			miniDuets.splice(index,1);
  			gameOver();
  		}
  	})
    
    c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
	c.textAlign = 'center';
	c.fillText('Score: ' + score,350,100);


    requestAnimationFrame(gameloop);
}


initialize();
gameloop();

