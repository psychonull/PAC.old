

Pac.Animation = function(options){
	this.obj = options.obj;
	this.resName = options.resName;
	
	this.frames = options.frames;
	
	this.runTimes = options.runTimes || 0;
	this.framesPerStep = options.timePerFrame || 1;
	this.waitPerRound = options.waitPerRound || 0;
	
	this.currentStep = 0;
	this.firstStep = options.firstStep || 0;
	this.lastStep = this.frames.length - 1;
	
	this.running = false;
	this.timesRun = 0;
	
	this.updTimes = 0;
};

Pac.Animation.prototype.update = function() {
	this.updTimes++;
	if (this.updTimes > this.framesPerStep) {
		this.updTimes = 0;
		
		this.currentStep++;
		if (this.currentStep > this.lastStep){
			this.currentStep = 0;
		
			if (this.runTimes && this.runTimes === this.timesRun)
				this.stop();
				
			this.timesRun++;
		}
	}
};

Pac.Animation.prototype.draw = function(x, y, w, h) {
	var ctx = Pac.getContext(),
		frm = this.frames[this.currentStep];
	
	ctx.drawImage(Pac.repository[this.resName], frm.x, frm.y, frm.width, frm.height, x, y, w, h);	
};

Pac.Animation.prototype.start = function() {
	this.running = true;
	this.timesRun = 1;
};

Pac.Animation.prototype.stop = function() {
	this.running = false;
	this.timesRun = 0;
	
	this.obj.currentAnimation = 'iddle';
};

