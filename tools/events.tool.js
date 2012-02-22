/**
 * will suscribe to canvas mouse/kb events and trigger 
 * actions depending on events.
 */

Pac.events = (function(){
	var canvas;
	
	var getCoords = function(e){
			  //this section is from http://www.quirksmode.org/js/events_properties.html
	    var targ;
	    if (!e)
	        e = window.event;
	    if (e.target)
	        targ = e.target;
	    else if (e.srcElement)
	        targ = e.srcElement;
	    if (targ.nodeType == 3) // defeat Safari bug
	        targ = targ.parentNode;
	
	    // jQuery normalizes the pageX and pageY
	    // pageX,Y are the mouse positions relative to the document
	    // offset() returns the position of the element relative to the document
	    var x = e.pageX - $(targ).offset().left;
	    var y = e.pageY - $(targ).offset().top;
	
	    return {"x": x, "y": y};
	}
	
	var objsToClick = [];
	
	var mouseClick = function(ev){
		var mPos = getCoords(ev),
			objsL = objsToClick.length;
		if(ObjSelector.currentStep === 0){
			ObjSelector.firstSet(mPos.x, mPos.y);
			ObjSelector.currentStep++;
		}
		else if(ObjSelector.currentStep === 1){
			ObjSelector.secondSet(mPos.x, mPos.y);
			ObjSelector.currentStep ++;
		}
		else if(ObjSelector.currentStep === 2){
			ObjSelector.coords.width = 0;
			ObjSelector.coords.height = 0;
			ObjSelector.firstSet(mPos.x, mPos.y);
			ObjSelector.currentStep = 1;
		}
		/*
		for(var i=0; i< objsL; i++){
			var o = objsToClick[i];
			var oa = o.attrs;
			
			if (oa.x < mPos.x && (oa.x + oa.width) > mPos.x 
				&& oa.y < mPos.y && (oa.y + oa.height > mPos.y)) {
					o.fireAction(Pac.currentAction);
					break;
				}
		}
		*/
	}
	
	return {
		init: function(canvasId){
			canvas = document.getElementById('canvas');
		},
		
		bindMouse: function(){			
			canvas.addEventListener('click', mouseClick, false);
		},
		
		unbindMouse: function(){
			canvas.removeEventListener('click', mouseClick, false);
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



