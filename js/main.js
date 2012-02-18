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


/*
var Pac = {};

Pac.init = function(canvasId){
		var canvas = document.getElementById(canvasId);
		
		if(!canvas) throw "There is no canvas with id " + canvasId;
		
		this.ctx = null;
		if (this.canvas.getContext){
		  this.ctx = this.canvas.getContext('2d');
		} else {
		  throw "canvas is not supported!";
		}
		
		this.width = canvas.width;
		this.height = canvas.height;
		
		this.loopInterval = 50;
		this.scenes = [];
		this.currentScene = 0;
};

Pac.addScene = function(scene){
	scene.ctx = this.ctx;
	this.scenes.push(scene);
	return this;
};

Pac.start = function(){
	
	(function loop(scp){
		scp.update();
		scp.draw();
		
		setTimeout(function() { loop(scp); }, scp.loopInterval);
	})(this);
	
};

Pac.update = function(){
	this.scenes[this.currentScene].update();
};

Pac.draw = function(){
	this.scenes[this.currentScene].draw();
}

*/



