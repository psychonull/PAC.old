/*
 * Tests Pac.Obj functionality.
 */

describe('Pac.Obj', function(){
	it('should create an Obj');
	it('should create an Obj with default action for lookAt');
	it('should create an Action with default animation/ frame for Iddle state');
	
	describe('#update()', function(){
		it('should be able to update itself based on game state', function(){
			expect((new Pac.Obj).update).to.be.a('function');
		});
		it('should change its drawable value');
		it('should be able to change its layout properties');
	});

	describe('#draw()', function(){
		it('should have the ability to draw itself', function(){
			expect((new Pac.Obj).draw).to.be.a('function');
		});
		it('should be in the appropiate position');
		it('should have a weight and heigh');
	});  	

	describe('#actions()', function(){
		it('should have actions configured', function(){
			expect((new Pac.Obj).actions).to.be.a('object');
		});
		it('may not have any valid action');
		it('will allow to add actions later');
		it('** DEPRECATED: should enforce the data structure {"actionName":aFunction}');
		it('** DEPRECATED: should pass itself as first parameter, and if other, the other object as 2nd par {"actionName":aFunction}');
	});  
	
	describe('#onAction()', function(){
		it('should be able to set a new action', function(){
			expect((new Pac.Obj).onAction).to.be.a('function');
		});
	});
	
	describe('#doAction()', function(){
		it('should be able to fire an action', function(){
			expect((new Pac.Obj).doAction).to.be.a('function');
		});
	});
	
	describe('#hasPoint()', function(){
		it('should have the ability to return if a point is inside the object', function(){
			expect((new Pac.Obj).hasPoint).to.be.a('function');
		});
		it('should have the ability to return if a point is inside the object by default rectangle');
		it('should have the ability to return if a point is inside the object by circle');
		it('should have the ability to return if a point is inside the object by polygon');
	});
	
	describe('#fireEvent()', function(){
		it('should have the ability do something from an event sent', function(){
			expect((new Pac.Obj).fireEvent).to.be.a('function');
		});
		it('should fire an action when the event type is click');
	});
	
	describe('#addAnimation()', function(){
		it('should be able to add an animation', function(){
			expect((new Pac.Obj).addAnimation).to.be.a('function');
		});
	});
	
	describe('#setAnimation()', function(){
		it('should be able to run an animation', function(){
			expect((new Pac.Obj).setAnimation).to.be.a('function');
		});
	});
	
	describe('#asItem()', function(){
		it('return a different version of itself');
		it('return a different version of itself but for the inventory only');
		it('on this item, actions can also be modified/added/deleted');
		it('could have the same or different image/sprite');
		it('all items should have the same size'); //this test goes here?
	});  
  	
});