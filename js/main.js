/*
 *	PAC 
 */

var Pac = {};

Pac.init = function(canvasId){
		this.canvas = document.getElementById(canvasId);
		
		if(!this.canvas) throw "There is no canvas with id " + canvasId;
		
		this.loopInterval = 50;
		this.scenes = [];
		this.currentScene = 0;
};

Pac.ctx = null;

/*(function(c) { 
		if (this.canvas.getContext){
		  return this.canvas.getContext('2d');
		} else {
		  throw "canvas is not supported!";
		} 
	})(this.canvas)
*/

Pac.width = 800;// (function(c) { return c.width; })(this.canvas);

Pac.height = 600; //	(function(c) { return c.height; })(this.canvas);

Pac.loopInterval = 50;

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





