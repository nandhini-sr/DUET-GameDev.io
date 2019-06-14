
tryAgainBtn.style.display = 'inline';
gameOverBtn.style.display = 'inline';
bgBtn.style.display = 'inline';
affectionMeter.style.display = 'none';


function setlooptry(){
	
  	c.clearRect(0,0,canvas.width,canvas.height);

  	c.font = 'bold 35px Open Sans';
    c.fillStyle = 'black';
	c.textAlign = 'center';
	c.fillText('Score: ' + score,250,550);
    

  	requestAnimationFrame(setlooptry);
  	} 
  	setlooptry();
