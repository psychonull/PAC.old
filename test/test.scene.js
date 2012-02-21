/*
 * Tests Scene functionality.
 */

describe('Pac.Scene', function(){
	it('should create a Scene', function(){
		var title = 'Scene Title';
		var scene = new Pac.Scene(title);
		expect(scene).to.be.a('object');
		expect(scene.title).to.be(title);
	});
    
  describe('#addObj()', function(){
  	it('should add a Obj object to object collection', function(){
			var scene = new Pac.Scene('Scene Title');
			
			expect(scene.objects).to.be.empty();
			
			var obj = new Pac.Obj();
			scene.addObj(obj);
			
			expect(scene.objects).not.to.be.empty();
		});
		it('should throw exception when parameter type mismatch', function(){
			var scene = new Pac.Scene('Scene Title');
			var falseObj = new Pac.Scene('another scene');
			
			var fn = function(){
				scene.addObj(falseObj);
			}
			expect(fn).to.throwException();
		});
  });
  
  describe('#removeObj()', function(){
  		it('should remove a Obj object from the object collection', function(){
			var scene = new Pac.Scene('Scene Title');
			
			var obj = new Pac.Obj();
			scene.addObj(obj);
			expect(scene.objects.length).to.be(1);
			scene.removeObj(obj);
			expect(scene.objects).to.be.empty();
		});
		it('should remove ONLY the Obj passed as parameter - comparing by reference', function(){
			var scene = new Pac.Scene('Scene Title');
			
			var obj = new Pac.Obj();
			var obj2 = new Pac.Obj();
			scene.addObj(obj);
			scene.addObj(obj2);
			expect(scene.objects.length).to.be(2);
			scene.removeObj(obj);
			expect(scene.objects.length).to.be(1);
			expect(scene.objects).to.contain(obj2);
		});
		it('should throw exception when parameter type mismatch', function(){
			var scene = new Pac.Scene('Scene Title');
			
			var fn = function(){
				scene.removeObj('invalid parameter!!!!!!!!! xD');
			}
			expect(fn).to.throwException();
		});
  });
  
  describe('#update()', function(){
		it('should be able to update itself based on game state', function(){
			expect((new Pac.Scene).update).to.be.a('function');
		});
	});

	describe('#draw()', function(){
		it('should have the ability to draw itself', function(){
			expect((new Pac.Scene).draw).to.be.a('function');
		});
		it('should be in the appropiate position', function(){
			expect((new Pac.Scene).attrs.x).to.be.equal(0);
			expect((new Pac.Scene).attrs.y).to.be.equal(0);
		});
		it('should have a weight and height of the canvas', function(){
			expect((new Pac.Scene).attrs.width).to.be.equal(Pac.getWidth);
			expect((new Pac.Scene).attrs.height).to.be.equal(Pac.getHeight);
		});
	});  	
	
});
