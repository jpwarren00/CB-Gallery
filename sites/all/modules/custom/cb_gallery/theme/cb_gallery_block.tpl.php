<?php
/**
 * @file
 * This tpl file is used to theme the cb_gallery blocks.
 * Unique variables available are:
 * $node->cb_gallery : This contains the cb_gallery data
 *                     for the node being viewed.
 */
// match the node tpl file. No rewriting for node-cb_gallery.tpl.php
$cb_gallery = $node->cb_gallery;

// Video player default settings.
$default_video_height     = 480;
$default_video_width      = 640;
$default_video_src        = NULL;
$shadow_box_height_width  = '';

// Begin by wrapping everything in a div.
$render='<div class="cb_gallery_node">';

// If we are using viewport, include it here.
if($cb_gallery['gallery_info']['viewport_shadowbox'] === 'viewport') {
  $render .= '<div class="viewport">viewport</div>';
}
// First we check if media exists at all.
if(isset($cb_gallery['media'])) {
  
  $render .= '<ul class="thumbport clearfix">';
  
  // Then we loop through the images within the gallery.
  foreach($cb_gallery['media'] as $media) {
    
    // Extract vars for easy writing. This registers all {cb_children} data.
    extract($media, EXTR_OVERWRITE);
    
    // If this is a video, render it's iframe to a hidden div on the page.
    if($media_type == 'video') {
      
      if(preg_match('/^<iframe/i',$media_content)) {
        if(preg_match('/(vimeo|youtube)/i',$media_content, $embed_host_matches)) {
          $embed_host = $embed_host_matches[1];
        }
        $vid_height = (preg_match('/height="([0-9 ]*?)"/i',$media_content,$h) ? $h[1] : $default_video_height);
        $vid_width = (preg_match('/width="([0-9 ]*?)"/i',$media_content,$w) ? $w[1] : $default_video_width);
        $vid_path = (preg_match('/src="(.*?)"/i',stripslashes($media_content),$s) ? $s[1] : $default_video_src);
      }else{
        $embed_host = 'none';
        $vid_height = (preg_match('/height="([0-9 ]*?)"/i',$media_content,$h) ? $h[1] : $default_video_height);
        $vid_width = (preg_match('/width="([0-9 ]*?)"/i',$media_content,$w) ? $w[1] : $default_video_width);
        $vid_path = filter_var($media_content, FILTER_SANITIZE_URL);
      }
      
      $media_content = '/' . drupal_get_path('module', 'cb_gallery') . '/include/player.php?embed_host='.$embed_host.'&src=' . $vid_path . '&thumbnail=' . $media['thumbnail_path'] . '&height=' . $vid_height . '&width=' . $vid_width;
      $shadow_box_height_width = 'height=' . $vid_height . ';width=' . $vid_width ;
    }
    $render .= '<li>';
    $render .= '<p style="height:' . $cb_gallery['gallery_info']['thumbnail_height'] . 'px">';
    
    // If we are using a shadowbox, we need to add the link here.
    if($cb_gallery['gallery_info']['viewport_shadowbox'] == 'shadowbox'){
      $render .= '<a href="' . $media_content . '" rel="shadowbox[' . $node->nid . '];'.$shadow_box_height_width.'" title="' . $media_caption . '" onclick="return false;">';
    }
    
    // Add the thumbnail image.
    $render .= '<img src="' . $media['thumbnail_path'] . '" style="width:' . $cb_gallery['gallery_info']['thumbnail_width'] . 'px"/>';
    
    // Close the <a> tag if we are using a shadowbox.
    if($cb_gallery['gallery_info']['viewport_shadowbox'] == 'shadowbox') {
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