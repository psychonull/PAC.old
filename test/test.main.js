/*
 * Tests main functionality.
 */

describe('Pac', function(){
	it('should be something amazing', function(){
    expect(Pac).not.to.be(undefined);
    expect(Pac).to.be.a('object');
	
    describe('core constructors', function(){
    	it('should have basic constructors', function(){
    		expect(Pac.Character).to.be.a('function');
    		expect(Pac.Obj).to.be.a('function');
    		expect(Pac.Scene).to.be.a('function');
    	});
    });
  });
  
  describe('#init()', function(){  	
	  it('should initialize the canvas object', function(){
			expect(Pac.init).to.be('function');
			
			expect(Pac.ctx).to.be(undefined);
			
			Pac.init('canvas');
	  	
	  	var canvas = document.getElementById('canvas');
	  	
	  	expect(Pac.canvas).to.be(undefined);
	  	expect(Pac.ctx).not.to.be(undefined);
	  	
	  	expect(Pac.width).to.be(canvas.width);
	  	expect(Pac.height).to.be(canvas.height);
		});
  });
  
  describe('#addScene()', function(){
  	it('should add an Scene object to the Scenes collection', function(){
			expect(Pac.addScene).to.be.a('function');
			expect(Pac.scenes).to.be.empty();
			
			var scene = new Pac.Scene();
			Pac.addScene(scene);
			
			expect(Pac.scenes).not.to.be.empty();
			expect(Pac.scenes[0]).not.to.be(undefined);
  	});
  });
});
