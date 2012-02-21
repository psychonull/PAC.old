/*
 * Tests Pac.commandBar functionality.
 */

describe('Pac.commandBar', function(){
	it("should exist and exist as an object", function(){
		expect(Pac.commandBar).not.to.be(undefined);
    expect(Pac.commandBar).to.be.a('object');
	});
	describe('#init', function(){
		it("should create commandActions for the game", function(){
			expect(Pac.commandBar.init).to.be.a('function');
		});
	});
	describe('#log', function(){
		it('should be able to recieve a message for log into screen', function(){
			expect(Pac.commandBar.log).to.be.a('function');
		});
	});
	describe('#update', function(){
		it('should be able to update itself based on game state', function(){
			expect(Pac.commandBar.update).to.be.a('function');
		});
	});
	describe('#draw', function(){
		it("should exist and exist as an object", function(){
			expect(Pac.commandBar).not.to.be(undefined);
	    expect(Pac.commandBar).to.be.a('object');
		});
	});
});