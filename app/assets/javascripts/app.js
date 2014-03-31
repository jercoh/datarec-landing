$(function(){
	function emailFormSubmitting(){
		$.ajax("/users", {
		    type: "POST",
		    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		    dataType: 'json',
		    data: { 
		      user: {
		      	company: $("#company").val(),
		      	email: $("#email").val()
		      }
		    },
		    cache: false,
		    success: function(data, textStatus) {
		    	$('#message').html("");
		  		$("#email").remove();
		  		$("input[type='submit']").remove();
				var response = "<div class='success'><div class='text-msg'>Thanks! You will hear from us soon.</div></div>";
				$('#message').html(response);
				$( "#message" ).show(1000);
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
		    	if(xhr.responseText == "[\"Email has already been taken\"]"){
		    		var response = "<div class='error-msg'>Email has already been taken.</div>";
					$('#message').html(response);
					$( "#message" ).show(1000);
				}
		    	else{
		    		var response = "<div class='error-msg'>Invalid Email, please provide a correct email.</div>";
					$('#message').html(response);
					$( "#message" ).show(1000);
				}
			}	
			});
	}

	$("input[type='submit']").on('click', function(e){
		e.preventDefault();
		if($("#email").val() == ""){
			var response = "<div class='error-msg'>Please provide an email address.</div>";
			$('#message').html(response);
			$( "#message" ).show(1000);
		}
		else{
			emailFormSubmitting();
		}	
	});		

	$("#email").keypress(function(e){
		e.preventDefault();
	    if(e.which == 13){//Enter key pressed
			if($("#email").val() == ""){
				var response = "<div class='error-msg'>Please provide an email address.</div>";
				$('#message').html(response);
				$( "#message" ).show(1000);
			}
			else{
				emailFormSubmitting();
			}	
	        //Trigger search button click event
	    }
	});
});