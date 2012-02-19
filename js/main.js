/*
 *	PAC 
 */

var Pac = (function(){
	var canvas,
	    ctx,
			scenes = [],
			currScene = 0,
			loopInterval = 50,
			timer = null;
	
	var update = function(){
		scenes[currScene].update();
	};
	
	var draw = function(){
		scenes[currScene].draw();
	}
	
	return {
		getContext: function(){
			return ctx;
		}, 
		getWidth: function(){
			return canvas.width;
		},
		getHeight: function(){
			return canvas.height;
		},

		init: function(canvasId){
			canvas = document.getElementById(canvasId);
			if(!canvas) throw "There is no canvas with id " + canvasId;
			
			if (canvas.getContext){
		  	ctx = canvas.getContext('2d');
			} else {
			  throw "canvas is not supported!";
			}
			
			return this;
		},
		
		addScene: function(scene){
			//TODO: check if it is typeof Scene
			scenes.push(scene);
			return this;
		},
		
		getScenes: function(){
			return scenes;
		},
		
		start: function(){
			if (timer) clearTimeout(timer);
			var loop = function(){
				update();
				draw();
				timer = setTimeout(loop, loopInterval);
			};
			loop();
			return this;
		}
	};
	
})();



