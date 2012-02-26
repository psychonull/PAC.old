/*
 * Tests Pac.Animation Class.
 */

describe('Pac.Animation', function(){
	it('should create an Animation');
	it('should create an Animation with default options');
	describe('#update()', function(){
		it('should have the ability to update itself');
	});
	describe('#draw()', function(){
		it('should have the ability to draw itself');
	});
	describe('#start()', function(){
		it('should reset properties and start an animation');
	});
	describe('#stop()', function(){
		it('should stop an animation and call the endCallback');
	});
});
