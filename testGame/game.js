
(function(){
	
	Pac.repository	
		.addResources({
			'scOffice':'office.jpg',
			'laptop':'laptop.png',
			'screwdriver': 'screwdriver.jpg'
		});
	
	var laptop = new Pac.Obj('my laptop', 'laptop', {
			x: 100,
			y: 100,
			width: 50,
			height: 50,
			polygon: [
				{x: 103, y: 108},
				{x: 132, y: 100},
				{x: 132, y: 120},
				{x: 152, y: 127},
				{x: 130, y: 150},
				{x: 105, y: 135}
			]
	});
	
	var screwdriver = new Pac.Obj('some screwdriver', 'screwdriver', {
			x: 250,
			y: 100,
			width: 30,
			height: 30
	});
	
	
	screwdriver.onAction('pickUp')
		.run('addToInventory')
		.then('removeFromScene')
		.then('unlockAction', { action: 'use' });
	
	
	screwdriver.onAction('use', { isLocked: true, lockedMsg: 'I cannot use it without having it' })
		.run('putOnHand')
		.then('showText', {text: 'use screwdriver with ...'});
	
	
	screwdriver.onAction('lookAt', { removeOnRun: false })
		.run('showInfo', { resourceName: 'screwdriver' });
	
	
	
	laptop.onAction('open', { isLocked: true, lockedMsg: 'It is Locked!', removeOnRun: false })
		.run('showText', { text: 'Hacked! .. found passcode: 12345' });
	
	
	laptop.onAction('use', { withObj: screwdriver })
		.run('unlockAction', { action: 'open' })
		.then('showText', { text: 'the laptop is now unlocked!' });
	
	
	laptop.onAction('pickUp', { isLocked: true, lockedMsg: 'Is to big to hide, I cannot take it', removeOnRun: false });
	
	
	laptop.onAction('lookAt', { removeOnRun: false })
		.run('showInfo', { resourceName: 'laptop' });
	
	
	var scOffice = new Pac.Scene('One day at work', 'scOffice')
								.addObj(laptop)
								.addObj(screwdriver);
	
	var charac = new Pac.Character('josecito');
			
	Pac.init('canvas').createCharacter(charac).addScene(scOffice);
		
	Pac.repository.on('complete', function(){
		Pac.start();
	}).on('report', function(a,b){
		
	}).on('error', function(a){
		
	}).load();	
		
})();



