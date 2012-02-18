
(function(){
	
	var pac = new Pac('canvas');
	
	var scOffice = new Pac.Scene('One day at work');
	
	scOffice.addObj(new Pac.Obj('my laptop', {
			x: 100,
			y: 100,
			width: 50,
			height: 50
		})
	).addObj(new Pac.Obj('some paper work', {
			x: 50,
			y: 50,
			width: 20,
			height: 30
		})
	);
	
	pac.init();
	pac.start();
	
});



