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
	var overview = $('#carousel .overview');
	var overview_item = $('#carousel .overview li, #carousel .overlay');
	var carousel_images = $('#carousel .overview li img');
	var overlay = $('#carousel .overlay');
	
	var height = parseInt(Drupal.settings.carousel_2.height);
	var width =  parseInt(Drupal.settings.carousel_2.width);
	var carousel_height = height;
	var carousel_width = width;
	
	var display = parseInt(Drupal.settings.carousel_2.display);
	var pager = parseInt(Drupal.settings.carousel_2.pager);
	var controls = parseInt(Drupal.settings.carousel_2.controls);
	var intervaltime = parseInt(Drupal.settings.carousel_2.intervaltime);
	var duration = parseInt(Drupal.settings.carousel_2.duration);
	var singleSlide = parseInt(Drupal.settings.carousel_2.move_amount);
			
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
	
	if(display >= 2){
		height = height / display;
		width = width / display;
		subtractMarginPx = 4;
		$('.item_image, .item_video').css('margin-right','4px');
		
	}
	
	if(overlay_y <= 50){
		overlay.css({
			height: (overlay_height)+'px',
			top: (overlay_y)+'px'
		});
	} else {
		overlay.css({
			height: (overlay_height)+'px',
			bottom: (100-overlay_y)+'px'
		});
	}
	
	// Dev controlled in sites main script page
	/*if(controls){
		carousel.mouseenter(function(){
			//buttons.show();
		}).mouseleave(function(){
			//buttons.hide();
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
	$('#carousel object, .item_image, .item_video').width((Math.round(width-3))+'px');
	$('#carousel img').width((Math.round(width-3))+'px');
		
	carousel.tinycarousel({ 
		start : 1,
		display : (display),
		axis : 'x',
		controls : (controls),
		pager : (pager),
		interval : true,
		intervaltime : (intervaltime),
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
	