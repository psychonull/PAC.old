/*
 * Tests Pac.Obj functionality.
 */

describe('Pac.Inventory', function(){
	var inventory = new Pac.Inventory({x:10,y:10,width:20,heigh:20});
	
	it('should create an Action');
	
	describe('#update()', function(){
		it('should be able to update itself based on game state');
	});

	describe('#draw()', function(){
		it('should have the ability to draw itself');
	});
	describe('#add()', function(){
		it('should have the ability to add an object');
		it('should not be able to add an object that already exists');
	});  	
});