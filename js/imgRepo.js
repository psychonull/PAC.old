
/*
  Image Resources for the Engine.
  Recieves an object with options 
  root: root folder of images if they all are at the same structure | nothing if don't
  resources: key | value pair --- key: name of resource | value: url/ name of image
  
  Example of use:
  ------- -- ---
  
	var repo = new ImgRepo({
		root: 'images/',
		resources: {
			'scene1': 'lake.png', 
			'scene2': 'office.png'
			}
  })
	.on('report', function(percentage){
		alert('loaded ' + percentage + ' of 100%');
	})
	.on('complete', function(){
		alert('all i		that[img] = new Image();
		that[img].onload = imageLoaded;
		that[img].src = this.root + this.resources[img];
		if (tmages loaded');
	});
  
	repo.load();
*/

var ImgRepo = function (options) {

	this.root = options.root || '';
	this.resources = options.resources || {};

	this.loaded = 0;
	this.total = (function (a) { var r = 0; for (var i in a) r++; return r; })(this.resources);

	this.callbacks = {
		complete: function(){},
		report: function(){}
	};
}

ImgRepo.prototype.on = function (eventName, callback) {
	if (this.callbacks[eventName])
		this.callbacks[eventName] = callback;
	return this;
};

ImgRepo.prototype.load = function () {
	var that = this;
	
	var imageLoaded = function() {
		var prg = (++that.loaded * 100) / that.total;
		that.callbacks.report(prg);
		if (prg === 100) that.callbacks.complete();
	};
	
	for (var img in this.resources) {
		that[img] = new Image();
		that[img].onload = imageLoaded;
		that[img].src = this.root + this.resources[img];
		if (that[img].complete) imageLoaded();
	}
	
	return this;
};
 
