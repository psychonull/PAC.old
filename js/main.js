/*
 *	PAC 
 */

var Pac = function(canvasId){
	this.canvas = document.getElementById(canvasId);
	
	if(!this.canvas) throw "There is no canvas with id " + canvasId;
	
	this.screenSize = {
		width: (function(c) { return c.width; })(this.canvas),
		height:	(function(c) { return c.height; })(this.canvas),
	};
	
	this.ctx = null;
	this.loopInterval = 50;
	
	this.scenes = [];
	this.currentScene = 0;
}

Pac.prototype.init = function(){
	if (this.canvas.getContext){
	  this.ctx = this.canvas.getContext('2d');
	} else {
	  throw "canvas is not supported!";
	}
}

Pac.prototype.addScene = function(scene){
	scene.ctx = this.ctx;
	this.scenes.push(scene);
	return this;
}

Pac.prototype.start = function(){
	
	(function loop(scp){
		scp.update();
		scp.draw();
		
		setTimeout(function() { loop(scp); }, scp.loopInterval);
	})(this);
	
}

Pac.prototype.update = function(){
	this.scenes[this.currentScene].update();
}

Pac.prototype.draw = function(){
	this.scenes[this.currentScene].draw();
}





