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
		currScene,
		requestAnimId = 0,
		character,
		commandBarEnabled = true,
		commandBarColor = 'orange',
		commandBarHeight,
		mainTextManager,
		textConfig,
		textCommand;
	
	var update = function(){
		scenes[currScene].update();
		if(commandBarEnabled){
			Pac.commandBar.update();
		}
		Pac.modal.update();
		mainTextManager.update();
	};
	
	var draw = function(){
		scenes[currScene].draw();
		if(commandBarEnabled){
			Pac.commandBar.draw();
		}
		Pac.modal.draw();
		mainTextManager.draw();

		ctx.drawImage(canvasBuffer, 0, 0);
	};
	
	var indexOfScene = function(code){
		for(var i=0; i< scenes.length; i++){
			if (scenes[i].getCode() === code){
				return i;
			}
		}
		return -1;
	}
	
	return {
		getContext: function(){
			return ctx; //bufferCtx;
		}, 
		getWidth: function(){
			return canvas.width;
		},
		getHeight: function(){
			return canvas.height;
		},
		
		getSceneSize: function(){
			if (commandBarHeight == undefined){
				commandBarHeight = canvas.height * 0.2;
			}			
			return {
				width: canvas.width,
				height: commandBarEnabled ? canvas.height - commandBarHeight : canvas.height 
			};
		},
		
		getCommandBarSize: function(){
			return {
				width: canvas.width,
				height: canvas.height * 0.2
			};
		},

		getCommandBarConfig: function(){
			if (commandBarHeight == undefined){
				commandBarHeight = canvas.height * 0.2;
			}
			return {
				width: canvas.width,
				height: commandBarHeight,
				color: commandBarColor}
			;
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
			if(commandBarEnabled){
				Pac.commandBar.init(textCommand);	
			}
			else {
				Pac.currentAction = 'SingleAction';
			}
			Pac.modal.init();
			
			mainTextManager = new Pac.TextManager(textConfig);
			
			return this;
		},
		
		addScene: function(scene){
			if (scene.constructor != Pac.Scene) throw "type of parameter scene MUST be typeof Pac.Scene";
		
			if (indexOfScene(scene.getCode()) >= 0)
				throw "Scene with code " + code + " already exists";
			
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
		
		changeToScene: function (code){
			if(typeof code !== 'string')
				throw "Scene Code MUST be type of String";
			
			var idx = indexOfScene(code);
			if (idx === -1)
				throw "Scene with code " + code + " wasn't found";
			if(currScene !== undefined){
				scenes[currScene].exit();
			}
			currScene = idx;
			if(this.getCharacter()){
				if (scenes[currScene].getStartingPosition()){
					this.getCharacter().setPosition(scenes[currScene].getStartingPosition());
				}
				this.getCharacter().setPath(scenes[currScene].getPath());
				scenes[currScene].getPath().setEntity(this.getCharacter());
				scenes[currScene].init();
			} 
		},
		
		start: function(){
			if(currScene === undefined){
				throw "set a scene before starting";
			}
			this.stop(); // fix for F5, cancelAnim if there is one running
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
		},
		
		config: function(json){
			if (json.commandBarEnabled !== undefined){
				commandBarEnabled = json.commandBarEnabled;	
			}
			if (json.commandBarColor !== undefined){
				commandBarColor = json.commandBarColor;	
			}

			commandBarHeight = json.commandBarHeight;
			textConfig = json.text;
			textCommand = json.textCmd;
			
		},
		
		toggleCommandBar: function(){
			commandBarEnabled = !commandBarEnabled;
			if (commandBarEnabled === true){
				Pac.commandBar.init();	
			}
			return commandBarEnabled;
		},
		
		getMainTextManager: function(){
			return mainTextManager;
		}
		
	};
	
})();