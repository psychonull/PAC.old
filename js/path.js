
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
	
	this.nextPoint = function(from, vel){
		var delta = {
			x: toPoint.x - from.x,
			y: toPoint.y - from.y	
		},
		dist = Math.sqrt(Math.pow(delta.x,2) + Math.pow(delta.y,2)),
		ratio = 1;
		if (dist > vel){
			ratio = vel / dist;
			return {
				x: from.x + ratio * delta.x ,
				y: from.y + ratio * delta.y
			}
		}
		else{
			return toPoint;
		}
		
	};
	
	this.isOnTarget = function(from){
		return (from.x === toPoint.x && from.y === toPoint.y);
	};
	
	
};
