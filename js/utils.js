/*
 * generic utility functions. i.e. pub/sub, include/extend, proxy, user events, etc.
 */

// Core game actions. These actions *could* be applied to objects
Pac.coreActions = ['give', 'open', 'close', 'pickUp', 'lookAt', 'talkTo', 'walkTo', 'use', 'push', 'pull'];

// Arithmetic functions helper
Pac.math = (function(){
	return {
		pointInRectangle: function(a, p) {
			return (a.x < p.x && (a.x + a.width) > p.x && a.y < p.y && (a.y + a.height > p.y));
		},
		pointInSegment: function(p, pA, pB){
			var x1 = pA.x, y1 = pA.y, x2 = pB.x, y2 = pB.y, x3 = p.x, y3 = p.y;
			if ((x1 <= x3 && x3 <= x2 ) && (y1 <= y3 && y3 <= y2 )) {
				return ((x2 - x1) * (y3 - y1)) - ((x3 - x1) * (y2 - y1)) < 0.0000001;
			}
			return false;
		},
		pointInPolygon: function(poly, pt) {
		 
		 for(var i=0; i< poly.length; i++){
		 	if (pt.x === poly[i].x && pt.y === poly[i].y)
		 		return true;
		 }
		 
		 for(var j=0; j< poly.length; j++ ){
				var jn = (j === poly.length -1) ? 0: j+1;  
				var pA = poly[j];
				var pB = poly[jn];
				
				if(this.pointInSegment(pt, pA, pB))
					return true;
			}
			
		 for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
      && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
      && (c = !c);
  		
  		return c;
  		
		},
		pointInCircle: function(a, p) {
			var phase,
				steps = (2 * Math.PI * a.radius) / 10, //divide circumference by 10
				poly = [];
				
			//create polygon of the circle by steps margin error
			for (var i = 0; i < steps; i++) {
				phase = 2 * Math.PI * i / steps;
				poly.push({
			    x: (a.x + a.radius * Math.cos(phase)),
			    y: (a.y + a.radius * Math.sin(phase))
			 	});
			}
			
			return this.pointInPolygon(poly, p);
		},
		getDistance: function(pointA, pointB) {
			return Math.sqrt(Math.pow(pointA.x - pointB.x,2) + Math.pow(pointA.y - pointB.y,2));
		},
		getNearestPoint: function(point, pointList) {
			var nearestPointIndex = null,
				minDistance = Number.POSITIVE_INFINITY,
				tempDistance = 0;
			for (var i = 0; i < pointList.length; i++){
				tempDistance = this.getDistance(point, pointList[i]);
				if (tempDistance < minDistance){
					minDistance = tempDistance;
					nearestPointIndex = i;
				}
			}
			return pointList[nearestPointIndex];
		},
		getDistancePointToLine: function(p, lA, lB, o) {
			var x = p.x, 
				y = p.y, 
				x0 = lA.x, 
				y0 = lA.y, 
				x1 = lB.x, 
				y1 = lB.y;
			
	    function lineLength(x, y, x0, y0){
	        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	    }
	    if(o && !(o = function(x, y, x0, y0, x1, y1){
	        if(!(x1 - x0)) return {x: x0, y: y};
	        else if(!(y1 - y0)) return {x: x, y: y0};
	        var left, tg = -1 / ((y1 - y0) / (x1 - x0));
	        return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
	    }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
	        var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
	        return l1 > l2 ? l2 : l1;
	    }
	    else {
	        var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
	        return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
	    }
		},
		getNearestPointInSegment: function(p, pA, pB) {
			var u, t, b, newPoint;
		
			if (pA === pB) return pA;
			if (p === pA || p === pB) return p;
			
			t = ((p.x - pA.x) * (pB.x - pA.x)) + ((p.y - pA.y) * (pB.y - pA.y));
			b = Math.pow(this.getDistance(pB, pA),2);
			u = t / b;
			
			if (u >= 0 && u <= 1){
				newPoint = {
					x: pA.x + u * (pB.x - pA.x),
					y: pA.y + u * (pB.y - pA.y)
				};
			}
			else if (u < 0){
				newPoint = pA;
			}
			else if (u > 1){
				newPoint = pB;
			}
			
			var ctx = Pac.getContext();
			ctx.save();
		  ctx.fillStyle = 'rgba(0,255,0,0.5)';
			ctx.beginPath();
			ctx.arc(p.x, p.y, 2, Math.PI * 2, 0, true);
			ctx.closePath();
			ctx.fill();
	  	ctx.restore();
			
			ctx.save();
		  ctx.fillStyle = 'rgba(0,255,0,0.5)';
			ctx.beginPath();
			ctx.arc(pA.x, pA.y, 2, Math.PI * 2, 0, true);
			ctx.closePath();
			ctx.fill();
	  	ctx.restore();
			
			ctx.save();
		  ctx.fillStyle = 'rgba(0,255,0,0.5)';
			ctx.beginPath();
			ctx.arc(pB.x, pB.y, 2, Math.PI * 2, 0, true);
			ctx.closePath();
			ctx.fill();
	  	ctx.restore();
			
			return newPoint;
		},
		getNearestPointToPolygons: function(p, polygons) {
			var thePoint,
				segment,
				distance = Number.POSITIVE_INFINITY;
				
			for(var i=0; i< polygons.length; i++){
				var poly = polygons[i];
				
				for(var j=0; j< poly.length; j++ ){
					var jn = (j === poly.length -1) ? 0: j+1;  
					var pA = poly[j];
					var pB = poly[jn];
					
					var d = this.getDistancePointToLine(p, pA, pB, true);
					if (d < distance){
						distance = d;
						segment = [pA, pB];
					}
				}
			}
			
			var pp = this.getNearestPointInSegment(p, segment[0], segment[1]);
			
			var ctx = Pac.getContext();
			ctx.save();
		  ctx.fillStyle = 'rgba(255,255,0,1)';
			ctx.beginPath();
			ctx.arc(pp.x, pp.y, 2, Math.PI * 2, 0, true);
			ctx.closePath();
			ctx.fill();
	  	ctx.restore();
	  	
			return pp;
		}
	};
})();

Pac.direction = {
	UP: 1,
	RIGHT: 2,
	DOWN: 3,
	LEFT: 4
};
