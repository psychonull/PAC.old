/*
 * Tests for utils.js
 */

describe('Pac.math', function(){
	it("should exist and exist as an object", function(){
		expect(Pac.math).not.to.be(undefined);
    expect(Pac.math).to.be.a('object');
	});
	describe('#pointInRectangle()', function(){
		it("should retrieve if a point is in a given rectangle");
	});
	describe('#pointInPolygon()', function(){
		it("should retrieve if a point is in a given polygon");
	});
	describe('#pointInCircle()', function(){
		it("should retrieve if a point is in a given circle");
	});
});