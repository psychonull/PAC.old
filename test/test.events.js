/*
 * Tests Pac.events functionality.
 */

describe('Pac.events', function(){
	it("should exist and exist as an object", function(){
		expect(Pac.events).not.to.be(undefined);
    expect(Pac.events).to.be.a('object');
	});
	describe('#init()', function(){
		it("should get and store the canvas element", function(){
			expect(Pac.events.init).to.be.a('function');
		});
	});
	describe('#bindEvents()', function(){
		it('should be able to bind events', function(){
			expect(Pac.events.bindEvents).to.be.a('function');
		});
	});
	describe('#unbindEvents()', function(){
		it('should be able to unbind events', function(){
			expect(Pac.events.unbindEvents).to.be.a('function');
		});
	});
	describe('#attach()', function(){
		it('should be able to attach an object as a listener for a mouse click', function(){
			expect(Pac.events.attach).to.be.a('function');
		});
	});
	describe('#detach()', function(){
		it('should be able to detach an object as a listener', function(){
			expect(Pac.events.detach).to.be.a('function');
		});
	});
});
