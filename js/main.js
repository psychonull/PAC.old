/*
 *	PAC 
 */

var Pac = (function(){
	var canvas,
    ctx,
		scenes = [],
		currScene = 0,
		loopInterval = 50,
		timer = null,
		character;
	
	var update = function(){
		scenes[currScene].update();
		Pac.commandBar.update();
		if(character) {
			character.update();
		}
		Pac.modal.update();
	};
	
	var draw = function(){
		scenes[currScene].draw();
		Pac.commandBar.draw();
		if(character) {
			character.draw();
		}
		Pac.modal.draw();
	};
	
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
		
		getSceneSize: function(){
			return {
				width: canvas.width,
				height: canvas.height * 0.8
			};
		},
		
		getCommandBarSize: function(){
			return {
				width: canvas.width,
				height: canvas.height * 0.2
			};
		},
		
		init: function(canvasId){
			canvas = document.getElementById(canvasId);
			if(!canvas) throw "There is no canvas with id " + canvasId;
			
			if (canvas.getContext){
		  	ctx = canvas.getContext('2d');
			} else {
			  throw "canvas is not supported!";
			}
			
			Pac.events.init(canvasId);
			Pac.events.bindMouse();
			Pac.commandBar.init();
			Pac.modal.init();
			
			return this;
		},
		
		addScene: function(scene){
			if (scene.constructor != Pac.Scene) throw "type of parameter scene MUST be typeof Pac.Scene";
			scenes.push(scene);
			return this;
		},
		
		createCharacter: function(charac){
			if (charac.constructor != Pac.Character) throw "type of parameter character MUST be typeof Pac.Character";
			character = charac;
			return this;
		},
		
		getCharacter : function(){
			return character;	
		},
		
		getCurrentScene: function(){
			return scenes[currScene];
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



