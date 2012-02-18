/*
 * Tests Obj functionality.
 */

describe('Pac.Obj', function(){
	
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
	
	describe('#actions', function(){
  		it('should have actions configured', function(){
			expect((new Pac.Obj).actions).to.be.a('object');
  		});
  		it('may not have any valid action');
  		it('will allow to add actions later');
  		it('should enforce the data structure {"actionName":aFunction}');
  		it('should pass itself as first parameter, and if other, the other object as 2nd par {"actionName":aFunction}');
  	});  
  	
  	 describe('#asItem()', function(){
  		it('return a different version of itself', function(){
			expect((new Pac.Obj).asItem).to.be.a('function');
			expect((new Pac.Obj).asItem()).to.be.an('object');
  		});
  		it('return a different version of itself but for the inventory only');
  		it('on this item, actions can also be modified/added/deleted');
  		it('could have the same or different image/sprite');
  		it('all items should have the same size'); //this test goes here?
  	});  
  	
  	
});