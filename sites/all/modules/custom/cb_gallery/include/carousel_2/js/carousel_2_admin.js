function toggleImageSortable(flickrField){
	if(flickrField.val() != ''){
		$('.image-sortable').slideUp();
	} else {
		$('.image-sortable').slideDown();
	}
}
$(document).ready(function(){  
	var toggleItem = $('.image-sortable.collapsed');
	if($('#edit-carousel-settings-flickr-set')){
		//toggleImageSortable($('#edit-carousel-settings-flickr-set'));
	}
	$('.column-wrapper, .node-form .standard').sortable({
		items: ".image-sortable",
		stop: function(event, ui) { 
			var counter = -1;
			$('.sort-input').each(function(index){
				if(index % 4 == 0){
					counter++;
				}
				$(this).attr('name', $(this).attr('name').replace(/image[0-9]/, 'image'+counter))
					.attr('id', $(this).attr('id').replace(/image[0-9]/, 'image'+counter));
				
				
			});
		}
	});
	
	$('#edit-carousel-settings-flickr-set').bind('blur', function(){
		//toggleImageSortable($('#edit-carousel-settings-flickr-set'));
	});
	
	toggleItem.each(function(){
		var fieldset = $(this);
		if(fieldset.children('legend').text().match('Image')){
			var formItem = $(this).find('.formItem input');
			if(formItem != ''){	
				fieldset.next().hide();
			}
		}
	});
	
	toggleItem.find('legend').children().bind('click', function(e) {
		$(this).parents().next('.image-sortable').show();	
	});
	
	$('#edit-carousel-settings-height, #edit-carousel-settings-width, #edit-carousel-settings-overlay-height, #edit-carousel-settings-overlay-y').parent().css({
		width: '32%', 
		float: 'left'
	});

	$('#edit-carousel-settings-display, #edit-carousel-settings-interval-time').parent().css({
		clear: 'both'
	});
	
	$('#edit-revision-wrapper').parents('fieldset').hide();
	
	Drupal.jsAC.prototype.found = function (matches) {
        if (!this.input.value.length) {
          return false;
        }
        var ul = document.createElement('ul');
        var ac = this;
        for (key in matches) {
          var li = document.createElement('li');
          //to avoid of showing nids object in the select list 

              $(li)
                .html('<div>'+ matches[key].title +'</div>')
                .mousedown(function () {
                	ac.select(this);
                }).mouseover(function () {
                	ac.highlight(this);
                }).mouseout(function () {
                	ac.unhighlight(this);
              });
              li.autocompleteValue = key;
              $(ul).append(li)

           //add all nids to prototype
              Drupal.jsAC.prototype.tn = matches[key].tn;
              Drupal.jsAC.prototype.overlay = matches[key].overlay;
             // console.log(matches[key].cnid);
          
       }
        $('#autocomplete').append(ul).show();
    };
      
    Drupal.jsAC.prototype.select = function (node) {
      this.input.value = node.autocompleteValue;
      var fieldset = $(this.input).parent().parent();
      var node_ref_tn = fieldset.find('.main-image-tn');
      var node_ref_link = fieldset.find('.main-image-link');
      var node_ref_overlay = fieldset.find('.main-image-overlay');
      //console.log(node_ref_img);
      node_ref_tn.val(Drupal.jsAC.prototype.tn);
      node_ref_link.val(node.autocompleteValue);
      node_ref_overlay.val(Drupal.jsAC.prototype.overlay);
    };    
});