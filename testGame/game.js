
(function(){
	
	Pac.repository	
		.addResources({
			'scOffice':'office.jpg',
			'laptop':'laptop.png',
			'screwdriver': 'screwdriver.jpg',
			'dude': 'char.png',
			'kingkong': 'kingkong.png'
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
	
	var kingkong = new Pac.Obj('a toy of kingkong', 'kingkong', {
			x: 270,
			y: 260,
			width: 40,
			height: 40
	});
	
	kkframes = [];
	for(var i=0; i<1000; i+=50){
		kkframes.push({
			x: i,
			y: 0,
			width: 50,
			height: 60
		});	
	}
	
	kingkong.addAnimation('iddle', {
		frames: [ kkframes[0], kkframes[1] ],
		framesPerStep: 10,
		framesPerRound: 10
	}).addAnimation('moveToy', {
		frames: kkframes,
		runTimes: 1,
		framesPerStep: 5
	});
	
	kingkong.onAction('push', {removeOnRun: false}).run('animation', {animationName: 'moveToy'});
	
	
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
	
	var charac = new Pac.Character('The dude', 'dude', {
			x: 280,
			y: 190,
			width: 90,
			height: 270
	});
	
	
	var walkableArea = new Pac.Path([], charac);
	
	var scOffice = new Pac.Scene('One day at work', 'scOffice')
								.addObj(laptop)
								.addObj(screwdriver)
								.addObj(kingkong)
								.addPath(walkableArea);
			
	Pac.init('canvas').createCharacter(charac).addScene(scOffice);
		
	Pac.repository.on('complete', function(){
		Pac.start();
	}).on('report', function(a,b){
		
	}).on('error', function(a){
		
	}).load();	
		
})();



