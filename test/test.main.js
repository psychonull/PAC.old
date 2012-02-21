/*
 * Tests main functionality.
 */

describe('Pac', function(){
	it('should be something amazing', function(){
    expect(Pac).not.to.be(undefined);
    expect(Pac).to.be.a('object');
  });
  
	describe('core constructors', function(){
		it('should have basic constructors', function(){
			expect(Pac.Character).to.be.a('function');
			expect(Pac.Obj).to.be.a('function');
			expect(Pac.Scene).to.be.a('function');
			expect(Pac.CommandAction).to.be.a('function');
		});
	});
  
  describe('#init()', function(){  	
	  it('should initialize the canvas object', function(){
			expect(Pac.init).not.to.be(undefined);			
			expect(Pac.getContext()).to.be(undefined);
			
			Pac.init('canvas');
	  	
	  	var canvas = document.getElementById('canvas');
	  	
	  	expect(Pac.canvas).to.be(undefined);
	  	expect(Pac.getContext()).not.to.be(undefined);
	  	
	  	expect(Pac.getWidth()).to.be(canvas.width);
	  	expect(Pac.getHeight()).to.be(canvas.height);
		});
  });
  
  describe('#addScene()', function(){
  	it('should add an Scene object to the Scenes collection', function(){
			expect(Pac.addScene).to.be.a('function');
			expect(Pac.getScenes()).to.be.empty();
			
			var scene = new Pac.Scene();
			Pac.addScene(scene);
			
			expect(Pac.getScenes()).not.to.be.empty();
			expect(Pac.getScenes()[0]).not.to.be(undefined);
  	});
  	it('should throw exception when parameter type mismatch', function(){
			var falseScene = new Pac.Obj('Scene Title');
			
			var fn = function(){
				Pac.addScene(falseScene);
			}
			expect(fn).to.throwException();
			
		});
  });
});
