/*
 * handles translation (?)
 * low priority
 */

Pac.Lang = {};
Pac.data = 
	{'cannot': ['No puedo hacer esto.',
			   'Imposible. Eso pordría terminar muy mal']
	,
	'scene1': { 'someId-defineStandard?' : 'No se me ocurre nada!!'
		
		
	},
	'scene2': 
	
	
	};

Pac.Lang.get = function(id){
	if(Pac.data.hasOwnProperty(id)){
		return Pac.data[id];
	}	
	else
		throw new Error('not implemented');
}
