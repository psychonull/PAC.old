/*
 * generic utility functions. i.e. pub/sub, include/extend, proxy, user events, etc.
 */

// Core game actions. These actions *could* be applied to objects
Pac.coreActions = ['give', 'open', 'close', 'pickUp', 'lookAt', 'talkTo', 'use', 'push', 'pull'];

Pac.intersection = (function(){
	return {
		rectangle: function(a, p) {
			return (a.x < p.x && (a.x + a.width) > p.x && a.y < p.y && (a.y + a.height > p.y));
		},
		circle: function(a, p) {
			return false;
		},
		polygone: function(ps, p) {
			return false;
		}
	};
})();
