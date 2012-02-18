/*
 * Scene containing background, objs, NPCs, characters
 * May know related scenes. 
 */

Pac.Scene = function(title, options){
	
	this.title = title;
	
	this.ctx = null; //injected by PAC
	
	this.objects = [];
	
	//TODO: initial position of character.
};

Pac.Scene.prototype.addObj = function(obj){
	obj.ctx = this.ctx;
	this.objects.push(obj);
	return this;
}

Pac.Scene.prototype.update = function() {
	
	//update scene state
	
  var objs = this.objects,
  		i = objs.length;
  
  do {
  	obj[i].update();
  } while ( i-- );
  
};

Pac.Scene.prototype.draw = function() {
  
  //draw scene image
  
  var objs = this.objects,
  		i = objs.length;
  
  do {
  	obj[i].draw();
  } while ( i-- );
  
};



