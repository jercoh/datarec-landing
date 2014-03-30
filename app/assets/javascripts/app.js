$(function(){
	function emailFormSubmitting(){
		$.ajax("/users", {
		    type: "POST",
		    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		    dataType: 'json',
		    data: {
		      email: $("#email").val()
		    },
		    cache: false,
		    success: function(data, textStatus) {
		    	$('.error').text("");
		  		$("#email").remove();
		  		$("input[type='submit']").remove();
		  		$(".champ").css('width', '800px');
		  		$(".champ").css('margin-left', '15px');
		  		$('label').text("MERCI D'AVOIR PARTCIPE! NOUS VOUS CONTACTERONS APRES LE TIRAGE AU SORT!")
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
		    	if($('#email').val() == '')
		    		$('.error').text("Le champ email est vide. Veuillez entrer une adresse email.");
		    	else if(xhr.responseText == "[\"Email has already been taken\"]")
		    		$('.error').text("Vous avez déjà participé. Merci!");
		    	else
		    		$('.error').text("L'adresse email tapée est invalide. Veuillez entrer une adresse valide.");
			}	
			});
	}

	$("input[type='submit']").on('click', function(e){
		if($("#nom").val() == ""){
			emailFormSubmitting();		
		}	
	});		

	$("#email").keypress(function(e){
	    if(e.which == 13){//Enter key pressed
	    	if($("#nom").val() == ""){
	        	emailFormSubmitting();
	        }
	        //Trigger search button click event
	    }
	});
});