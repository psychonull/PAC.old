/*
 * Tests Pac.Repository functionality.
 */

describe('Pac.Repository', function(){
	
	it("should exists and be an object", function(){
		expect(Pac.Repository).not.to.be(undefined);
    expect(Pac.Repository).to.be.a('object');
	});
	
	describe('#addResources', function(){
		it('should add one resource', function(){
			expect(Pac.Repository.addResources).to.be.a('function');
			
			var fn = function(){
				Pac.Repository.addResources({'someResAdded':'fernetjs.png'});
			};
			
			expect(fn).to.not.throwException();
		});
		it('should add more than one resource', function(){
			expect(Pac.Repository.addResources).to.be.a('function');
			
			var fn = function(){
				Pac.Repository.addResources({
					'someResMO':'fernetjs.png',
					'someResMO2': 'fernetjs.png'
				});
			};
			
			expect(fn).to.not.throwException();
		});
		it('should throw an exception if some resource already exists', function(){
			var fn2 = function(){
				Pac.Repository.addResources({'someResD2':'fernetjs.png'});
				Pac.Repository.addResources({'someResD2':'fernetjs.png'});
			};
			
			expect(fn2).to.throwException();
		});
	});
	
	describe('#load', function(){
		it('should add the resources to the Repository', function(){
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.load).to.be.a('function');
			
			Pac.Repository.addResources({
				'someResLoad':'fernetjs.png',
				'someResLoad2':'fernetjs.png'
			}).on('complete', function(){
				expect(Pac.Repository.someResLoad).not.to.be(undefined);
				expect(Pac.Repository.someResLoad2).not.to.be(undefined);
			}).load();
		});
	});  
	
	describe('#loadOne', function(){
		it('should add one resource to the Repository', function(){
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.loadOne).to.be.a('function');
			
			Pac.Repository.addResources({'someONERes':'fernetjs.png'});
			
			Pac.Repository.loadOne('someONERes', function(){
				expect(Pac.Repository.someONERes).not.to.be(undefined);
			});
		});
		it('should throws an exception if no name is specify', function(){
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.loadOne).to.be.a('function');
			Pac.Repository.addResources({'resOneExcep':'fernetjs.png'});
			
			var fn = function(){
				Pac.Repository.loadOne();
			};
			
			expect(fn).to.throwException();
		});
		it("should throws an exception if a resource don't exists", function(){
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.loadOne).to.be.a('function');

			var fn = function(){
				Pac.Repository.loadOne('noExistingRes');
			};
			expect(fn).to.throwException();
		});
	});
	
	describe('#on', function(){
		it('should fire "report" event per image loaded');
		it('should fire "complete" event when all images are loaded');
	});  	
	
	describe('#clear', function(){
		it('should clear all resources loaded or not');
	});  	
		
});