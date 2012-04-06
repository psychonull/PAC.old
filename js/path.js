
Pac.Path = function(area, entity){
	var polygons = area || [], 
		toPoint = {x:0, y:0},
		entity = entity;

	Pac.events.attach(this);
	
	this.hasPoint = function(point) {
		return true;
	};
	
	this.fireEvent = function(e) {
		if (e.type === 'click')
			toPoint = e.point;
			entity.moveTo(this);
	};
	
	this.nextPoint = function(from, step){
				
		var m = (toPoint.y - from.y)/(toPoint.x - from.x),
			b = from.y - m * from.x;
		
		var calcY = function(x){
			return m * x + b;
		}
		
		var calcX = function(){
			return m * x + b;
		}
		
		
		var r = (from.x > toPoint.x) ? -1 : 1;
		var xNew = from.x + (step * r);
		
		return {
			x: xNew,
			y: calcY(xNew)
		}
		
	};
	
	this.isOnTarget = function(from){
		return (from.x === toPoint.x && from.y === toPoint.y);
	};
	
	
};
