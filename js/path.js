
Pac.Path = function(area, entity){
	var polygons = area.polygons || [],
		links = area.links, 
		toPoint = {x:0, y:0},
		entity = entity,
		nodeNetwork = [],
		nextNodePoint = null;

	Pac.events.attach(this);
	
	var getPolygonIndex = function(point){
		for (var i = 0; i < polygons.length; i++){
			var isIn = Pac.math.pointInPolygon(polygons[i], point)
			if (isIn)
				return i;	
		}
		return null;
	};
	
	var createNodeNetwork = function(fromPoint, toPoint){
		var nodes = [],
			fromIdx = getPolygonIndex(fromPoint),
			toIdx = getPolygonIndex(toPoint),
			m = 1;
		
		function getNeighbors(polyIdx){
			if(getNeighbors[polyIdx])
				return getNeighbors[polyIdx];
			var result = [];
			for(var j = 0; j < links.length; j++){
				if(links[j] !== undefined){
					if (links[j][polyIdx] !== undefined){
						if (result.indexOf(j) === -1)
							result.push(j);
					}
				}
			}
			
			if (links[polyIdx] !== undefined){
				for (var i = 0; i < links[polyIdx].length; i ++){
					if (links[polyIdx][i] !== undefined){
						if (result.indexOf(i) === -1)
							result.push(i);
					}
				}	
			}
			getNeighbors[polyIdx] = result;
			return result;
		}
		
		function getLink(polyStart, polyEnd){
			if(links[polyStart] !== undefined && links[polyStart][polyEnd] !== undefined)
				return links[polyStart][polyEnd];
			if(links[polyEnd] !== undefined && links[polyEnd][polyStart] !== undefined)
				return links[polyEnd][polyStart];
			return null;	
		}
		
		function isDirectNeighbor(a, b){
			return getNeighbors(a).indexOf(b) !== -1;
		}
		
		function getQueue(from, to, parent){
			if(!getQueue[from]) getQueue[from] =[];
			if(!getQueue[from][to]) getQueue[from][to] = [];
			getQueue[from][to].push(from);
			if(isDirectNeighbor(from, to)){	
				if(parent !== undefined){
					getQueue[parent][to].push(from);
					getQueue[parent][to].push(to);
					return getQueue[parent][to]
				}
				else{
					getQueue[from][to].push(to);
					return getQueue[from][to];
				}
				
			}
			else{
				var n = getNeighbors(from);
				if(parent && n.indexOf(parent) !== -1)
					n.splice(n.indexOf(parent),1);
				for(var i = 0; i < n.length; i++){
					if(parent){
						return getQueue[parent][to] = getQueue[parent][to].concat(getQueue(n[i], to, from)); 
					}
					else{
						return getQueue(n[i], to, from) ;	
					}
				}
			}
			
		}
		
		function getNodes(from, to){
			var q = getQueue(from, to);
			for(var i = 0; i < q.length -1; i++){
				nodes.push(getLink(q[i], q[i+1]));
			}
		}
		
		getNodes(fromIdx, toIdx);
		nodeNetwork = nodes;
	}
	
	var setNextNodePoint = function(){
		nextNodePoint = (nodeNetwork[0] || toPoint); 
	};
	
	this.hasPoint = function(point) {
		return getPolygonIndex(point) !== null;
	};
	
	this.fireEvent = function(e) {
		if (e.type === 'click')
			toPoint = e.point;
			var fromPoint = entity.getPosition();
			
			if (getPolygonIndex(fromPoint) === getPolygonIndex(toPoint)){
				setNextNodePoint();
			}
			else {
				createNodeNetwork(fromPoint, toPoint);
			
				setNextNodePoint();
			}
			entity.moveTo(this);
	};
	
	this.nextPoint = function(from, vel){
		if (this.isOnTarget(from)) return toPoint;
	
		if (from.x === nextNodePoint.x && from.y === nextNodePoint.y){
			nodeNetwork.splice(0,1);
			setNextNodePoint();
		}
		
		var delta = {
				x: nextNodePoint.x - from.x,
				y: nextNodePoint.y - from.y
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
			return nextNodePoint;
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
	  
	  if (nodeNetwork.length > 0){
			ctx.save();
	  	for (var i=0; i< nodeNetwork.length; i++){
			  ctx.fillStyle = 'rgba(0,0,255,0.5)';
			
				ctx.beginPath();
				ctx.arc(nodeNetwork[i].x, nodeNetwork[i].y, 10, Math.PI * 2, 0, true);
				ctx.closePath();
				
				ctx.fill();
			}
	  	ctx.restore();
	  }
	  
	}; 
	
};
