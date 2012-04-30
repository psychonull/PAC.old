/*
 * Scene containing background, objs, NPCs, characters
 * May know related scenes. 
 */


Pac.Scene = function(codScene, titleSc, resNameSc, options){
	var code = codScene,
		title = titleSc || 'Untitled Scene',
		resName = resNameSc,
		objects = [],
		path,
		startingPosition = options && options.startingPosition || {x:100, y:100},
					
		attrs = {
			x: 0,
			y: 0,
			width: function(){ return Pac.getSceneSize().width; },
			height: function(){ return Pac.getSceneSize().height; }
		};
	
	if (!code) throw "Scene MUST have a code";

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
	
	this.setPath = function(aPath){
		if (aPath.constructor != Pac.Path) throw "type of parameter obj MUST be typeof Pac.Path";
		
		path = aPath;
		return this;
	};
	
	this.getPath = function(){
		return path;
	}
	
	this.update = function() {
		//TODO: if the resource was not loaded, load it now with all belong objects
		
		if(Pac.getCharacter()) {
			Pac.getCharacter().update();
		}
			
		for(var i = 0, len = objects.length; i < len; ++i){
	  		objects[i].update();
	  	}
	};
	
	this.draw = function() {
	  	var ctx = Pac.getContext(),
	  		thingsToBeDrawn = [];
	  	if (!Pac.repository[resName]) throw 'Error - no image loaded for this Scene.'; //TODO: ask call loadOne?
	  		ctx.drawImage(Pac.repository[resName], attrs.x, attrs.y, attrs.width(), attrs.height());
		
		if(Pac.getCharacter()) {
			thingsToBeDrawn.push(Pac.getCharacter());
		}
		thingsToBeDrawn = thingsToBeDrawn.concat(objects).sort(function(a,b){ return a.getZIndex() > b.getZIndex();});
		for(var i = 0, len = thingsToBeDrawn.length; i < len; i++){
		 	thingsToBeDrawn[i].draw();       
		}

		path && path._draw(); //TODO: DELETE
	};
	
	this.getObjects = function() {
		return objects; //TODO: return a clone for security
	};
	
	this.getCode = function(){
		return code;
	};
	
	this.getStartingPosition = function(){
		return startingPosition;
	};
	
	this.setStartingPosition = function(point){
		startingPosition = point;
	};
	
	this.init = function(){
		for(var i = 0; i < objects.length; i++){
			Pac.events.attach(objects[i], 'click');	
		}
		if(path){
			Pac.events.attach(path);
		}
	}
	
	this.exit = function(){
		for(var i = 0; i < objects.length; i++){
			Pac.events.detach(objects[i], 'click');	
		}	
		if(path){
			Pac.events.detach(path);
		}
	}
	
};

