/*
 * Tests main functionality.
 */

describe('Pac.Scene', function(){
	it('should have objects', function(){
	    expect(Pac).not.to.be(undefined);
	    expect(Pac).to.be.a('object');
	    expect(Pac('canvasId')).to.be.a('object');
    });
    
    describe('core constructors', function(){
    	it('should have basic constructors', function(){
    		expect(Pac.Character).to.be.a('function');
    		expect(Pac.Obj).to.be.a('function');
    		expect(Pac.Scene).to.be.a('function');
    	});
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