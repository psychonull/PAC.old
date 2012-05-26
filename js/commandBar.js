/*
 * will be the bar in the bottom will handle actions, char's inventory, 
 * and maybe text outputs after actions are triggered
 */

Pac.commandBar = (function(){
	var currentLog = "",
		commandActions = [];

	var attrs = {};
	
	var font = 'normal 20px sans-serif';
	
	return {
		init: function(options){
			//maybe should recieve the actions that will be in the game
			var configBar = Pac.getCommandBarConfig();
			var cbH = configBar.height;
			var cbY = Pac.getHeight() - cbH;
			attrs = {
				x: 0,
				y: cbY,
				width: configBar.width,
				height: cbH,
				color: configBar.color
			};
			
			var allActions = Pac.coreActions;
			font = (options && options.font) || font;
			for(var i=0; i < allActions.length; i++){
				
				var cAct = new Pac.CommandAction(allActions[i], allActions[i],{
					x: (i*80) + 20,
					y: cbY + 3,
					width: 80,
					height: 30,
					color: configBar.actionColor,
					colorSelected: configBar.actionColorSelect,
					font: font
				});
				
				commandActions.push(cAct);
			}
		},
		update: function(){
			for(var i=0; i < commandActions.length; i++){
				commandActions[i].update();
			}
		},
		draw: function(){
			var ctx = Pac.getContext();
			ctx.save();
			ctx.fillStyle = attrs.color;
			ctx.fillRect(attrs.x, attrs.y, attrs.width, attrs.height);
			ctx.restore();
			
			for(var i=0; i < commandActions.length; i++){
				commandActions[i].draw();
			}
			
			ctx.save();
			ctx.fillStyle = 'black';
			ctx.textBaseline = 'top';
			ctx.font  = font;
			ctx.fillText(currentLog, attrs.x + 20, attrs.y + 5);
			ctx.restore();
		},
		log: function(message){
			currentLog = message;
		}
	};
})();