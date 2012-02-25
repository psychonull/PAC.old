

Pac.Animation = function(options){
	this.resName = options.resName;
	
	this.frames = options.frames;
	
	this.runTimes = options.runTimes || 0;
	this.framesPerStep = options.framesPerStep || 1;
	this.framesPerRound = options.framesPerRound || 0;
	
	this.currentStep = 0;
	this.firstStep = options.firstStep || 0;
	this.lastStep = this.frames.length - 1;
	
	this.running = false;
	this.rounds = 0;
	this.updTimes = 0;
	this.movingRound = false;
	
	this.endCallback = (options.endCallback || function(){});
};

Pac.Animation.prototype.update = function() {
	this.updTimes++;
	
	if (this.framesPerRound && this.movingRound){
		if (this.updTimes > this.framesPerRound){
			this.updTimes = 0;
			this.movingRound = false;
			this.rounds++;
		}
	}
	else if (this.updTimes > this.framesPerStep) {
		this.updTimes = 0;
		
		this.currentStep++;
		if (this.currentStep > this.lastStep){
			this.currentStep = 0;
		
			if (this.runTimes && this.runTimes === this.rounds)
				this.stop();
			
			this.movingRound = true;
		}
	}
};

Pac.Animation.prototype.draw = function(x, y, w, h) {
	var ctx = Pac.getContext(),
		frm = this.frames[this.currentStep];
	
	ctx.drawImage(Pac.repository[this.resName], frm.x, frm.y, frm.width, frm.height, x, y, w, h);	
};

Pac.Animation.prototype.start = function() {
	this.rounds = 1;
	this.updTimes = 0;
	this.currentStep = this.firstStep;
	this.running = true;
};

Pac.Animation.prototype.stop = function() {
	this.running = false;
	this.endCallback();
};

