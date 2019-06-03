
var tryAgainBtn = document.getElementById('tryAgainBtn');
tryAgainBtn.style.display = 'inline';
bgBtn.style.display = 'inline';
resBtn.style.display = 'none';
pauseBtn.style.display = 'none';
resumeBtn.style.display = 'none';
imageBtn.style.display = 'none';

function setlooptry(){
	
  	c.clearRect(0,0,canvas.width,canvas.height);
  	requestAnimationFrame(setlooptry);
  	} 
  	setlooptry();

    