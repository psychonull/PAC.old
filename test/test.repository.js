/*
 * Tests Pac.repository functionality.
 */

describe('Pac.repository', function(){
	
	it("should exist and exist as an object", function(){
		expect(Pac.repository).not.to.be(undefined);
    expect(Pac.repository).to.be.a('object');
	});
	
	describe('#addResources', function(){
		it('should add one resource', function(){
			Pac.repository.clear();
			expect(Pac.repository.addResources).to.be.a('function');
			
			var fn = function(){
				Pac.repository.addResources({'someResAdded':'fernetjs.png'});
			};
			
			expect(fn).to.not.throwException();
		});
		it('should add more than one resource', function(){
			Pac.repository.clear();
			expect(Pac.repository.addResources).to.be.a('function');
			
			var fn = function(){
				Pac.repository.addResources({
					'someResMO':'fernetjs.png',
					'someResMO2': 'fernetjs.png'
				});
			};
			
			expect(fn).to.not.throwException();
		});
		it('should throw an exception if the resource already exist', function(){
			Pac.repository.clear();
			var fn2 = function(){
				Pac.repository.addResources({'someResD2':'fernetjs.png'});
				Pac.repository.addResources({'someResD2':'fernetjs.png'});
			};
			
			expect(fn2).to.throwException();
		});
	});
	
	describe('#load', function(){
		it('should load the image and add the resources as a property of Pac.repository', function(done){
			Pac.repository.clear();
			
			expect(Pac.repository.addResources).to.be.a('function');
			expect(Pac.repository.load).to.be.a('function');
			
			Pac.repository.addResources({
				'someResLoad':'fernetjs.png',
				'someResLoad2':'fernetjs.png'
			}).on('complete', function(){
				expect(Pac.repository.someResLoad).not.to.be(undefined);
				expect(Pac.repository.someResLoad2).not.to.be(undefined);
				done();
			}).load();
		});
	});  
	
	describe('#loadOne', function(){
		it('should add and load one resource to the Pac.repository', function(done){
			Pac.repository.clear();
			
			expect(Pac.repository.addResources).to.be.a('function');
			expect(Pac.repository.loadOne).to.be.a('function');
			
			Pac.repository.addResources({'someONERes':'fernetjs.png'});
			
			Pac.repository.loadOne('someONERes', function(){
				expect(Pac.repository.someONERes).not.to.be(undefined);
				done();
			});
		});
		it('should throw an exception if no name was specified', function(){
			Pac.repository.clear();
			
			expect(Pac.repository.addResources).to.be.a('function');
			expect(Pac.repository.loadOne).to.be.a('function');
			Pac.repository.addResources({'resOneExcep':'fernetjs.png'});
			
			var fn = function(){
				Pac.repository.loadOne();
			};
			
			expect(fn).to.throwException();
		});
		it("should throws an exception if the resource wasn't added or doesn't exist", function(){
			Pac.repository.clear();
			
			expect(Pac.repository.addResources).to.be.a('function');
			expect(Pac.repository.loadOne).to.be.a('function');

			var fn = function(){
				Pac.repository.loadOne('noExistingRes');
			};
			expect(fn).to.throwException();
		});
	});
	
	describe('#on', function(){
		it('should fire "report" event per image loaded', function(done){
			Pac.repository.clear();
			var callTime = 0; 
			
			Pac.repository.addResources({
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
			Pac.repository.clear();
			
			Pac.repository.addResources({
				'someResOnCLoad':'fernetjs.png',
				'someResOnCLoad2':'fernetjs.png'
			}).on('complete', function(){
				expect(Pac.repository.someResOnCLoad).not.to.be(undefined);
				expect(Pac.repository.someResOnCLoad2).not.to.be(undefined);
				done();
			}).load();
		});
	});  	
	
	describe('#clear', function(){
		it('should clear all resources loaded or not --> Test callback does not work! ', function(done){
			Pac.repository.clear();
			
			Pac.repository.addResources({
				'someResClear':'fernetjs.png',
				'someResClear2':'fernetjs.png'
			}).on('complete', function(){
				
				expect(Pac.repository.someResClear).not.to.be(undefined);
				expect(Pac.repository.someResClear2).not.to.be(undefined);
				
				Pac.repository.clear();
				
				expect(Pac.repository.someResClear).to.be(undefined);
				expect(Pac.repository.someResClear2).to.be(undefined);
				
				done();
			}).load();
		});
	});  	
		
});