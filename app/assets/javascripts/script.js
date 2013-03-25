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
	
	var modal = $('#modal.sign-in');
	if(modal.length){
		
		/*** THIS TEMPORARY SNIPPET BINDS MODAL TO CLICKING THE POCKIZ LOGO ***/
		$('.jumbotron h1').on('click', function(e){
			e.preventDefault();
			customFade(modal.add('#overlay'), 1);
		});
		
		$('.close', modal).on('click', function(e){
			e.preventDefault();
			customFade(modal.add('#overlay'), -1);
		});
		
		var footer = modal.children('footer');
		var steps = $('.step0, .step1, .step2', footer);
		
		$('a[href^=#]', footer).click(function(e){
			e.preventDefault();
			customAnimate(footer, {
				marginLeft: parseInt(footer.css('marginLeft')) - steps.filter($(this).attr('href').replace('#', '.')).position().left
			});
		});
		
		$('form.reset-password', footer).on('submit', function(e){
			e.preventDefault();
			customAnimate(footer, {
				marginLeft: parseInt(footer.css('marginLeft')) - steps.filter('.step2').position().left
			});
			setTimeout(function(){
				customAnimate(footer, {
					marginLeft: 0
				});
			}, 5500);
		});
	}
	
	var box = $('#box.sign-in');
	if($('body').hasClass('out-of-modal') && box.length){
		var footer = box.children('.footer').addClass('step0');
		var steps = $('.step0, .step1, .step2', footer);
		var timer = null;
		
		footerHeights = {
			0: 45, 
			1: 150, 
			2: 110
		};
		
		var footerStep = function(s){
			footer.removeClass('step0 step1 step2').addClass('step'+s);
			customAnimate(footer, {height: footerHeights[s]});
			customFade(steps.not('.step'+s), -1, 250)
			setTimeout(function(){
				customFade(steps.filter('.step'+s), 1, 250)
			}, 250);
		};
		
		$('a[href="#step1"]', footer).on('click', function(e){
			e.preventDefault();
			if(footer.hasClass('step0')){
				footerStep(1);
			}
		});
		
		$('a.close', footer).on('click', function(e){
			e.preventDefault();
			footerStep(0);
			if(timer) clearTimeout(timer);
		});
		
		$('form.reset-password', footer).on('submit', function(e){
			e.preventDefault();
			footerStep(2);
			timer = setTimeout(function(){
				footerStep(0);
			}, 5500);
		});
	}
});











