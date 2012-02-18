
(function(){
	
	var laptop = new Pac.Obj('my laptop', {
			x: 100,
			y: 100,
			width: 50,
			height: 50
	});
	
	var paperW = new Pac.Obj('some paper work', {
			x: 50,
			y: 50,
			width: 20,
			height: 30
	});

	var scOffice = new Pac.Scene('One day at work')
								.addObj(laptop)
								.addObj(paperW);
								
	Pac.init('canvas')
		.addScene(scOffice)
		.start();
});



