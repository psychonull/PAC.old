/*
 * Tests main functionality.
 */

describe('Pac', function(){
	it('should be something amazing', function(){
		var pac = new Pac('canvas');
	
    expect(pac).not.to.be(undefined);
    expect(pac).to.be.a('object');
    

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

  });
  it('should initialize the canvas object', function(){
		var pac = new Pac('canvas');
  	expect(pac.canvas).not.to.be(undefined);
	});
    
  describe('#init()', function(){
  	it('should initialize the canvas context 2d', function(){
  		var pac = new Pac('canvas');
			pac.init();
			expect(pac.ctx).not.to.be(undefined);
  	});
  	
  	it('should ask for resources to be prefetched');		
  });
  
  describe('#addScene()', function(){
  	it('should add an Scene object to the Scenes collection', function(){
			var pac = new Pac('canvas');
			pac.init();
			expect(pac.scenes).to.be.empty();
			expect(Pac.Scene).to.be.a('function');
			
			var scene = new Pac.Scene();
			expect(scene.ctx).to.be(null);
			
			pac.addScene(scene);
			
			expect(pac.scenes).not.to.be.empty();
			expect(pac.scenes[0]).not.to.be(undefined);
			
			expect(pac.scenes[0].ctx).not.to.be(null);
  	});
  });
  
  
  describe('Scene', function(){
		it('tests for Scene');
	    
	  describe('#someMethod()', function(){
	  	it('something');		
	  });
	});
});
