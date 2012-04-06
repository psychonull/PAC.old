/*
 * Scene containing background, objs, NPCs, characters
 * May know related scenes. 
 */


Pac.Scene = function(titleSc, resNameSc, options){
	var title = titleSc || 'Untitled Scene',
		resName = resNameSc,
		objects = [],
		paths = [],
	
		attrs = {
			x: 0,
			y: 0,
			width: function(){ return Pac.getSceneSize().width; },
			height: function(){ return Pac.getSceneSize().height; }
		};
	
	//TODO: initial position of character.
	
	this.addObj = function(obj){
		if (obj.constructor != Pac.Obj) throw "type of parameter obj MUST be typeof Pac.Obj";
		
		objects.push(obj);
		return this;
	};
	
	this.removeObj = function(obj){
		if (obj.constructor != Pac.Obj) throw "type of parameter obj MUST be typeof Pac.Obj";
		if (objects.indexOf(obj) === -1)
		  return this;
		  
		objects.splice(objects.indexOf(obj),1);
		return this;
	};
	
	this.addPath = function(path){
		if (path.constructor != Pac.Path) throw "type of parameter obj MUST be typeof Pac.Path";
		
		paths.push(path);
		return this;
	};
	
	this.update = function() {
		//TODO: if the resource was not loaded, load it now with all belong objects
		
	  for(var i = 0, len = objects.length; i < len; ++i){
	  	objects[i].update();
	  }
	   
	};
	
	this.draw = function() {
	  var ctx = Pac.getContext();
	  if (!Pac.repository[resName]) throw 'Error - no image loaded for this Scene.'; //TODO: ask call loadOne?
	  ctx.drawImage(Pac.repository[resName], attrs.x, attrs.y, attrs.width(), attrs.height());
	   
		for(var i = 0, len = objects.length; i < len; i++){
		 	objects[i].draw();       
		}
	};
	
	this.getObjects = function() {
		return objects; //TODO: return a clone for security
	}
	
};

