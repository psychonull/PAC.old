

Pac.Animation = function(options){
	this.obj = options.obj;
	this.resName = options.resName;
	
	this.frames = options.frames;
	
	this.runTimes = options.runTimes || 0;
	this.timePerFrame = options.timePerFrame || 1;
	this.waitPerRound = options.waitPerRound || 0;
	
	this.currentStep = 0;
	this.firstStep = options.firstStep || 0;
	this.lastStep = this.frames.length - 1;
	
	this.timerFrame = null;
	this.timerRound = null;
	this.running = false;
	this.timesRun = 0;
};

Pac.Animation.prototype.update = function() {
	
};

Pac.Animation.prototype.draw = function(x, y, w, h) {
	var ctx = Pac.getContext(),
		frm = this.frames[this.currentStep];
	
	ctx.drawImage(Pac.repository[this.resName], frm.x, frm.y, frm.width, frm.height, x, y, w, h);	
};

Pac.Animation.prototype.start = function() {
	var that = this;
	this.running = true;
	this.timesRun = 1;
	
	this.timerFrame = setInterval(function(){
		
		that.currentStep++;
		if (that.currentStep > that.lastStep){
			that.currentStep = 0;
		
			if (that.runTimes && that.runTimes === that.timesRun)
				that.stop();
				
			that.timesRun++;
		}
		
	}, this.timePerFrame);
};

Pac.Animation.prototype.stop = function() {
	this.running = false;
	this.timesRun = 0;
	//clearTimeout(this.timerRound);
	
	clearInterval(this.timerFrame);
	
	this.obj.currentAnimation = 'iddle';
};

