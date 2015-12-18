//init angular
angular.module('App', []);

//scroll handler (parallax effect)
$(window).scroll(function(){
	
	var wScroll = $(this).scrollTop();
	
	$('.hero-text').css({
		'transform': 'translateY(' + (wScroll / 4) + '%)' 
	});
	
	$('.hero-inner ul').css({
		'transform': 'translateY(-' + (wScroll / 20) + '%)' 
	});
	
	if (wScroll >= $('#TempHero').height() - $('div.nav-wrapper').height()){
		
		if ($('.logo-wrapper').position().left >= 0){
			$('.logo-wrapper').animate({
				'left': '-150px'
			}, 300);
		}
		
	}else {
		
		if ($('.logo-wrapper').position().left <= -150){
			$('.logo-wrapper').animate({
				'left': '0px'
			}, 300);
		}
		
	}
});

$(window).resize( _.throttle(onResize, 500));

$(window).load(function(){
	onResize();
});

//init parallax.js
$('.scene').parallax();

//bg of hero unit 
var firstTime = true;
var wWidth = $(window).width();
var scenes = $('.scene');
var onResizeRunning = false;
function onResize(){
	if (onResizeRunning || ($(window).width() == wWidth && !firstTime)) return;
	
	console.log('onResize()')
	onResizeRunning = true;
	
	if ($(window).width() > wWidth || firstTime){
		console.log('Screen growing => Adding elements')
		wWidth = $(window).width();
		firstTime = false;
		lastScene = scenes.last();
		allScenesWidth = 0;
		$('.scene').each(function(){
			allScenesWidth += $(this).width();
		})

		while (allScenesWidth < $(window).width()) {
			clone = $('.scene').clone();
			clone.css({
				left: $('.scene').last().position().left + 770
			});
			clone.addClass('animated');
			clone.addClass('fadeIn');
			$('.hero-inner').append(clone);
			allScenesWidth += 800;
		}
		
		removeDuplicates();
		

		$('.scene').each(function(){
			$(this).parallax();
		});
	} else {
		wWidth = $(window).width();
		firstTime = false;
		console.log('Screen shrinking => Deleting elements')
		while ((allScenesWidth - 800) > $(window).width()) {
			if ($('.scene').length == 1){ 
				break;
			}
			
			$('.scene').last().remove();
			allScenesWidth -= 800;
		}
	}
	onResizeRunning = false;
	console.log('Nb elements ', $('.scene').length)
};
function removeDuplicates(){
	var equals = false;
	for (var i = 0; i < $('.scene').length; i++){
		for (var j = i + 1; j < $('.scene').length; j++){
			ielt = $($('.scene').get(i));
			jelt = $($('.scene').get(j));
			if (ielt.position().left == jelt.position().left){
				jelt.detach();
				jelt.remove();
				equals = true;
			}
			
		}
	}
	if (equals) removeDuplicates()
	else return;
};