/*
 * Tests Pac.Repository functionality.
 */

describe('Pac.Repository', function(){
	
	it("should exist and exist as an object", function(){
		expect(Pac.Repository).not.to.be(undefined);
    expect(Pac.Repository).to.be.a('object');
	});
	
	describe('#addResources', function(){
		it('should add one resource', function(){
			Pac.Repository.clear();
			expect(Pac.Repository.addResources).to.be.a('function');
			
			var fn = function(){
				Pac.Repository.addResources({'someResAdded':'fernetjs.png'});
			};
			
			expect(fn).to.not.throwException();
		});
		it('should add more than one resource', function(){
			Pac.Repository.clear();
			expect(Pac.Repository.addResources).to.be.a('function');
			
			var fn = function(){
				Pac.Repository.addResources({
					'someResMO':'fernetjs.png',
					'someResMO2': 'fernetjs.png'
				});
			};
			
			expect(fn).to.not.throwException();
		});
		it('should throw an exception if the resource already exist', function(){
			Pac.Repository.clear();
			var fn2 = function(){
				Pac.Repository.addResources({'someResD2':'fernetjs.png'});
				Pac.Repository.addResources({'someResD2':'fernetjs.png'});
			};
			
			expect(fn2).to.throwException();
		});
	});
	
	describe('#load', function(){
		it('should load the image and add the resources as a property of Pac.Repository', function(done){
			Pac.Repository.clear();
			
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.load).to.be.a('function');
			
			Pac.Repository.addResources({
				'someResLoad':'fernetjs.png',
				'someResLoad2':'fernetjs.png'
			}).on('complete', function(){
				expect(Pac.Repository.someResLoad).not.to.be(undefined);
				expect(Pac.Repository.someResLoad2).not.to.be(undefined);
				done();
			}).load();
		});
	});  
	
	describe('#loadOne', function(){
		it('should add and load one resource to the Repository', function(done){
			Pac.Repository.clear();
			
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.loadOne).to.be.a('function');
			
			Pac.Repository.addResources({'someONERes':'fernetjs.png'});
			
			Pac.Repository.loadOne('someONERes', function(){
				expect(Pac.Repository.someONERes).not.to.be(undefined);
				done();
			});
		});
		it('should throw an exception if no name was specified', function(){
			Pac.Repository.clear();
			
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.loadOne).to.be.a('function');
			Pac.Repository.addResources({'resOneExcep':'fernetjs.png'});
			
			var fn = function(){
				Pac.Repository.loadOne();
			};
			
			expect(fn).to.throwException();
		});
		it("should throws an exception if the resource wasn't added or doesn't exist", function(){
			Pac.Repository.clear();
			
			expect(Pac.Repository.addResources).to.be.a('function');
			expect(Pac.Repository.loadOne).to.be.a('function');

			var fn = function(){
				Pac.Repository.loadOne('noExistingRes');
			};
			expect(fn).to.throwException();
		});
	});
	
	describe('#on', function(){
		it('should fire "report" event per image loaded', function(done){
			Pac.Repository.clear();
			var callTime = 0; 
			
			Pac.Repository.addResources({
				'someResOnLoad':'fernetjs.png',
				'someResOnLoad2':'fernetjs.png'
			}).on('report', function(prg){
				callTime++;
				expect(prg).not.to.be(undefined);
				
				if (callTime === 1)
					expect(prg).not.to.be(50);
				else {
					expect(prg).not.to.be(100);
					done();
				}
				
			}).load();
		});
		
		it('should fire "complete" event when all images are loaded', function(done){
			Pac.Repository.clear();
			
			Pac.Repository.addResources({
				'someResOnCLoad':'fernetjs.png',
				'someResOnCLoad2':'fernetjs.png'
			}).on('complete', function(){
				expect(Pac.Repository.someResOnCLoad).not.to.be(undefined);
				expect(Pac.Repository.someResOnCLoad2).not.to.be(undefined);
				done();
			}).load();
		});
	});  	
	
	describe('#clear', function(){
		it('should clear all resources loaded or not --> Test callback does not work! ', function(done){
			Pac.Repository.clear();
			
			Pac.Repository.addResources({
				'someResClear':'fernetjs.png',
				'someResClear2':'fernetjs.png'
			}).on('complete', function(){
				
				expect(Pac.Repository.someResClear).not.to.be(undefined);
				expect(Pac.Repository.someResClear2).not.to.be(undefined);
				
				Pac.Repository.clear();
				
				expect(Pac.Repository.someResClear).to.be(undefined);
				expect(Pac.Repository.someResClear2).to.be(undefined);
				
				done();
			}).load();
		});
	});  	
		
});