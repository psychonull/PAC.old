/*
 * actions player. 
 */

Pac.Action = function(owner, name, options){
	this.obj = owner;
	this.name = name;
	
	this.isLocked = (options && options.isLocked) || false;
	this.lockedMsg = (options && options.lockedMsg) || 'I cannot do that';
	this.removeOnRun = (options && options.removeOnRun !== undefined) ? options.removeOnRun : true;
	
	this.neededObj = (options && options.withObj);
	
	this.consequences = [];
	
	//Set default consequences for this action
	switch (this.name){
		case 'lookAt':
			this.consequences.push({name: 'showText', text: this.obj.name})
			break;
		case 'pickUp':
			this.consequences.push({name: 'addToInventory'})
			this.consequences.push({name: 'removeFromScene'})
			break;
	}
};

Pac.Action.prototype.run = function(cName, options){
	//used to override defaults, should be called as the first consequence
	//if want to keep defaults call directly to then
	this.consequences = [];
	return this.then(cName, options);
}

Pac.Action.prototype.then = function(cName, options){
	//append consequences
	if (!options) options = {};
	options.name = cName; 
	this.consequences.push(options);
	
	return this.obj.actions[this.name];
}

Pac.Action.prototype.execute = function(){
	var characterHand = Pac.getCharacter().getHand();
	
	if (!this.neededObj || (this.neededObj && characterHand && this.neededObj === characterHand)) {
		Pac.getCharacter().clearHand();
		
		for(var i=0; i< this.consequences.length; i++){
			var c = this.consequences[i];
			
			switch(c.name){
				case 'showText':
					Pac.commandBar.log(c.text || this.obj.name);
					break;
				case 'moveToScene':
					//Pac.changeToScene(c.sceneName || c.sceneIndex);
					break;
				case 'showInfo':
					Pac.modal.show(this.obj.name, c.resourceName);
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
				case 'animation':
					this.obj.setAnimation(c.animationName);
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
				case 'conversation':
					var conv = c.conversation;
					
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


