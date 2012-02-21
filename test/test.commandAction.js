/*
 * Tests Pac.CommandAction functionality.
 */

describe('Pac.CommandAction', function(){
	it('should create a CommandAction', function(){
		var name = 'look at';
		var action = 'lookAt';
		var cAction = new Pac.CommandAction(name, action);
		expect(cAction).to.be.a('object');
		expect(cAction.name).to.be(name);
		expect(cAction.action).to.be(action);
	});
	describe('#update()', function(){
		it('should be able to update itself based on game state', function(){
			expect((new Pac.CommandAction).update).to.be.a('function');
		});
		it('should be able to change its layout properties based on current Action', function(){
			var cAction = new Pac.CommandAction('look at', 'lookAt');
			var currColor = cAction.color;
			
			Pac.CurrentAction = 'lookAt'; 
			cAction.update();
			expect(cAction.color).not.be.equal(currColor);
			
			Pac.CurrentAction = undefined; 
		});
	});
	describe('#draw()', function(){
		it('should have the ability to draw itself', function(){
			expect((new Pac.CommandAction).draw).to.be.a('function');
		});
	});
	describe('#fireAction()', function(){
		it('should have the ability fire an action', function(){
			expect((new Pac.CommandAction).fireAction).to.be.a('function');
		});
		it('should change the current game action when fires one', function(){
			var cAction = new Pac.CommandAction('look at', 'lookAt');
			
			Pac.CurrentAction = undefined;
			cAction.fireAction('lookAt');
			expect(Pac.CurrentAction).to.be.equal('lookAt');
			
			Pac.CurrentAction = undefined; 
		});
	});
});