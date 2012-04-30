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
		consequences = [],
		currDef = null,
		currentConsequence = 0;
	
	var that = this;
	var newDeferred = function(){
		currDef = new Deferred();
		currDef.then(function(){
			currentConsequence++;
			
			if (currentConsequence < consequences.length) {
				newDeferred();
				that.execute();
			} 
			else {
				if (removeOnRun){
					obj.removeAction(that);
					currDef = null;
					//TODO: this.destroy();
				}
				else {
					currentConsequence = 0
					newDeferred();
				}
			}
		});
	};
	
	consequences.push({name: 'moveCharacter'});
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
	
	if (!currDef)
			newDeferred();
	
	this.run = function(cName, opts){
		//used to override defaults, should be called as the first consequence
		//if want to keep defaults call directly to then
		consequences = [];
		consequences.push({name: 'moveCharacter'});
		newDeferred();
		return this.then(cName, opts);
	};
	
	this.then = function(cName, opts){
		//append Syncronous consequences
		if (!opts) opts = {};
		opts.name = cName; 
		consequences.push(opts);
		
		return obj.getActions()[name];
	};
	
	this.and = function(cName, opts){
		//append Asyncronous consequences 
		if (!opts) opts = {};
		opts.name = cName;
		
		var cBefore = consequences.length - 1;
		if (cBefore >= 0)
			consequences[cBefore].async = true;
			
		consequences.push(opts);
		
		return obj.getActions()[name];
	};
	
	this.execute = function(){
		var that = this;
		var characterHand = Pac.getCharacter().getHand();
		
		if (!neededObj || (neededObj && characterHand && neededObj === characterHand)) {
			Pac.getCharacter().clearHand();
			
			var c = consequences[currentConsequence];
			
			switch(c.name){
				case 'showText':
					Pac.commandBar.log(c.text || obj.name());
					this.setNext();
					break;
				case 'moveToScene':
					Pac.changeToScene(c.code);
					this.setNext();
					break;
				case 'showInfo':
					Pac.modal.show(obj.name(), c.resourceName);
					this.setNext();
					break;
				case 'unlockAction':
					//TODO: change to Pac.Obj
				  var nObj = c.obj || obj;
					for (var act in nObj.getActions()){
						if (act === c.action){
							nObj.getActions()[act].lock(false);
							this.setNext();
							break;
						}
					}
					break;
				case 'putOnHand':
					Pac.getCharacter().setHand(obj);
					this.setNext();
					break;
				case 'animation':
					if (c.async){
						obj.runAnimation(c.animationName);
						this.setNext();
					}
					else {
						obj.runAnimation(c.animationName, function(){
							that.setNext();
						});
					}
					break;
				case 'removeFromScene':
					Pac.getCurrentScene().removeObj(obj);
					this.setNext();
					break;
				case 'addToInventory':
					var nObj = c.obj || obj;
					Pac.getCharacter().pickUp(nObj);
					this.setNext();
					break;
				case 'removeFromInventory':
					Pac.getCharacter().removeObj(obj);
					this.setNext();
					break;
				case 'conversation':
					var conv = c.conversation;
					this.setNext();
					break;
				case 'moveCharacter':
					var pTo = {
						x: obj.getAttrs().x,
						y: obj.getAttrs().y
					};
					
					if (c.to) 
						pTo = c.to;
					
					if (c.async){
						Pac.getCharacter().moveTo(pTo);
						this.setNext();
					}
					else {
						Pac.getCharacter().moveTo(pTo, function(){
							that.setNext();
						});
					}
					break;
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
	
	this.setNext = function(){
		if (currDef)
			currDef.resolve();
	};
};
