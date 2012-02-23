
(function(){
	
	Pac.Repository	
		.addResources({
			'scOffice':'office.jpg',
			'laptop':'laptop.png',
			'screwdriver': 'screwdriver.jpg'
		});
	
	var laptop = new Pac.Obj('my laptop', 'laptop', {
			x: 100,
			y: 100,
			width: 50,
			height: 50
	});
	
	var screwdriver = new Pac.Obj('some screwdriver', 'screwdriver', {
			x: 250,
			y: 100,
			width: 30,
			height: 30
	});
	
	screwdriver.onAction({name: 'pickUp', 
											consequences: [
												{type:'addToInventory'}, 
												{type: 'removeFromScene'}, 
												{type: 'unlockAction', action: 'use'}
											]});
											
	screwdriver.onAction({name: 'use',  
												isLocked: true, 
												lockedMsg: 'I cannot use it without having it', 
											consequences: [
												{type: 'putOnHand'},
												{type:'showText', text: 'use screwdriver with ...'}
											]});
	
	screwdriver.onAction({name: 'lookAt', 
												removeOnRun: false, 
											consequences: [
												{type:'showInfo', resourceName: 'screwdriver'}]
											});
											
	laptop.onAction({name: 'open', 
									isLocked: true, 
									lockedMsg: 'It is Locked!',
									removeOnRun: false, 
									consequences: [
										{type:'showText', text: 'Hacked! .. found passcode: 12345'}
									]});
	
	laptop.onAction({name: 'use', 
									withObj: screwdriver, 
									consequences: [
										{type: 'unlockAction', action: 'open'},
										{type:'showText', text: 'the laptop is now unlocked!'}
									]});

	laptop.onAction({name: 'pickUp', 
									isLocked: true, 
									lockedMsg: 'Is to big to hide, I cannot take it',
									removeOnRun: false}); 
	
	laptop.onAction({name: 'lookAt', 
										removeOnRun: false, 
									consequences: [
										{type:'showInfo', resourceName: 'laptop'}]
									});
											
	var scOffice = new Pac.Scene('One day at work', 'scOffice')
								.addObj(laptop)
								.addObj(screwdriver);
	
	var charac = new Pac.Character('josecito');
			
	Pac.init('canvas').createCharacter(charac).addScene(scOffice);
		
	Pac.Repository.on('complete', function(){
		Pac.start();
	}).on('report', function(a,b){
		
	}).on('error', function(a){
		
	}).load();	
		
})();



