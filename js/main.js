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
}

Pac.prototype.init = function(){
	//TODO: load images, on complete-callback create context 
	
	if (this.canvas.getContext){
	  this.ctx = this.canvas.getContext('2d');
	} else {
	  throw "canvas is not supported!";
	}
}

Pac.prototype.addScene = function(scene){
	this.scenes.push(scene);
}

Pac.prototype.addObj = function(obj){
	
}


