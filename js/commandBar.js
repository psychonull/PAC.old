/*
 * will be the bar in the bottom will handle actions, char's inventory, 
 * and maybe text outputs after actions are triggered
 */

Pac.commandBar = (function(){
	var currentLog = "",
		commandActions = [];

	var attrs = {};
	
	return {
		init: function(){
			//maybe should recieve the actions that will be in the game
			var sizeBar = Pac.getCommandBarSize();
			var cbH = sizeBar.height;
			var cbY = Pac.getHeight() - cbH; 
			attrs = {
				x: 0,
				y: cbY,
				width: sizeBar.width,
				height: cbH,
				color: 'orange'
			};
			
			var allActions = Pac.coreActions;
			for(var i=0; i < allActions.length; i++){
				
				var cAct = new Pac.CommandAction(allActions[i], allActions[i],{
					x: (i*80) + 20,
					y: cbY + 30,
					width: 80,
					height: 30
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
			ctx.font  = 'normal 20px sans-serif';
			ctx.fillText(currentLog, attrs.x + 20, attrs.y + 5);
			ctx.restore();
		},
		log: function(message){
			currentLog = message;
		}
		
	};
	
})();
