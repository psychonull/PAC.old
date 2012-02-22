
(function(){
	
	Pac.Repository	
		.addResources({
			'scOffice':'../testGame/office.jpg',
			'laptop':'../testGame/laptop.png'
		});
	
	var myLaptop = new Pac.Obj ('my laptop', 'laptop' , {"x":100,"y":100,"width":50,"height":50});
	var prohibidoFumar = new Pac.Obj ('prohibido fumar', '' , {"x":470,"y":164,"width":23,"height":33});
	var reloj = new Pac.Obj ('reloj', '' , {"x":668,"y":139,"width":38,"height":30});
	var telefono = new Pac.Obj ('telefono', '' , {"x":464,"y":355,"width":51,"height":44});
	var monitorViejo = new Pac.Obj ('monitor viejo', '' , {"x":145,"y":243,"width":62,"height":61});
	var cuadro = new Pac.Obj ('cuadro', '' , {"x":113,"y":161,"width":52,"height":67});
	var revistaLoca = new Pac.Obj ('revista loca', '' , {"x":533,"y":390,"width":61,"height":45});
	var archivero = new Pac.Obj ('archivero', '' , {"x":622,"y":206,"width":81,"height":112});
	var tachoDeBasura = new Pac.Obj ('tacho de basura', '' , {"x":346,"y":285,"width":29,"height":35});
	var nota = new Pac.Obj ('nota', '' , {"x":793,"y":426,"width":-17,"height":-28});

	var scOffice = new Pac.Scene('One day at work', 'scOffice')
								.addObj(myLaptop)
								.addObj(prohibidoFumar)
								.addObj(reloj)
								.addObj(telefono)
								.addObj(monitorViejo)
								.addObj(cuadro)
								.addObj(revistaLoca)
								.addObj(archivero)
								.addObj(nota)
								.addObj(tachoDeBasura);
								
	Pac.init('canvas').addScene(scOffice);
		
	Pac.Repository.on('complete', function(){
		Pac.start();
	}).on('report', function(a,b){
		console.log(a)
	}).on('error', function(a){
		console.dir(a);
	}).load();	
		
})();