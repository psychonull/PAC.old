$(function(){
	$('#result').hide();
	$('#add-object').click(function(e){
		ObjSelector.currentObj.name = $('#objName').val();
		ObjSelector.currentObj.resName = $('#resName').val();
		
		ObjSelector.coords = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		ObjSelector.currentStep = 0;
		ObjSelector.currentObj = new Pac.Obj();
		e.preventDefault();		
	});
	$('#get-code').click(function(e){
		e.preventDefault();	
		$('#result textarea').text(getCode());
		$('#result').show();
	});
});

var ObjSelector = {};

ObjSelector.coords = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
};

ObjSelector.currentStep = 0;
	// 1 for first click
	// 2 for second click

ObjSelector.firstSet = function firstSet(x, y){
	this.coords.x = x;
	this.coords.y = y;
	updateCurrentObjInView();
}

ObjSelector.secondSet = function secondSet(x, y){
	this.coords.width = x - this.coords.x;
	this.coords.height = y - this.coords.y;
	updateCurrentObj();
	updateCurrentObjInView();
	//Pac.getCurrentScene().removeObj(this.currentObj);
	if(Pac.getCurrentScene().objects.indexOf(this.currentObj) === -1)
		Pac.getCurrentScene().addObj(this.currentObj);
}

ObjSelector.currentObj = new Pac.Obj();

function updateCurrentObjInView(){
	$('#obj-x').text(ObjSelector.coords.x);
	$('#obj-y').text(ObjSelector.coords.y);
	$('#obj-width').text(ObjSelector.coords.width);
	$('#obj-height').text(ObjSelector.coords.height);
}
function updateCurrentObj(){
	ObjSelector.currentObj.attrs = ObjSelector.coords;
}
function getCode(){
	function camelize(str) {
	  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
	 	   return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
	  }).replace(/\s+/g, '');
	}

	var objects = Pac.getCurrentScene().objects.map(function(o, i){
		return "var " + camelize(o.name) + " = new Pac.Obj ('" + o.name + "', '" + o.resName + "' , " + JSON.stringify(o.attrs) + ");" ;
	});
	return objects.join('\n');
	
}

