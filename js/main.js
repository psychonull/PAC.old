/*
 *	PAC 
 */
var Pac = Pac || {};
Pac = (function(){
	var canvas,
    ctx,
    canvasBuffer,
    bufferCtx,
		scenes = [],
		currScene = 0,
		requestAnimId = 0,
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
		
		ctx.drawImage(canvasBuffer, 0, 0);
	};
	
	return {
		getContext: function(){
			return bufferCtx;
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
			
			canvasBuffer = document.createElement('canvas');
			canvasBuffer.width = canvas.width;
			canvasBuffer.height = canvas.height;
			
			if (canvas.getContext){
		  	ctx = canvas.getContext('2d');
		  	bufferCtx = canvasBuffer.getContext('2d');
			} else {
			  throw "canvas is not supported!";
			}
			
			Pac.events.init(canvas);
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
			Pac.events.bindEvents();
			
			var loop = function(){
				update();
				draw();
				
				requestAnimId = window.requestAnimationFrame(loop);
			};
			
			loop();
			
			return this;
		},
		
		stop: function(){
			if (requestAnimId)
		    window.cancelAnimationFrame(requestAnimId);
		  requestAnimId = 0;
		  
		  return this;
		}
	};
	
})();



