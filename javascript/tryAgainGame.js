
var tryAgainBtn = document.getElementById('tryAgainBtn');
tryAgainBtn.style.display = 'inline';
bgBtn.style.display = 'inline';

function setlooptry(){
	
  	c.clearRect(0,0,canvas.width,canvas.height);
  	requestAnimationFrame(setlooptry);
  	} 
  	setlooptry();

    