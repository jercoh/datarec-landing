$(function(){
	$('input[placeholder]').placeholder();
	
	var grid = $('.landing-products .products-container');
	if(grid.length){
		var gridLi = grid.children('ul').children('li');
		var resizeGrid = function(){
			var gap = $(window).width() - grid.width();
			if(gap > 0){
				var addcount = Math.ceil(gap/150)*4;
				var loop = Math.ceil(addcount/gridLi.length);
				for(var i=0; i<loop; i++){
					grid.children('ul').append(gridLi.clone());
				}
				grid.width(Math.ceil(grid.children('ul').children('li').length / gridLi.length) * 150 * 10);
			}
			grid.css({marginLeft: Math.round(($(window).width() - grid.width())/2)})
		};
		
		resizeGrid();
		$(window).resize(resizeGrid);
	}
	
	if(Modernizr.csstransitions){
		var customAnimate = function(what, how, time){
			time = time>-1 ? time : 500;
			what.css(how);
		};
		var customFade = function(what, o, time){
			time = time>-1 ? time : 500;
			if(o<0){
				what.css({opacity: 0});
				setTimeout(function(){what.hide()}, time);
			}
			else
				what.fadeTo(0,0).css({opacity: o});
		};
	}
	else {
		var customAnimate = function(what, how, time){
			time = time>-1 ? time : 500;
			what.animate(how, 500);
		};
		var customFade = function(what, o, time){
			time = time>-1 ? time : 500;
			if(o<0)
				what.fadeOut(time);
			else
				what.fadeTo(time, o);
		};
	}

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
		      $('.jumbotron .newsletter').removeClass("error");
		      $('.jumbotron .newsletter #email').val('');
		      $('.copy-code input').first().val(data[1]);
		      $('.share-section .facebook').attr('href','https://www.facebook.com/dialog/feed?app_id=477706475585963&link='+data[1]+'&picture=&name=Pockiz&caption=Join%20me%20on%20Pockiz!&description=Pockiz%20is%20a%20social%20marketplace%20for%20teens%20to%20curate,%20buy%20and%20share%20products.&redirect_uri=http://www.pockiz.com')
		      $('.share-section .twitter').attr('href','https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A3000%2Fusers%2F103%2Ffriends&source=tweetbutton&text=Just%20joined%20%40pockiz_us.%20Come%20and%20discover%20cool%20products%20to%20buy%20with%20your%20allowances!%20%20&url='+data[1])
		      customFade($('#overlay, #modal2'), 1);
			  mixpanel.track("User Created");
		    },
		    error: function (xhr, ajaxOptions, thrownError) {
		    	customFade($('#overlay, #modal2'), 1);
		    	if($('.jumbotron .newsletter #email').val() == '')
		    		$('.error-msg').text("Oops! It seems the email field is empty.");
		    	else if(xhr.responseText == "[\"Email has already been taken\"]")
		    		$('.error-msg').text("You're already registred. We won't forget you!");
		    	else
		    		$('.error-msg').text("Oops! It seems you mistyped your email address.");
		    	$('.jumbotron .newsletter').addClass("error");
				mixpanel.track("Error In Email");
    		}	
  		});
	}
		
	$('.jumbotron .newsletter button').on('click', function(e){
		emailFormSubmitting();			
	});		

	$('.jumbotron .newsletter #email').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            emailFormSubmitting();
            //Trigger search button click event
        }
    });
	
	$('.close', '#modal2').on('click', function(e){
		e.preventDefault();
		customFade($('#overlay, #modal2'), -1);
	});
	
	$('#overlay').on('click', function(e){
		e.preventDefault();
		customFade($('#overlay, #modal2'), -1);
	});
	
});











