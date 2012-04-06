
Pac.Path = function(area, entity){
	var polygons = area.polygons || [],
		links = area.links, 
		toPoint = {x:0, y:0},
		entity = entity;

	Pac.events.attach(this);
	
	var getPolygonIndex = function(point){
		for (var i = 0; i < polygons.length; i++){
			if (Pac.math.pointInPolygon(polygons[i], point))
				return i;	
		}
		return null;
	};
	
	var getLinksPath = function(indexFrom, indexTo){
		var result = [];
		if(links[indexFrom] !== undefined){
		
		}
	}
	
	
	this.hasPoint = function(point) {
		return getPolygonIndex(point) !== null;
	};
	
	this.fireEvent = function(e) {
		if (e.type === 'click')
			toPoint = e.point;
			entity.moveTo(this);
	};
	
	this.nextPoint = function(from, vel){
		if (!this.hasPoint(toPoint)){
			//TODO: get closest polygon??			
		}
		if (getPolygonIndex(from) === getPolygonIndex(toPoint)){
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
		}
		else {
			return from;
		}
	};
	
	this.isOnTarget = function(from){
		return (from.x === toPoint.x && from.y === toPoint.y);
	};
	
	this._draw = function(){
		var ctx = Pac.getContext();
		var polygon = null;
		for (var j = 0; j < polygons.length; j++){
			polygon = polygons[j];
			ctx.save();
		  	ctx.fillStyle = 'rgba(250,0,0,0.5)';
			ctx.beginPath();
			ctx.moveTo(polygon[0].x, polygon[0].y);
			
			for (var i=1; i < polygon.length; i++)
				ctx.lineTo(polygon[i].x, polygon[i].y);
			
			ctx.closePath();
			ctx.fill();
			ctx.restore();	
		}
	  	
	}; 
	
	
};
