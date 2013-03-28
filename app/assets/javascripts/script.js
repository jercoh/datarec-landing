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
		
	$('.jumbotron .newsletter form').on('submit', function(e){
		// e.preventDefault();
		// customFade($('#overlay, #modal2'), 1);
		$.ajax({
		    type: "POST",
		    url: "/users/new",
		    dataType: 'json',
		    data: {
		      email: $("#email").val()
		    },
		    success: function(data, textStatus) {
		      customFade($('#overlay, #modal2'), 1);
		    },
		    error: function (result) {
        		alert(result.responseText);
    		}	
  		});	
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











