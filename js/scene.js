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

Pac.Scene.prototype.removeObj = function(obj){
	if (obj.constructor != Pac.Obj) throw "type of parameter obj MUST be typeof Pac.Obj";
	if (this.objects.indexOf(obj) === -1)
	  return this;
	this.objects.splice(this.objects.indexOf(obj),1);
	return this;
}

Pac.Scene.prototype.update = function() {
	
	//update scene state
	//TODO: if the resource was not loaded, load it now with all belong objects
	
  for(var i = 0, len = this.objects.length; i < len; ++i){
  	this.objects[i].update();
  }
   
};

Pac.Scene.prototype.draw = function() {
  var ctx = Pac.getContext();
  if (!Pac.Repository[this.resName]) throw 'Error - no image loaded for this Scene.'; //TODO: ask call loadOne?
  ctx.drawImage(Pac.Repository[this.resName],this.attrs.x,this.attrs.y, this.attrs.width(), this.attrs.height() * 0.8);
   
   for(var i = 0, len = this.objects.length; i < len; i++){
        this.objects[i].draw();       
   } 
   
};



