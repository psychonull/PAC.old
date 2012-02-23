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
		character,
		itemInfo;
		
	var getModalSize = function(){
		var m = 0.2;
		return {
			outWidth: canvas.width,
			outHeight: canvas.height,
			inWidth: canvas.width * (1 - (m * 2)),
			inHeight: canvas.height * (1 - (m * 2)),
			margin: {
				x: canvas.width * m,
				y: canvas.height * m
			}
		};
	};
	
	var update = function(){
		scenes[currScene].update();
		Pac.commandBar.update();
		if(character) {
			character.update();
		}
	};
	
	var draw = function(){
		scenes[currScene].draw();
		Pac.commandBar.draw();
		if(character) {
			character.draw();
		}
		
		if (itemInfo){
			ctx.save();
			ctx.fillStyle = 'rgba(0,0,0,0.7)';
			var s = getModalSize();
			ctx.fillRect(0, 0, s.outWidth, s.outHeight);
			ctx.drawImage(Pac.Repository[itemInfo.resName], s.margin.x, s.margin.y, s.inWidth, s.inHeight);
			
			ctx.fillStyle = 'red';
			ctx.fillRect(itemInfo.cl.attrs.x, itemInfo.cl.attrs.y, itemInfo.cl.attrs.width , itemInfo.cl.attrs.height);
			
			ctx.textBaseline = 'top';
			ctx.fillStyle = 'white';
			ctx.font  = 'normal 30px sans-serif';
			ctx.fillText('X', itemInfo.cl.attrs.x + 4, itemInfo.cl.attrs.y + 2);
			
			ctx.restore();
		}
	}
	
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
		
		showInfoDialog: function(name, resName){
			var s = getModalSize();
			var that = this;
			var closeLnk = {
				attrs:{
					x: (s.inWidth + s.margin.x) - 15,
					y: s.margin.y - 15,
					width: 30,
					height: 30
				},
				doAction: function(){
					that.hideInfoDialog();
				}
			};
			
			itemInfo = {
				desc: name,
				resName: resName,
				cl: closeLnk
			};
			
			Pac.events.attach(closeLnk, 'click');
		},

		hideInfoDialog: function(){
			itemInfo = null;
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
			
			return this;
		},
		
		addScene: function(scene){
			if (scene.constructor != Pac.Scene) throw "type of parameter scene MUST be typeof Pac.Scene";
			scenes.push(scene);
			return this;
		},
		
		createCharacter: function(charac){
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



