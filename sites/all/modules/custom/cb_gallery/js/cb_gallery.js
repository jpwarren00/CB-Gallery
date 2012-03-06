/**
 * CB Gallery Main Javascript
 * What this file does:
 * 1-Impliments the jQuery UI Sortable method.
 * 2-Manage Custom Show/Hides
 */
 $(function(){ // On Document Ready
    
    var live_preview = '<div id="preview_wrapper" class="clearfix"><div id="viewport"></div><div id="thumb_port" class="clearfix"><ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div></div>';
    $('#live_preview').addClass('fourByThree'); // Default to 4x3
    $('#live_preview').append(live_preview);
    // Helper functions
    function resetEditFormFields(){
        alert('clearing');
        $('.image_fieldset').slideUp('slow'); // hide fieldsets
        $('.video_fieldset').slideUp('slow'); // hide fieldsets
        
        // Clear all elements within this form.
        $('#cb-gallery-edit-form :text, #edit-media-caption').not('#edit-gallery-name').val('');
        $('input[name="media_type"]').attr('checked', false); // set all radio buttons to false.
        
        // Button Control
        $('.submit_edit_media_button').hide();// Show the SUBMIT EDITS button.
        $('.cencel_edit_media_button').hide();// Show the Cancel EDITS button.
    }
    
    // Helper Functions
    function populateForm(data){
        $('.input_image_name').val(data.media_name);// set the name
        $('.input_image_caption').val(data.media_caption);// set the caption
        $('.input_thumbnail_path').val(data.thumbnail_path);// set the thumbnail
        $('input[name="media_type"]').attr('checked', false); // set all radio buttons to false.
        switch(data.media_type)
        {
            case "video":
                $('input[name="media_type"][value="video"]').attr('checked', true);
                $('.input_video_embed_code').val(data.media_content);
                $('.video_fieldset').slideDown('slow'); // show fieldset
            break;
            case "image":
                $('input[name="media_type"][value="image"]').attr('checked', true);
                $('.input_remote_image').val(data.media_content);
                $('.image_fieldset').slideDown('slow'); // show fieldset
            break;
        }
    }
    
    // Helper functions
    function set_cb_status(data){
        $('#cb_gallery_sort_status').slideUp('slow',function(){          // Hide the Status
            $('#cb_gallery_sort_status')
            .empty()                       // Clear the Status
            .addClass(data.message_class)  // Style the Status
            .html(data.message)            // Write the Status
            .slideDown();                   // Show the Status
        });
    }
    
    // Cancel Button Bindongs
    $('.cencel_edit_media_button').click(function(){
        $('#edit-edit-media-id').val('');//Remove that hidden form value!!
        $('.being_edited').removeClass('being_edited');
        $('.add_to_gallery_button').show();// Show the ADD TO GALLERY button.
        $(this).hide();// Show the ADD TO GALLERY button.
        resetEditFormFields(); // clear the form and reset for Add
    });
    //Implimentation of jQuery Sortable()
    $('#my_cb_gallery').sortable({
        axis: 'y',
        containment: 'parent',
        stop: function(event,ui){
            var hookMenuSafeArgs = $('#my_cb_gallery').attr('rel')+'-'+$('#my_cb_gallery').sortable('serialize');
            hookMenuSafeArgs = hookMenuSafeArgs.replace(/&/g,"-"); // kill '&'. It would confuse hook_menu()
            hookMenuSafeArgs = hookMenuSafeArgs.replace(/img\[\]=/g,""); // kill 'img[]='. It makes the PHP parseing easyier. The Gallery ID is the first number in the array.
            $.getJSON('/admin/cb_gallery_ajax/change_sort_order/'+hookMenuSafeArgs,{},
                    function(data){
                        set_cb_status(data);
                    });
        }
    });
    
    /**
     * Media Edit Binding
     * Turn the ADD form into an EDIT form. This will also allow for easy media cloning.
     * ... Alright, here we go.
     */
    $('.media_edit').click(function(obj){
        $('.being_edited').removeClass('being_edited'); // clear all 'being_edited' classes.
        var media_id = $(this).parents('.dragable').attr('id').replace('img_','');
        $('#edit-edit-media-id').val(media_id); // This tells PHP that we are EDITING, and not just submitting.
        $(this).parents('.dragable').addClass('being_edited');// add class to the gallery element being edited.
        $.getJSON($(this).attr('href'),{},
                        function(data){
                            $('.image_fieldset').slideUp('slow'); // hide fieldsets
                            $('.video_fieldset').slideUp('slow'); // hide fieldsets
                            $('.add_to_gallery_button').hide();// Hide the ADD TO GALLERY button.
                            $('.submit_edit_media_button').show();// Show the SUBMIT EDITS button.
                            $('.cencel_edit_media_button').show();// Show the Cancel EDITS button.
                            populateForm(data);
                        }
            );
    });
    
    
    
    /**
     * Clone
     */
    $('.media_clone').click(function(obj){
        var media_id = $(this).parents('.dragable').attr('id').replace('img_','');
        $.getJSON($(this).attr('href'),{},
                        function(data){
                            $('.image_fieldset').slideUp('slow'); // hide fieldsets
                            $('.video_fieldset').slideUp('slow'); // hide fieldsets
                            populateForm(data);
                    }
            );
    });
    
    
    
    
    /**
     * Media Delete Binding.
     */
    $('.media_delete').click(function(obj){
        
        $(this).parents('.dragable').addClass('being_deleted');// add class to the gallery element being edited.
        
        if(confirm('Are you sure that you want to delete this gallery item?')){
            // This has been confirmed. Go ahead and delete it.
            $(this).parents('.dragable').fadeOut('slow',function(){
                $(this).remove();
            });
            $.getJSON($(this).attr('href'),{},
                        function(data){
                            set_cb_status(data);
                        });
                    }else{
                        // Don't delete anything!
                        $(this).parents('.dragable').removeClass('being_deleted');// add class to the gallery element being edited.
                        set_cb_status({message:'Nothing was deleted. Whew! That was close, huh?', message_class:'status'});
                        
                    }
            });
    function submit_order(){
    }
    $('.form-radios input[value=video]').click(function(){
        $('.image_fieldset').slideUp('slow',function(){
            $('.video_fieldset').slideDown();
        });
        
    });
    $('.form-radios input[value=image]').click(function(){
        $('.video_fieldset').slideUp('slow',function(){
           $('.image_fieldset').slideDown(); 
        });
    });
});