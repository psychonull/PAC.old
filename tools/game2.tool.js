	// in the html:
	// -have a #output div/placeholder
	// -have a btn/link #clear

var getCoords = function(e){
		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		}
		else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		
		return {
			x: x * Pac.getResizeRate().x,
			y: y * Pac.getResizeRate().y
		}
	}
	
var mouseClick = function(ev){
		var mPos = getCoords(ev),
			e = ev || window.event;
		
		points.push(mPos);
		pointsToOutput()
		return false;
	}


var points = [];

function pointsToOutput(){
	document.getElementById('output').innerText = (JSON.stringify(points));
}

window.addEventListener('load', function(){
	
	document.getElementById('clear').addEventListener('click',function(){
		points = [];
		pointsToOutput();
	}, false);
	
	document.getElementById('canvas').addEventListener('mousedown', mouseClick, false);	
	
}, false);
