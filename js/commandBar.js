/*
 * will be the bar in the bottom will handle actions, char's inventory, 
 * and maybe text outputs after actions are triggered
 */

Pac.CommandBar = (function(){
	var currentLog = "",
		commandActions = [];
	
	return {
		init: function(){
			//maybe should recieve the actions that will be in the game
			
			var allActions = Pac.CoreActions;
			for(var i=0; i < allActions.length; i++){
				commandAction.push(new Pac.CommandAction(allActions[i], allActions[i]));
			}
		},
		update: function(){
			
		},
		draw: function(){
			//TODO: draw currentMessage
			
			for(var i=0; i < commandActions.length; i++){
				commandActions[i].draw();
			}
		},
		log: function(message){
			currentLog = message;
		}
	};
	
})();
