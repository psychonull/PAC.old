/*
 * actions player. 
 */

Pac.Action = function(options){
	if (!options.obj) throw 'Pac.Obj is not present';
	this.obj = options.obj;
	
	this.isLocked = options.isLocked || false;
	this.lockedMsg = options.lockedMsg || 'I cannot do that';
	this.removeOnRun = (options.removeOnRun !== undefined) ? options.removeOnRun : true;
	
	this.neededObj = options.withObj;
	
	this.consequences = options.consequences || [];
};

Pac.Action.prototype.run = function(){
	var characterHand = Pac.getCharacter().getHand();
	
	if (!this.neededObj || (this.neededObj && characterHand && this.neededObj === characterHand)) {
		Pac.getCharacter().clearHand();
		
		for(var i=0; i< this.consequences.length; i++){
			var c = this.consequences[i];
			
			switch(c.type){
				case 'showText':
					Pac.commandBar.log(c.text || this.obj.name);
					break;
				case 'moveToScene':
					//Pac.changeToScene(c.name || c.index);
					break;
				case 'showInfo':
					Pac.showInfoDialog(this.obj.name, c.resourceName);
					break;
				case 'unlockAction':
				  var obj = c.obj || this.obj;
					for (var act in obj.actions){
						if (act === c.action){
							obj.actions[act].isLocked = false;
							break;
						}
					}
					break;
				case 'putOnHand':
					Pac.getCharacter().setHand(this.obj);
					break;
				case 'runAnimation':
					
					break;
				case 'removeFromScene':
					Pac.getCurrentScene().removeObj(this.obj);
					break;
				case 'addToInventory':
					var obj = c.obj || this.obj;
					Pac.getCharacter().pickUp(obj);
					break;
				case 'removeFromInventory':
					Pac.getCharacter().removeObj(this.obj);
					break;
			}
		}
		
		if (this.removeOnRun){
			for (var act in this.obj.actions){
				if (this.obj.actions[act] === this){
					delete this.obj.actions[act];
					break;
				}
			}
			//TODO: this.destroy();
		}
		
	} else {
		Pac.commandBar.log("It doesn't seems correct");
	}
};


