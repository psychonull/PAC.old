/*
 * Scene containing background, objs, NPCs, characters
 * May know related scenes. 
 */

Pac.Scene = function(title, resName, options){
	
	this.title = title || 'Untitled Scene';
	this.objects = [];
	this.resName = resName;
	
	this.attrs = {
		x: 0,
		y: 0,
		width: Pac.getWidth,
		height: Pac.getHeight
	};
	
	//TODO: initial position of character.
};

Pac.Scene.prototype.addObj = function(obj){
	if (obj.constructor != Pac.Obj) throw "type of parameter obj MUST be typeof Pac.Obj";
	
	this.objects.push(obj);
	return this;
}

Pac.Scene.prototype.update = function() {
	
	//update scene state
	//TODO: if the resource was not loaded, load it now with all belong objects
	
  var objs = this.objects,
  		i = objs.length;
  
  do {
  	objs[i].update();
  } while ( i-- );
  
};

Pac.Scene.prototype.draw = function() {
  
  //draw scene image (this.resource)
  
  var objs = this.objects,
  		i = objs.length;
  
  do {
  	objs[i].draw();
  } while ( i-- );
  
};



