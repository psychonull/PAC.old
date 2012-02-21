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
		Pac.CommandBar.update();
	};
	
	var draw = function(){
		scenes[currScene].draw();
		Pac.CommandBar.draw();
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
			
			Pac.Events.init(canvasId);
			
			return this;
		},
		
		addScene: function(scene){
			if (scene.constructor != Pac.Scene) throw "type of parameter scene MUST be typeof Pac.Scene";
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



