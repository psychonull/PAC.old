
(function(){
	
	Pac.repository	
		.addResources({
			'scOffice':'office.jpg',
			'laptop':'laptop.png',
			'screwdriver': 'screwdriver.jpg',
			'dude': 'butthead.png',
			'kingkong': 'kingkong.png',
			'door' : 'door.png',
			'scOutside' : 'outside.jpg'
		});
	
	var laptop = new Pac.Obj('my laptop', 'laptop', {
			x: 100,
			y: 200,
			width: 50,
			height: 50,
			polygon: [
				{x: 103, y: 208},
				{x: 132, y: 200},
				{x: 132, y: 220},
				{x: 152, y: 227},
				{x: 130, y: 250},
				{x: 105, y: 235}
			]
	});
	
	var door = new Pac.Obj('unknown door', 'door', {
		x: 345,
		y: 130,
		width: 90,
		height: 190,
		polygon: [
			{x: 345, y: 130},
			{x: 345, y: 130 + 190},
			{x: 345+90, y: 130 + 190},
			{x: 345+90, y: 130}
		],
		zIndex: 3
	});
	
	var invisibleFolk = new Pac.Obj('InvisibleFolk', null, {
		polygon: [
			{x: 556, y: 313},
			{x: 662, y: 300},
			{x: 661, y: 424},
			{x: 555, y: 414}
		],
		zIndex: 3
	});
	
	var doorOutside = new Pac.Obj('door to the office', '', {
		x: 345,
		y: 130,
		width: 90,
		height: 190,
		polygon: [
			{x: 195, y: 326},
			{x: 255, y: 326},
			{x: 249, y: 416},
			{x: 193, y: 420}
		],
		zIndex: 3
	});
	
	var screwdriver = new Pac.Obj('some screwdriver', 'screwdriver', {
			x: 250,
			y: 100,
			width: 30,
			height: 30
	});
	
	var kingkong = new Pac.Obj('a toy of kingkong', 'kingkong', {
			x: 280,
			y: 260,
			width: 40,
			height: 40
	});
	
	var cloneNPC = new Pac.NPC('a clone of myself', 'dude', {
			x: 379,
			y: 279,
			width: 70,
			height: 200
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
	
	kingkong.addAnimation('idle', {
		frames: [ kkframes[0], kkframes[1] ],
		framesPerStep: 10,
		framesPerRound: 10
	}).addAnimation('moveToy', {
		frames: kkframes,
		runTimes: 1,
		framesPerStep: 5
	});
	
	kingkong.onAction('push', {removeOnRun: false})
		.run('animation', {animationName: 'moveToy'})
		.and('moveCharacter', {to: {x:575, y: 310}})
		.then('moveCharacter');
	
	cloneNPC.onAction('talkTo')
		.run('showText', {text: "I'm your clone, and I'm high"});
		
	screwdriver.onAction('pickUp')
		.run('addToInventory')
		.then('removeFromScene')
		.then('unlockAction', { action: 'use' });
	
	door.onAction('open', {removeOnRun: false})
		.run('custom', {
			callback: function(p, c){
				alert(p.text);
				setTimeout(function(){
					alert('ok. gonna enter.'); c();
				}, 3000); 
			}, 
			params:{ text: 'trolololol' } 
			})
		.then('moveToScene', {code: 'outside'});
	
	invisibleFolk.onAction('push')
		.run('showText', {text: "I'm invisible sir. Welcome to my kingdom."});
	
	doorOutside.onAction('open', {removeOnRun: false})
		.run('moveToScene', {code: 'office'});
		
	screwdriver.onAction('use', { isLocked: true, lockedMsg: 'I cannot use it without having it' })
		.run('putOnHand')
		.then('showText', {text: 'use screwdriver with ...'});
	
	screwdriver.onAction('lookAt', { removeOnRun: false })
		.run('showInfo', { resourceName: 'screwdriver' });
	
	screwdriver.onAction('SingleAction', { removeOnRun: false })
		.run('showInfo', { resourceName: 'screwdriver' })
		.then('showText', { text: 'que destornillador de mierda!!' });
		
	laptop.onAction('open', { isLocked: true, lockedMsg: 'It is Locked!', removeOnRun: false })
		.run('showText', { text: 'Hacked! .. found passcode: 12345' });
	
	
	laptop.onAction('use', { withObj: screwdriver })
		.run('unlockAction', { action: 'open' })
		.then('showText', { text: 'the laptop is now unlocked!' });
	
	
	laptop.onAction('pickUp', { isLocked: true, lockedMsg: 'Is to big to hide, I cannot take it', removeOnRun: false });
	
	
	laptop.onAction('lookAt', { removeOnRun: false })
		.run('showInfo', { resourceName: 'laptop' });
	
	var charac = new Pac.Character('The dude', 'dude', {
			x: 185,
			y: 200,
			width: 70,
			height: 200
	});
	
	var dudeRightFrames = [];
	for(var i=0; i<400; i+=40){
		dudeRightFrames.push({
			x: i,
			y: 0,
			width: 40,
			height: 90
		});	
	}
	
	var dudeLeftFrames = [];
	for(var i=0; i<400; i+=40){
		dudeLeftFrames.push({
			x: i,
			y: 90,
			width: 40,
			height: 90
		});	
	}
	
	var dudeUpFrames = [];
	for(var i=400; i<640; i+=40){
		dudeUpFrames.push({
			x: i,
			y: 0,
			width: 40,
			height: 90
		});	
	}
	
	var dudeDownFrames = [];
	for(var i=400; i<640; i+=40){
		dudeDownFrames.push({
			x: i,
			y: 90,
			width: 40,
			height: 90
		});	
	}
	
	var idleFrames = [];
	idleFrames.push({
			x: 640,
			y: 90,
			width: 40,
			height: 90
	});
	for (var j=0; j< 8; j++){
		for(var i=680; i<840; i+=40){
			idleFrames.push({
				x: i,
				y: 90,
				width: 40,
				height: 90
			});	
		}
	}
	charac.addAnimation('idle', {
		frames: idleFrames,
		framesPerStep: 5,
		framesPerRound: 300
	}).addAnimation('right', {
		frames: dudeRightFrames,
		framesPerStep: 5,
		framesPerRound: 0
	}).addAnimation('left', {
		frames: dudeLeftFrames,
		framesPerStep: 5,
		framesPerRound: 0
	}).addAnimation('up', {
		frames: dudeUpFrames,
		framesPerStep: 5,
		framesPerRound: 0
	}).addAnimation('down', {
		frames: dudeDownFrames,
		framesPerStep: 5,
		framesPerRound: 0
	});
	
	cloneNPC.addAnimation('idle', {
		frames: idleFrames,
		framesPerStep: 5,
		framesPerRound: 5000
	});
	
	var area = {};
	area.polygons = [[
				{x: 113, y: 480},
				{x: 310, y: 375},
				{x: 395, y: 410},
				{x: 395, y: 480}
			],
			[
				{x: 385, y: 400},
				{x: 315, y: 370},
				{x: 345, y: 330},
				{x: 410, y: 340},
				{x: 455, y: 320},
				{x: 460, y: 370}
			],
			[
				{x: 460, y: 320},
				{x: 525, y: 315},
				{x: 585, y: 300},
				{x: 580, y: 330},
				{x: 515, y: 345},
				{x: 465, y: 365}
			],
			[	{x: 10, y: 475},
        {x: 111,y: 475},
        {x: 305,y: 375},
        {x: 90, y: 390},
        {x: 10, y: 360}
      ],
	    [
	    	{x: 10, y: 355},
        {x: 90, y: 385},
        {x: 310, y: 370},
        {x: 340, y: 330},
        {x: 130, y: 330},
        {x: 10, y: 280}
      ]
      
      ];
      
	area.links = [];
	
	area.links[0] = [];
	area.links[0][1] = {
				x:380,
				y:405
			};
	area.links[0][3] = {
				x:130,
				y:465
			};
			
	area.links[1] = [];
	area.links[1][2] = {
				x:460,
				y:345
			};
	area.links[1][4] = {
				x:330,
				y:340
			};
			
	area.links[2] = [];
	area.links[2][5] = {
				x:580,
				y:310
			};
			
/*	area.links[3] = [];
  area.links[3][4] = {
				x:55,
				y:370
			};
	*/		
	var walkableArea = new Pac.Path(area, charac);
	
	var scOffice = new Pac.Scene('office', 'One day at work', 'scOffice', {startingPosition: {x:120, y:425}})
								.addObj(laptop)
								.addObj(screwdriver)
								.addObj(kingkong)
								.addObj(door)
								.setPath(walkableArea);
	
	var scOutsideArea = {};
	scOutsideArea.polygons = [[{x:5, y:427}, {x:797, y:433}, {x:797, y:474}, {x:5, y:474}]];
	scOutsideArea.links = [];
	
	var walkableOutside = new Pac.Path(scOutsideArea, charac);
	var scOutside = new Pac.Scene('outside', 'the creepy entrance', 'scOutside', {startingPosition: {x:223, y:435}})
								.addObj(doorOutside)
								.addObj(invisibleFolk)
								.addObj(cloneNPC)
								.setPath(walkableOutside);
								
	Pac.config({
		commandBar: {
			enabled: true,
			color: 'orange'
		},
		text: {
			font: '50px KulminoituvaRegular', 
			x: 20
		},
		textCmd: {
			font: '20px saint'
		}
	});
			
	Pac.init('canvas').createCharacter(charac).addScene(scOffice).addScene(scOutside);
	Pac.changeToScene('office');
	Pac.repository.on('complete', function(){
		Pac.start();
		
		Pac.getMainTextManager().write('1 ...', 300)
		.then('...2!', 300)
		.then('...3!', 300);
	
	}).on('report', function(a,b){
		
	}).on('error', function(a){
		
	}).load();	

	$('#canvas').bind('mousemove', function(evt){
		
		var getCoords = function(e){
			if (e.pageX || e.pageY) { 
			  x = e.pageX;
			  y = e.pageY;
			}
			else { 
			  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
			  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
			} 
			
			x -= $('#canvas')[0].offsetLeft;
			y -= $('#canvas')[0].offsetTop;
			
			return {
				x: x,
				y: y
			}
		}
		
		var point = getCoords(evt);
		
		$('#mouseXY').text('X: ' +  point.x + ' | Y: ' + point.y);
	});
		
})();



