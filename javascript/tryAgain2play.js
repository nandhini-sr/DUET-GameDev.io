
var back2menu = document.getElementById('back2menu');


nextBtn.style.display = 'inline';
gameOverBtn.style.display = 'inline';
bgBtn.style.display = 'inline';
back2menu.style.display = 'inline';
resBtn.style.display = 'none';
pauseBtn.style.display = 'none';
resumeBtn.style.display = 'none';

function setlooptry(){
	
  	c.clearRect(0,0,canvas.width,canvas.height);
  	requestAnimationFrame(setlooptry);
  	} 
  	setlooptry();

    