/*
 * Tests Pac.Action Class.
 */

describe('Pac.Action', function(){
	it('should create an Action');
	it('should create an Action with defaults consequences for lookAt');
	it('should create an Action with defaults consequences for pickUp');
	describe('#run()', function(){
		it('should be able to clear previous consequences an add new ones');
		it('should retrieve the Pac.Action');
	});
	describe('#then()', function(){
		it('should be able to append new consequences mantaining previous ones');
		it('should retrieve the Pac.Action');
	});
	describe('#execute()', function(){
		it('should have the ability to execute a set of consequences');
		it('should throw an exception if the consequence is not implemented');
		it('should have the ability to execute the consequence showText');
		it('should have the ability to execute the consequence moveToScene');
		it('should have the ability to execute the consequence showInfo');
		it('should have the ability to execute the consequence unlockAction');
		it('should have the ability to execute the consequence putOnHand');
		it('should have the ability to execute the consequence animation');
		it('should have the ability to execute the consequence removeFromScene');
		it('should have the ability to execute the consequence addToInventory');
		it('should have the ability to execute the consequence removeFromInventory');
	});
});