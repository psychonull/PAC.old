/**
 * will suscribe to canvas mouse/kb events and trigger 
 * actions depending on events.
 */

Pac.events = (function(){
	var canvas;
	
	var wrapEvent = function(type, point){
		return {
			'type': type,
			'point': point
		};
	};
	
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
	
	var objsToClick = [];
	
	var mouseClick = function(ev){
		var mPos = getCoords(ev),
			objsL = objsToClick.length,
			e = ev || window.event;
		
		for(var i=0; i< objsL; i++){
			var o = objsToClick[i];
			
			if (o.hasPoint(mPos)) {
				if (e.wich && e.wich === 3 || e.button && e.button === 2)
					o.fireEvent(wrapEvent('rightClick', mPos));
				else
					o.fireEvent(wrapEvent('click', mPos));
				break;
			}
		}
		return false;
	}
		
	return {
		init: function(canvasEle){
			canvas = canvasEle;
		},
		
		bindEvents: function(){			
			canvas.addEventListener('mousedown', mouseClick, false);
			canvas.addEventListener('contextmenu', function(e){
				if(e && e.preventDefault) e.preventDefault();
				return false;}, false);
		},
		
		unbindEvents: function(){
			canvas.removeEventListener('mousedown', mouseClick, false);
		},
		
		attach: function(obj){
			objsToClick.push(obj);
		},
		
		detach: function(obj){
			var i = objsToClick.length;
			 
			do {
				if (objsToClick[i] === obj) {
					objsToClick.splice(i);
					break;
				}
			} while (i--);
		}
		
	};
	
})();



