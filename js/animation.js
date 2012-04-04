
Pac.Animation = function(options){
	var resName = options.resName,

		frames = options.frames,
		runTimes = options.runTimes || 0,
		framesPerStep = options.framesPerStep || 1,
		framesPerRound = options.framesPerRound || 0,
		
		currentStep = 0,
		firstStep = options.firstStep || 0,
		lastStep = frames.length - 1,
		
		running = false,
		rounds = 0,
		updTimes = 0,
		movingRound = false,
		
		endCallback = (options.endCallback || function(){});

	this.update = function() {
		updTimes++;
		
		if (framesPerRound && movingRound){
			if (updTimes > framesPerRound){
				updTimes = 0;
				movingRound = false;
				rounds++;
			}
		}
		else if (updTimes > framesPerStep) {
			updTimes = 0;
			
			currentStep++;
			if (currentStep > lastStep){
				currentStep = 0;
			
				if (runTimes && runTimes === rounds)
					this.stop();
				
				movingRound = true;
			}
		}
	};
	
	this.draw = function(x, y, w, h) {
		var ctx = Pac.getContext(),
			frm = frames[currentStep];
		
		ctx.drawImage(Pac.repository[resName], frm.x, frm.y, frm.width, frm.height, x, y, w, h);	
	};
	
	this.start = function() {
		rounds = 1;
		updTimes = 0;
		currentStep = firstStep;
		running = true;
	};
	
	this.stop = function() {
		running = false;
		endCallback();
	};

	this.isRunning = function() {
		return running;
	};
};

