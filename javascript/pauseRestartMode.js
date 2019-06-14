
var mouseDownX = null, mouseDownY = null;

var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');

var score = 0;
var rank = 0;
var start_time = 0;

var colorList = ['#abb91b', '#7f0d92', '#ef8f01'];
setMode = 0;
var spre = 0; //for obstacleRelease
spriteMode = 0;



var table = document.getElementById('cont');
var button = document.getElementById('button');
var resBtn = document.getElementById('restartBtn');
var pauseBtn = document.getElementById('pauseBtn');
var resumeBtn = document.getElementById('resumeBtn');

bgBtn.style.display = "none";
normBtn.style.display = "none";
hackBtn.style.display = "none";

hackPR.style.display = "none";
hack2player.style.display = "none";
hackCP.style.display = "none";
hackPU.style.display = "none";
hackSP.style.display = "none";


resBtn.style.display = 'inline';
table.style.display = "inline";
button.style.display = 'inline';
pauseBtn.style.display = 'inline';


var scoreTab = document.getElementById('scoreTable');

var pause = false;



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
    	localStorage.removeItem('sh'+i);
    	localStorage.removeItem('rh'+i);
    }
    document.location.reload();
}

function callPause()
{
  pause = true;
  
}

function restart()
{
  
  localStorage.removeItem('sh'+rank);
  localStorage.removeItem('rh'+rank);

  var rowCnt = scoreTab.rows.length;
  for(i=rank; i<rowCnt; i++)
  {
    var snext = localStorage.getItem('sh'+(i+1));
    var rnext = localStorage.getItem('rh'+(i+1));

    localStorage.setItem('sh'+ i,snext);
    localStorage.setItem('rh'+ i,rnext);
  }

  rank = rowCnt-1;
  localStorage.setItem('rh'+rank,'Trial '+rank);

  for(var i = rowCnt - 1; i > 0; i--)
  {
    scoreTab.deleteRow(i);
  }
 
  clearInterval(timerObs);
  clearInterval(timerScore);
  obstacleArray.splice(0,obstacleArray.length);
  obstacleArray = []
  ObstacleRelease();
  displayTable();
  score = 0;
  ScoreIncrease();
  
}

function resume()
{   
    pause = false;
    resumeBtn.style.display = 'none';
    obstacleArray.forEach(obstacle => {
      obstacle.velocity = 2;
    });
    
    canvas.onmousedown = myMouseDown;
    canvas.onmouseup = myMouseUp;
    
    ScoreIncrease();

    timerResume = setTimeout(function(){
    x=randomIntFromRange(canvas.width/2,canvas.width/2 + 50);
    var randColor = colorList[randomIndex(colorList)];
    obstacleArray.push(new Obstacle(x,-30,2,randColor));
  
    ObstacleRelease();
    
    },remaining[0]);
    
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


function ObstacleRelease(){

	
	timerObs = setInterval(function(){
    start_time = new Date().getTime();
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
	
   },3000);
}


function ScoreIncrease()
{
	timerScore = setInterval(function(){
        score = score + 1;
		document.getElementById('score'+ rank).innerHTML = score;
		localStorage.setItem('sh'+ rank,score);
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
		
	   while(score >= aboveScore)
	   {

          	var rPres =  nowRow.cells[0].childNodes[0].innerHTML;
          	var rTop =  aboveRow.cells[0].childNodes[0].innerHTML;
          	var sPres= score;
          	var sTop = aboveScore;
            
            rank = rank - 1;
          localStorage.setItem('sh'+ rank,sPres);
          localStorage.setItem('sh'+ (rank+1),sTop);

          localStorage.setItem('rh'+ rank,rPres);
          localStorage.setItem('rh'+ (rank+1),rTop);

        
          nowRow.cells[0].childNodes[0].innerHTML = localStorage.getItem('rh'+ (rank+1));
          aboveRow.cells[0].childNodes[0].innerHTML = localStorage.getItem('rh'+ (rank));

          nowRow.cells[1].childNodes[0].innerHTML = localStorage.getItem('sh'+ (rank+1));
          aboveRow.cells[1].childNodes[0].innerHTML = localStorage.getItem('sh'+ (rank));

          if(rank == 1)
          {
          	break;
          }

          nowRow = document.getElementById('row'+rank);
		  aboveRow = document.getElementById('row'+(rank-1));
		  aboveScore = aboveRow.cells[1].childNodes[0].innerHTML;
            
	     }
	   }
     }
   }

function displayTable()
{
	var a=1;
	var rowExist = localStorage.getItem('rh'+ a);
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
                element.innerHTML = localStorage.getItem('rh'+ a);

                td.appendChild(element);
                
            }
            else if (c==1) {
            	var element = document.createElement('p');
               
                element.innerHTML = localStorage.getItem('sh'+ a);
                element.id = 'score'+ (scoreTab.rows.length - 1);
                td.appendChild(element);
               }
        }

        a = a+1;
        rowExist = localStorage.getItem('rh'+ a);
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
        localStorage.setItem('sh'+ (scoreTab.rows.length - 1),score);
        localStorage.setItem('rh'+ (scoreTab.rows.length - 1),'Trial '+(scoreTab.rows.length - 1));



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

function pauseMousedown(e)
{
  //do nothing
}

function pauseMouseup(e)
{
  //do nothing
}

function gameOver()
  {
    
    clearInterval(timerScore);
    timerScore = null;
    clearInterval(timerObs);
    timerObs = null;
    setJS('tryAgainGame.js');
    
  }


let obstacleArray = []
let miniDuets = []


function initializehack(){
	
	canvas.onmousedown = myMouseDown;
  canvas.onmouseup = myMouseUp;

	redDuet.velocity = 0.1;
  blueDuet.velocity = 0.1;

  ObstacleRelease();
  displayTable();
  addRow();
  ScoreIncrease();

    
}

var remaining = []
var num = 0;
function gameloophack(){

	
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

      if(pause == false)
      {
        
        requestAnimationFrame(gameloophack);
      }   

      else if(pause == true)
      {
        remaining[num] = 3000 - (new Date() - start_time);
        num++;
        clearInterval(timerScore);
        clearInterval(timerObs); 
        obstacleArray.forEach(obstacle => {    
        obstacle.velocity = 0;

    });
        resumeBtn.style.display = 'inline';
        canvas.onmousedown = pauseMousedown;
        canvas.onmouseup = pauseMouseup;
    
        requestAnimationFrame(gameloophack);
      }
      
    
}

initializehack();
gameloophack();

