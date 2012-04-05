/*
 * Tests Pac.Obj functionality.
 */

describe('Pac.Character', function(){
	// objs that will be used for testing
	var something = new Pac.Obj('cigar', 'hugeCigar', {x:10,y:10,width:20,heigh:20});
	var dude = new Pac.Character('N/N');

	
	describe('#update()', function(){
		it('should be able to update itself based on game state', function(){
			expect(dude.update).to.be.a('function');
		});
	});

	describe('#draw()', function(){
		it('should have the ability to draw itself', function(){
			expect(dude.draw).to.be.a('function');
		});
	});
	describe('#pickUp()', function(){
		it('should have the ability to pickup an object', function(){
			var aDude = new Pac.Character('N/N');
			expect(aDude.getInventory()).to.be.empty();
			aDude.pickUp(something);
			expect(aDude.getInventory()).not.to.be.empty();
		});
		it('should not be able to pickUp something twice', function(){
			var aDude = new Pac.Character('N/N');
			expect(aDude.getInventory()).to.be.empty();
			aDude.pickUp(something);
			aDude.pickUp(something);
			expect(aDude.getInventory().length).to.be.equal(1);
		});
	});  	
	describe('#getHand()', function(){
		it('should get the obj that is buffered for use');
	});  	
	describe('#setHand()', function(){
		it('should set the obj that is buffered for use');
	});  	  	
	describe('#clearHand()', function(){
		it('should clear the item that is buffered for use', function(){
			dude.setHand(something);
			expect(dude.getHand()).not.to.be(null);
			dude.clearHand();
			expect(dude.getHand()).to.be(null);
		});
	});  

});