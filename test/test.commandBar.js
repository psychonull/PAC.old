/*
 * Tests Pac.CommandBar functionality.
 */

describe('Pac.CommandBar', function(){
	it("should exist and exist as an object", function(){
		expect(Pac.CommandBar).not.to.be(undefined);
    expect(Pac.CommandBar).to.be.a('object');
	});
	describe('#init', function(){
		it("should create commandActions for the game", function(){
			expect(Pac.CommandBar.init).to.be.a('function');
		});
	});
	describe('#log', function(){
		it('should be able to recieve a message for log into screen', function(){
			expect(Pac.CommandBar.log).to.be.a('function');
		});
	});
	describe('#update', function(){
		it('should be able to update itself based on game state', function(){
			expect(Pac.CommandBar.update).to.be.a('function');
		});
	});
	describe('#draw', function(){
		it("should exist and exist as an object", function(){
			expect(Pac.CommandBar).not.to.be(undefined);
	    expect(Pac.CommandBar).to.be.a('object');
		});
	});
});