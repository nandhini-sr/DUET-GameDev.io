

var canvas = document.querySelector('canvas'); 
canvas.height = window.innerHeight; 
var c = canvas.getContext('2d');


var bgBtn = document.getElementById('bgBtn');
var normBtn = document.getElementById('normBtn');
var hackBtn = document.getElementById('hackBtn');
var image = document.getElementById('imageBtn');

bgBtn.style.display = "none";
normBtn.style.display = "none";
hackBtn.style.display = "none";
imageBtn.style.display = 'inline';

function imageloop(){
	
  	c.clearRect(0,0,canvas.width,canvas.height);
  	requestAnimationFrame(imageloop);
  	} 
  imageloop();
