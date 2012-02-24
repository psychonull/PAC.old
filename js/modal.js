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
					x: (attrs.inWidth + attrs.margin.x) - 15,
					y: attrs.margin.y - 15,
					width: 30,
					height: 30
				},
				hasPoint: function(point){
					//TODO: circle
					return Pac.math.pointInRectangle(this.attrs, point);
				},
				fireEvent: function(type){
					if (type === 'click')
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
				ctx.fillRect(closeBtn.attrs.x, closeBtn.attrs.y, closeBtn.attrs.width , closeBtn.attrs.height);
				
				ctx.textBaseline = 'top';
				ctx.fillStyle = 'white';
				ctx.font  = 'normal 30px sans-serif';
				ctx.fillText('X', closeBtn.attrs.x + 4, closeBtn.attrs.y + 2);
				
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
