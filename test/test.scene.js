/*
 * Tests Scene functionality.
 */

describe('Scene', function(){
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
  });
});
