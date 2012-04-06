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
		pointInPolygon: function(poly, pt) {
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
		}
	};
})();
