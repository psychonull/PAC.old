/*
 * Tests Pac.modal functionality.
 */

describe('Pac.modal', function(){
	it("should exist and exist as an object", function(){
		expect(Pac.modal).not.to.be(undefined);
    expect(Pac.modal).to.be.a('object');
	});
	describe('#init()', function(){
		it("should init the object");
	});
	describe('#update()', function(){
		it('should have the ability to update itself');
	});
	describe('#draw()', function(){
		it('should have the ability to draw itself');
	});
	describe('#show()', function(){
		it('should expose a function for make it visible');
	});
	describe('#hide()', function(){
		it('should expose a function for make it unvisible');
	});
});
