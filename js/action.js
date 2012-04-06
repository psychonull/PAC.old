/*
 * actions player. 
 */

Pac.Action = function(owner, nameAct, options){
	var obj = owner,
		name = nameAct,
	
		locked = (options && options.isLocked) || false,
		lockedMsg = (options && options.lockedMsg) || 'I cannot do that',
		removeOnRun = (options && options.removeOnRun !== undefined) ? options.removeOnRun : true,
	
		neededObj = (options && options.withObj),
		consequences = [];
	
	//Set default consequences for this action
	switch (name){
		case 'lookAt':
			consequences.push({name: 'showText', text: obj.name()})
			break;
		case 'pickUp':
			consequences.push({name: 'addToInventory'})
			consequences.push({name: 'removeFromScene'})
			break;
	}
	
	this.run = function(cName, opts){
		//used to override defaults, should be called as the first consequence
		//if want to keep defaults call directly to then
		consequences = [];
		return this.then(cName, opts);
	}
	
	this.then = function(cName, opts){
		//append consequences
		if (!opts) opts = {};
		opts.name = cName; 
		consequences.push(opts);
		
		return obj.getActions()[name];
	}
	
	this.execute = function(){
		var characterHand = Pac.getCharacter().getHand();
		
		if (!neededObj || (neededObj && characterHand && neededObj === characterHand)) {
			Pac.getCharacter().clearHand();
			
			for(var i=0; i< consequences.length; i++){
				var c = consequences[i];
				
				switch(c.name){
					case 'showText':
						Pac.commandBar.log(c.text || obj.name());
						break;
					case 'moveToScene':
						//Pac.changeToScene(c.sceneName || c.sceneIndex);
						break;
					case 'showInfo':
						Pac.modal.show(obj.name(), c.resourceName);
						break;
					case 'unlockAction':
						//TODO: change to Pac.Obj
					  var nObj = c.obj || obj;
						for (var act in nObj.getActions()){
							if (act === c.action){
								nObj.getActions()[act].lock(false);
								break;
							}
						}
						break;
					case 'putOnHand':
						Pac.getCharacter().setHand(obj);
						break;
					case 'animation':
						obj.setAnimation(c.animationName);
						break;
					case 'removeFromScene':
						Pac.getCurrentScene().removeObj(obj);
						break;
					case 'addToInventory':
						var nObj = c.obj || obj;
						Pac.getCharacter().pickUp(nObj);
						break;
					case 'removeFromInventory':
						Pac.getCharacter().removeObj(obj);
						break;
					case 'conversation':
						var conv = c.conversation;
						break;
				}
			}
			
			if (removeOnRun){
				obj.removeAction(this);
				//TODO: this.destroy();
			}
			
		} else {
			Pac.commandBar.log("It doesn't seems correct");
		}
	};
	
	this.lock = function(isLocked){		
		if (isLocked !== undefined) {
			locked = isLocked;
			return this;
		}
		else return locked;
	};
	
	this.getLockedMsg = function(){
		return lockedMsg;
	};
};
