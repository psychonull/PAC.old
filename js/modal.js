/*
 *	PAC.modal 
 * 	show a modal dialog on screen width a Title and an image 
 * 	used to show large size version of objects 
 */

Pac.modal = (function(){
	var attrs = {},
		closeBtn = {},
		title = '',
		resName,
		onShow = false;
	
	return {
		init: function(){
			var m = 0.2,
				cWidth = Pac.getWidth(),
				cHeight = Pac.getHeight();
	
			attrs = {
				outWidth: cWidth,
				outHeight: cHeight,
				inWidth: cWidth * (1 - (m * 2)),
				inHeight: cHeight * (1 - (m * 2)),
				margin: {
					x: cWidth * m,
					y: cHeight * m
				}
			};
			
			closeBtn = {
				attrs: {
					x: (attrs.inWidth + attrs.margin.x),
					y: attrs.margin.y,
					radius: 15
				},
				hasPoint: function(point){
					return Pac.math.pointInCircle(this.attrs, point);
				},
				fireEvent: function(e){
					if (e.type === 'click')
						Pac.modal.hide();
				}
			};
		},
		
		update: function(){
			// maybe state animation or something
		},
	
		draw: function(){
			if (onShow){
				var ctx = Pac.getContext();
				ctx.save();
				
				ctx.fillStyle = 'rgba(0,0,0,0.7)';
				
				ctx.fillRect(0, 0, attrs.outWidth, attrs.outHeight);
				ctx.drawImage(Pac.repository[resName], attrs.margin.x, attrs.margin.y, attrs.inWidth, attrs.inHeight);
				
				ctx.fillStyle = 'red';
				ctx.beginPath();
				ctx.arc(closeBtn.attrs.x, closeBtn.attrs.y, closeBtn.attrs.radius, Math.PI * 2, 0, true);
				ctx.closePath();
				ctx.fill();
				
				ctx.textBaseline = 'top';
				ctx.fillStyle = 'white';
				ctx.font  = 'normal 20px sans-serif';
				ctx.fillText('X', closeBtn.attrs.x - closeBtn.attrs.radius/2, closeBtn.attrs.y - closeBtn.attrs.radius/1.5);
				
				ctx.restore();
			}
		},
	
		show: function(_title, _resName){
			title = _title;
			resName = _resName;
			
			Pac.events.attach(closeBtn, 'click');
			onShow = true;
		},
		
		hide: function(){
			onShow = false;
			Pac.events.detach(closeBtn, 'click');
		}
	};
	
})();
