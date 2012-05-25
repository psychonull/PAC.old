
$(document).ready(function(){
	 
	 var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: true,
      matchBrackets: true,
      tabSize: 2,
      onChange: function(edt, opts){
      	var js = edt.getValue(); 
      	try {
      		eval(js);	
      	}
      	catch(e){
      		throw e;      		
      	}
      }
   });
   
});


