/**
 * CB Gallery Main Javascript
 * What this file does:
 * 1-Impliments the jQuery UI Sortable method.
 * 2-Manage Custom Show/Hides
 */
$(function () { // On Document Ready
  $('#ajax_loading').ajaxStart(function () {
   $(this).css('line-height', $('#my_cb_gallery').height() + 'px');
    $(this).text('Loading...');
    $(this).fadeIn('fast');
  });
  $('#ajax_loading').ajaxStop(function () {
    $(this).fadeOut('fast');
  });

  $('.viewport_trigger').click(function () {

    //$(this).parents('.thumbport').siblings('.nivoGallery').data('nivoGallery').goTo(Number($(this).attr('rel')));
  });
  // Event binding must be reapplied when new gellery items are created.
  // This function will register all gallery_reorder_gui events.
  resetEventBindings();

  /**
   * Live Gallery Layout Preview
   */

  function refreshLivePreview(media_feature_type, thumbnail_aspect_ratio) {

    // Set default viewport values incase arguments are missing. (which happens onload).
    if (media_feature_type == undefined && thumbnail_aspect_ratio == undefined) {
      media_feature_type = $('input[name="media_feature_type"]:checked').val(), thumbnail_aspect_ratio = $('input[name="thumbnail_aspect_ratio"]:checked').val();
    }

    $('#edit-thumbnail-settings-thumbnail-height-wrapper').hide();
    switch (thumbnail_aspect_ratio) {
    case "4:3":
      $('#live_preview').addClass('fourByThree').removeClass('sixteenByNine').removeClass('oneToOne');
      break;
    case "custom_height":

      $('#edit-thumbnail-settings-thumbnail-height-wrapper').show();
      break;
    case "auto":
    case "16:9":
      $('#live_preview').addClass('sixteenByNine').removeClass('fourByThree').removeClass('oneToOne');
      break;
    case "1:1":
      $('#live_preview').addClass('oneToOne').removeClass('sixteenByNine').removeClass('fourByThree');
      break;
    }
    switch (media_feature_type) {
    case "thumbnails":
      $('#live_preview').addClass('noViewport').removeClass('viewport') //hide viewport
      .addClass('showThumbport') //show thumbport
      .removeClass('noThumbport');
      $('.carousel_2_settings_fieldset').slideUp(function () {
        $('.thumbnail_settings_fieldset').slideDown();
      });
      break;
    case "gallery":
      $('#live_preview').addClass('viewport') //show viewport
      .removeClass('noViewport').addClass('showThumbport') //show thumbport
      .removeClass('noThumbport');
      $('.thumbnail_settings_fieldset').slideDown();
      $('.carousel_2_settings_fieldset').slideDown();
      break;
    case "carousel_2":
      $('#live_preview').addClass('viewport') //show viewport
      .removeClass('noViewport').removeClass('showThumbport').addClass('noThumbport'); //hide thumbport
      $('.thumbnail_settings_fieldset').slideUp(function () {
        $('.carousel_2_settings_fieldset').slideDown();
      });

      $('.thumbnail_settings_fieldset').slideUp(function () {
        $('.carousel_2_settings_fieldset').slideDown();
      });
      break;
    }
  }
  refreshLivePreview(); // set default live-preview.
  // Helper functions
  function resetEditFormFields() {
    $('.being_cloned').removeClass('being_cloned');
    $('.being_edited').removeClass('being_edited');
    $('.image_fieldset').slideUp('slow'); // hide fieldsets
    $('.video_fieldset').slideUp('slow'); // hide fieldsets
    // Clear all elements within this form.
    $('#node-form .input_image_name, #node-form .input_image_caption, #node-form .input_thumbnail_path, #edit-edit-media-id').val('');
    $('input[name="media_type"]').attr('checked', false);

    // Button Control
    $('.submit_edit_media_button').hide(); // Show the SUBMIT EDITS button.
    $('.cancel_edit_media_button').hide(); // Show the Cancel EDITS button.
  }

  //Happy Scroll :D
  function happyScroll(id) {
    $('html,body').animate({
      scrollTop: $(id).offset().top
    }, 'slow');
  }
  // Helper Functions
  function populateForm(data) {
    $('.input_image_name').val(data.media_name); // set the name
    $('.input_image_caption').val(data.media_caption); // set the caption
    $('.input_thumbnail_path').val(data.thumbnail_path); // set the thumbnail
    $('input[name="media_type"]').attr('checked', false); // set all radio buttons to false.
    $('.cancel_edit_media_button').show(); // Show the Cancel EDITS button.
    switch (data.media_type) {
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
  function set_cb_status(data, parents_or_children) {

    $('#cb_gallery_sort_status').slideUp('slow', function () { // Hide the Status
      $(this).empty() // Clear the Status
      .addClass(data.message_class) // Style the Status
      .html(data.message) // Write the Status
      .slideDown() // Show the Status
    });
  }


  /**
   * Update CB_CHILDREN table with new data.
   */
  $('.submit_new_media, .submit_edit_media_button').click(function () {

    var op = ($(this).hasClass('submit_edit_media_button') ? 'update' : 'insert');
    var data_to_post = {};
    var gallery_nid = $('.gallery_nid').val();

    $('.send_to_cb_children').each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name != undefined) {
        if ($(this).is(':checkbox, :radio')) {
          val = $('input[name=' + $(this).attr('name') + ']:checked').val();
        }
        data_to_post[name] = val;
      }
    });
    $.ajax({
      type: "POST",
      url: '/admin/cb_gallery_ajax/media_processing/' + gallery_nid,
      dataType: 'json',
      data: data_to_post,
      success: function (data) {
        if (data[0].return_media != undefined) {
          switch (op) {
          case 'update':
            $('#my_cb_gallery .being_edited').after(data[0].return_media); // add the returned element to the DOM.
            $('#my_cb_gallery .being_edited').fadeOut('slow', function () {
              $('#my_cb_gallery .new_cb_addition').fadeIn('slow', function () {
                $(this).removeClass('new_cb_addition'); // remove "new_addition" flag
                $('.being_edited').removeClass('being_edited'); //remove all editing styles
              });
            });
            break;
          case 'insert':
            $('#my_cb_gallery').prepend(data[0].return_media); // add the returned element to the DOM.
            $('#my_cb_gallery .new_cb_addition').fadeIn('slow', function () {
              $(this).removeClass('new_cb_addition');
            });
            break;
          }
          $('#my_cb_gallery .empty').fadeOut('slow', function () {
            $(this).remove();
          }); // remove empty placeholder if it exists
          resetEditFormFields(); // Clear out the form
          resetEventBindings(); // Reset the jquery event bindings to include the newly added DOM element.
        }
      }
    });
  });

  /**
   * @function
   * resetEventBindings
   * Args: NONE
   * Return: NULL
   * Description:
   * When a new gallery item is created, it's menu is unbound.
   * This function will register the click events of the new item
   * with the DOM.
   */
  function resetEventBindings() {
    //Implimentation of jQuery Sortable()
    if ($('#my_cb_gallery > div').length > 1) { // Only allow sort if there is MORE than one media element in the gallery.
      $('#my_cb_gallery').sortable({
        axis: 'y',
        containment: 'parent',
        stop: function (event, ui) {
          var hookMenuSafeArgs = $('#my_cb_gallery').attr('rel') + '-' + $('#my_cb_gallery').sortable('serialize');
          hookMenuSafeArgs = hookMenuSafeArgs.replace(/&/g, "-"); // kill '&'. It would confuse hook_menu()
          hookMenuSafeArgs = hookMenuSafeArgs.replace(/img\[\]=/g, ""); // kill 'img[]='. It makes the PHP parseing easier. The Gallery ID is the first number in the array.
          $.getJSON('/admin/cb_gallery_ajax/change_sort_order/' + hookMenuSafeArgs, {}, function (data) {
            set_cb_status(data);
          });
        }
      });
    } else {
      //$('#my_cb_gallery').sortable('disable');
    }

    // Bind Thumbnail Aspect Ratio
    $('input[name="thumbnail_settings[thumbnail_aspect_ratio]"]').click(function () {
      var thumbnail_aspect_ratio = $(this).val(),
        media_feature_type = $('input[name="media_feature_type"]:checked').val();

      refreshLivePreview(media_feature_type, thumbnail_aspect_ratio);
    });

    // Bind Viewport Toggle
    $('input[name="media_feature_type"]').click(function () {
      var thumbnail_aspect_ratio = $('input[name="thumbnail_aspect_ratio"]:checked').val(),
        media_feature_type = $(this).val();
      refreshLivePreview(media_feature_type, thumbnail_aspect_ratio);

    });

    // Cancel Button Bindongs
    $('.cancel_edit_media_button').click(function () {
      $('.being_edited').removeClass('being_edited');
      $('.being_cloned').removeClass('being_cloned');
      $('.add_to_gallery_button').show(); // Show the ADD TO GALLERY button.
      $(this).hide(); // Show the ADD TO GALLERY button.
      resetEditFormFields(); // clear the form and reset for Add
    });
    // Edit Binding.
    $('.media_edit').click(function (obj) {
      var media_id = $(this).parents('.dragable').attr('id').replace('img_', '');
      $('.being_edited').removeClass('being_edited'); // clear all 'being_edited' classes.
      $('#edit-edit-media-id').val(media_id); // This tells PHP that we are EDITING, and not just submitting.
      $(this).parents('.dragable').addClass('being_edited'); // add class to the gallery element being edited.
      $.getJSON($(this).attr('href'), {}, function (data) {
        $('.image_fieldset').slideUp('slow'); // hide fieldsets
        $('.video_fieldset').slideUp('slow'); // hide fieldsets
        $('#edit-add-media-button').hide(); // Hide the ADD TO GALLERY button.
        $('.submit_edit_media_button').show(); // Show the SUBMIT EDITS button.
        $('.cancel_edit_media_button').show(); // Show the Cancel EDITS button.
        populateForm(data);
        happyScroll('#NewMediaFormTop');
        $('.new_media_fieldset').removeClass('collapsed').addClass('being_edited');
        $('> div:not(.action)', $('.new_media_fieldset')).slideDown();
        $('.input_image_name').focus();
        $('.submit_new_media').hide();
      });
    });

    // Clone Binding
    $('.media_clone').click(function (obj) {
      $('.being_cloned').removeClass('being_cloned'); // clear all 'being_edited' classes.
      $(this).parents('.dragable').addClass('being_cloned'); // add class to the gallery element being cloned.
      $('.submit_new_media').show(); // Show the SUBMIT EDITS button.
      var media_id = $(this).parents('.dragable').attr('id').replace('img_', '');
      $.getJSON($(this).attr('href'), {}, function (data) {
        $('.image_fieldset').slideUp('slow'); // hide fieldsets
        $('.video_fieldset').slideUp('slow'); // hide fieldsets
        populateForm(data);
        happyScroll('#NewMediaFormTop');
        $('.new_media_fieldset').removeClass('collapsed').addClass('being_cloned');
        // $('> div:not(.action)', $('.new_media_fieldset')).slideDown();
        $('.input_image_name').focus();
      });
    });
    // Delete Binding
    $('.media_delete').click(function () {
      $(this).parents('.dragable').addClass('being_deleted'); // add class to the gallery element being edited.
      if (confirm('Are you sure that you want to delete this gallery item?')) {
        // This has been confirmed. Go ahead and delete it.
        $(this).parents('.dragable').fadeOut('slow', function () {
          $(this).remove();
        });
        $.getJSON($(this).attr('href'), {}, function (data) {
          set_cb_status(data);
        });
      } else {
        // Don't delete anything!
        $(this).parents('.dragable').removeClass('being_deleted'); // add class to the gallery element being edited.
        set_cb_status({
          message: 'Nothing was deleted. Whew! That was close, huh?',
          message_class: 'status'
        });

      }
    });
  }

  $('.form-radios input[value=video]').click(function () {
    $('.image_fieldset').slideUp('slow', function () {
      $('.video_fieldset').slideDown();
    });

  });

  $('.form-radios input[value=image]').click(function () {
    $('.video_fieldset').slideUp('slow', function () {
      $('.image_fieldset').slideDown();
    });
  });
});