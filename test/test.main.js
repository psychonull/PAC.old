/*
 * Tests main functionality.
 */

describe('Pac', function(){
	it('should be something amazing', function(){
	    expect(Pac).not.to.be(undefined);
	    expect(Pac).to.be.a('object');
	    expect(Pac('canvasId')).to.be.a('object');
    });
    
    describe('#init()', function(){
    	// pending tests
    	it('should initialize the canvas object');
    	it('should ask for resources to be prefetched');		
    });
    
    describe('#addScene()', function(){
    	it('should add an Scene object to the Scenes collection', function(){
    		expect(Pac.scenes).to.be.empty();
    		Pac.addScene(new Pac.Scene);
    		expect(Pac.scenes).not.to.be.empty();
    	});
    });
})