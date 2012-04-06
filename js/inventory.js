
Pac.Inventory = function(options){
	var items = [];
		
		attrs = {
			x: (options && options.x) || 0,
			y: (options && options.y) || 0,
			width: (options && options.width) || 50,
			height: (options && options.height) || 50
		};

	this.update = function() {
		
	};
	
	this.draw = function() {
		for(var i=0; i< items.length; i++){
			items[i].draw();
		}
	};
	
	this.add = function(obj){
		if (items.indexOf(obj) !== -1){
				Pac.commandBar.log('Ya lo tengo...');
				return;
		}
		
		var lastX = (items.length * 50) + 20;
		
		obj.getAttrs().x = lastX + 50;
		obj.getAttrs().y = Pac.getHeight() - 60;
		obj.getAttrs().width = 50;
		obj.getAttrs().height = 50;
		
		items.push(obj);	
	};
	
	this.getItems = function() { //TODO: remove this method
		return items;
	};
	
};
