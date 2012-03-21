<?php
/**
 * @file
 * This tpl file is used to theme the cb_gallery blocks.
 * Unique variables available are:
 * $node->cb_gallery : This contains the cb_gallery data
 *                     for the node being viewed.
 */
 
// Begin by wrapping everything in a div.
$render='<div class="cb_gallery_node">';
// If we are using viewport, include it here.
if($node->cb_gallery['gallery_info']['viewport_shadowbox'] === 'viewport') {
  $render .= '<div class="viewport">viewport</div>';
}
// First we check if media exists at all.
if(isset($node->cb_gallery['media'])) {
  
  $render .= '<ul class="thumbport clearfix">';
  
  // Then we loop through the images within the gallery.
  foreach($node->cb_gallery['media'] as $media) {
    
    $render .= '<li>';
    $render .= '<p style="height:'.$node->cb_gallery['gallery_info']['thumbnail_height'].'px">';
    
    // If we are using a shadowbox, we need to add the link here.
    if($node->cb_gallery['gallery_info']['viewport_shadowbox'] == 'shadowbox'){
      $render .= '<a href="'.$media['media_content'].'" rel="shadowbox['.$node->nid.'];" title="'.$media['media_caption'].'" onclick="return false;">';
    }
    
    // Add the thumbnail image.
    $render .= '<img src="'.$media['thumbnail_path'].'" style="width:'.$node->cb_gallery['gallery_info']['thumbnail_width'].'px"/>';
    
    // Close the <a> tag if we are using a shadowbox.
    if($node->cb_gallery['gallery_info']['viewport_shadowbox'] == 'shadowbox') {
      $render .= '</a>';
    }
    
    // Close the other tags for this image.
    $render .= '</p>';
    $render .= '</li>';
  }
  
  $render .= '</ul><!-- end thumbport -->';//end thumbport
}
$render .= '</div> <!-- end cb_gallery_node -->'; //end cb_gallery_node
print $render;