<?php
/**
 * @file
 * This tpl file is used to theme the cb_gallery nodes.
 * Unique variables available are:
 * $cb_gallery
 * 
 */

// This node.tpl file is a default display.
// To edit the display, simply uncomment the following line to see the entire
// structure of the cb_gallery that you can use for your own themes.
//dsm($cb_gallery);

function _getSlidesFromFlickrFeed($carousel_2_settings = NULL) {
  if(!isset($carousel_2_settings)) {
    return FALSE;
  }
  // Require the Flikr API to continue
  require_once(drupal_get_path('module', 'flickrapi').'/phpFlickr/phpFlickr.php');
  
  $f = new phpFlickr($carousel_2_settings['flickr_api']);
  $flickr = $f->photosets_getPhotos($carousel_2_settings['flickr_set'], $extras = null, $privacy_filter = null, $per_page = null, $page = null, $media = null);
  
  // Loop through each image from the flickr feed.
  foreach ($flickr['photoset']['photo'] as $key => $photo) {
    $photo_title = $photo['title'];
    $photo_title = str_replace(' ', '_', $photo['title']);
    $photo_url = $photo['id'];
    $photo_url_s = $f->buildPhotoURL($photo, $size = "Thumbnail");
    $photo_url_l = $f->buildPhotoURL($photo, $size = "Medium 640");
    $photo_url_xl = $f->buildPhotoURL($photo, $size = "Large");
      
      list($img_actual_width, $img_actual_height) = getimagesize($photo_url_xl);
      // JH - Effing idiot! do this math once outside the loop. Sorry to all
      // JH - programmers everywhere.
      // DS - I am not quite clear why we use the % here.
      if($carousel_2_settings['pager'] == 1) {
        if($key % $carousel_2_settings['display'] == 0) {
          $page_count++;
          $pager_list_items .= '<li><a rel="'.($page_count).'" class="pagenum" href="#">'.$page_count.'</a></li>';
        }  	
      }
      
      if($carousel_2_settings['shadowbox'] == 1) { 
        $rel = 'shadowbox[carousel_'.$item_id.'];height='.$img_actual_height.';width='.$img_actual_width.';';
      }
      $carousel_slides .= '<li class="item_image" rel=" ' . $page_count . '">';
      $carousel_slides .= '<a href="' . $link . '" rel="' . $rel . '">';
      $carousel_slides .= '<a href="' . $photo_url_xl . '" rel="">';
      if($carousel_2_settings['overlay'] == 1 && !empty($overlay)) { 
        $carousel_slides .= '<div class="overlay">' . $overlay . '</div>';
      } 
      $carousel_slides .= '<img title="' . $photo_title . '" alt="' . $photo_url_xl . '" src="' . $photo_url_l . '"/>';
      $carousel_slides .= '</a></li>';
  }
  return $carousel_slides;
}
/**
 * Return the file extention of a given URL.
 */
function _get_file_extension($filename){
  $x =  pathinfo($filename, PATHINFO_EXTENSION);
  return $x['extension'];
}
?>


//CAROUSEL 2
<?php



  // We will presume that we are in the loop
  

switch($media_type) {
  case 'image':
 
  break;
  case "video":

}
      

  $carousel_slides .= '</ul></div>';
  $carousel_slides .= '<div class="button-container">';
  if($carousel_2_settings['controls'] = 1){
    $carousel_slides .= '<a class="buttons prev"></a><a class="buttons next"></a>';
  }
$carousel_slides .= '</div>';
$pager = '<ul class="pager">'.$pager_list_items.'</ul>';
	$carousel_slides .= $pager;
	
	$carousel_slides .= '</div>';

}
//END CAROUSEL 2
?>

<div class="cb_gallery_node <?php print $cb_gallery['gallery_info']['unique_css_block_class']; ?>">
<div id="carousel">
  <div class="viewport">
  <ul class="overview">
<?php //print $cb_gallery['viewport']; ?>
<?php //print $cb_gallery['thumbport']; ?>
</div> <!-- end cb_gallery_node -->