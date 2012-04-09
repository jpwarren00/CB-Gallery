$(document).ready(function(){
	//console.log(Drupal.settings.carousel_2);
	/*//Drupal.settings.carousel_2 created in:
	 * ../carousel.module: <?php $carousel_js_settings = array('carousel_2' => array(
		 'start' => '1',
		 'display' => $carousel->display,
		 'height' => $carousel->height,
		 'width' => $carousel->width,
		 'axis' => 'x',
		 'controls' => $carousel->controls,
		 'pager' => $carousel->pager,
		 'interval' => 'false',
		 'interval_time' => $carousel->interval_time,
		 'rewind' => 'false',
		 'animation' => 'true',
		 'duration' => $carousel->duration,
		 'callback' => null,
		 'overlay' => $carousel->overlay,
		 'overlay_toggle' => $carousel->overlay_toggle,
		 'overlay_height' => $carousel->overlay_height,
		 'overlay_y' => $carousel->overlay_y ?>
	));*/
	var carousel = $('#carousel');
	var viewport_and_overlay = $('#carousel .viewport, #carousel .overview li');
	var buttons = $('#carousel .buttons');
	var pager_list = $('#carousel .pager');
	var overview = $('#carousel .overview');
	var overview_item = $('#carousel .overview li, #carousel .overlay');
	var carousel_images = $('#carousel .overview li img');
	var overlay = $('#carousel .overlay');
	
	var height = parseInt(Drupal.settings.carousel_2.height);
	var width =  parseInt(Drupal.settings.carousel_2.width);

	var display = parseInt(Drupal.settings.carousel_2.display);
	var pager = parseInt(Drupal.settings.carousel_2.pager);
	var controls = parseInt(Drupal.settings.carousel_2.controls);
	var interval_time = parseInt(Drupal.settings.carousel_2.interval_time);
	var duration = parseInt(Drupal.settings.carousel_2.duration);
	var singleSlide = (display == 1 ? 0 : parseInt(Drupal.settings.carousel_2.move_amount));
	
	var carousel_height = height;
	var carousel_width = width;
	var carousel_outer_width = $('#carousel .viewport').outerWidth();
	var image_width = Math.round($('#carousel .viewport').outerWidth()/display);
			
	var overlay_height = parseInt(Drupal.settings.carousel_2.overlay_height);
	var overlay_y = parseInt(Drupal.settings.carousel_2.overlay_y);
	var overlay_toggle = parseInt(Drupal.settings.carousel_2.overlay_toggle);
	var overlay_in;
	var overlay_out;
	var vid_focus = false;
	var imgCount = $('#carousel .overview').children().length;
	var remainder = imgCount % display;
	var subtractMarginPx;
	// Dev controlled in sites main script page
	//buttons.hide();
	
	//console.log(duration+' - '+interval_time);
	
	if(display >= 2){
		height = height / display;
		width = width / display;
		subtractMarginPx = 4;
		$('.item_image, .item_video').css('margin-right','4px');
	}
	
	// If the overlay is a string, that means it has a "!" infront of it
	// per the instructions... Of they perhaps did not follow the
	// instructions, and instead, put "100px" or some other such foolishness
	// this will also ring true, and give the user an unexpected result...
	if(typeof(overlay_y)=='string') {
		overlay.css({
			height: (overlay_height)+'px',
			bottom: (overlay_y.slice(1))+'px'
		});
	}else{
		overlay.css({
			height: (overlay_height)+'px',
			top: (overlay_y)+'px'
		});
	}
	
	
	/*if(controls){
		buttons.show()
		$('#carousel').hover(function(){
			buttons.show();
		}).mouseleave(function(){
			buttons.hide();
		}).css({
			height: (carousel_height+30)+'px',
			width: (carousel_width)+'px'
		});
	}*/
	if(!controls){
		buttons.hide();
	}
	
	if(overlay_toggle){
		overlay.hide();		
		$('.item_video object').focus(function(){
			vid_focus = true;
			$('.overlay').slideUp();
		}).blur(function(){
			vid_focus = false;
		});
		
		/*overview_item.bind("mouseenter", function(){
			clearTimeout($(this).data('timeout'));
			if(vid_focus == false){
				$(this).find('.overlay').slideDown();
			}
		}).bind("mouseleave", function(){
			var t = setTimeout(function() {
			$(this).find('.overlay').slideUp();  
		  }, 800);
		  $(this).data('timeout', t); 
		});*/
		
		overview_item.bind("mouseenter", function(){
			$(this).find('.overlay').slideDown();		
		}).bind("mouseleave", function(){
			$(this).find('.overlay').slideUp();  		 
		});
		
		$('.item_video object').focus(function(){
			$(this).find('.overlay').slideUp();
		});
		
	}
	
	//-3 should be variable
	$('#carousel object, .item_image, .item_video, .item_image img').width((Math.round(image_width))+'px');
	$('.viewport').height(height);
	//pager_list.find('li').width(Math.round((image_width/imgCount)-(display*2))+'px');
	
	//$('#carousel img').width((Math.round(outerWidth-3))+'px');
		
	carousel.tinycarousel({ 
		start : 1,
		display : (display),
		axis : 'x',
		controls : (controls),
		pager : (pager),
		interval : true,
		intervalTime : (interval_time),
		rewind : false,
		animation : true,
		duration : (duration),
		callback : null,
		singleSlide : (singleSlide),
		pause: true
	});
	
	if(typeof Shadowbox === 'function'){
		Shadowbox.init({
	        skipSetup: true
	    });
	    Shadowbox.setup();
	}
	
	//console.log(singleSlide);
});
	