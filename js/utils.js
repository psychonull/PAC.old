/*
 * generic utility functions. i.e. pub/sub, include/extend, proxy, user events, etc.
 */

// Core game actions. These actions *could* be applied to objects
Pac.coreActions = ['give', 'open', 'close', 'pickUp', 'lookAt', 'talkTo', 'use', 'push', 'pull'];

// Arithmetic functions helper
Pac.math = (function(){
	return {
		pointInRectangle: function(a, p) {
			return (a.x < p.x && (a.x + a.width) > p.x && a.y < p.y && (a.y + a.height > p.y));
		},
		pointInCircle: function(a, p) {
			return false;
		},
		pointInPolygone: function(ps, p) {
			//check if polygone is convex or concave
			return false;
		}
	};
})();
