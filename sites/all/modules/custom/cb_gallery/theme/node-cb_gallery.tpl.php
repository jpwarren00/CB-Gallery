<?php
/**
 * @file
 * This tpl file is used to theme the cb_gallery nodes.
 * Unique variables available are:
 * $cb_gallery : This contains the cb_gallery data
 *                     for the node being viewed.
 */
// Begin by wrapping everything in a div.

$default_vid_width = 853;
$default_vid_height =  480;
$media_feature_type = $cb_gallery['gallery_info']['viewport_shadowbox']; // cut down on code.
$img_index = 0;
$viewport_content = ($media_feature_type == 'viewport' ? '' : NULL);
$thumbport_content =  (isset($cb_gallery['media']) ? '' : NULL);

// First we check if media exists at all.
if(isset($cb_gallery['media'])) {
  
 // Then we loop through the images within the gallery.
  foreach($cb_gallery['media'] as $media) {
    
    extract($media, EXTR_OVERWRITE);
    
    // PREPROCESSING VIDEO
    if($media_type == 'video') {
      
      // Is this an HTML ready 5 video?
      $html5_video = (preg_match('/\.(mp4|webm|ogv)/', trim($media_content),$v) ? TRUE : FALSE);
      
      // If this is a video, lets try and grab as much data as we can.
      if(preg_match('/^<iframe/', trim($media_content))) { // is this an iframe?
        $embed_host = (preg_match('/(youtube|vimeo)"/i', $media_content, $e) ? $e[1] : 'unknown');
        $vid_height = (preg_match('/height="([0-9 ].*)"/i',$media_content,$h) ? $h[1] : $default_vid_height);
        $vid_width = (preg_match('/width="([0-9 ].*)"/i',$media_content,$w) ? $w[1] : $default_vid_width);
        $vid_src = (preg_match('/src="(.*)"/i',$media_content,$s) ? $s[1] : NULL);
      }
      
      // Now that we have as much data as we can grab from the media_content
      // lets display the markup that will give the nivo slider the elements
      // that it needs to load it's video player.
      if(isset($viewport_content)) {
        switch($media_feature_type) {
          case 'viewport':
          // VIDEO IN VIEWPORT
            $viewport_content .= '<li data-type="video" data-title="' . $media_caption . '">';
            if($html5_video) {
              $html5_video_srcs = explode("\r\n", $media_content);
              $viewport_content .= '<video width="' . $vid_width . '" height="' . $vid_height . '" controls="control" preload="none">';
              foreach ($html5_video_srcs as $vid_src) {
                  $viewport_content .='<source src="' . $vid_src .'" type="video/' . $v[1] . '" />';
              }
              $viewport_content .= '</video>';
            }else{
              $viewport_content .= stripslashes($media_content); // Add full HTML embed here.
            }
            $viewport_content .= '</li>';
            
            // The link for the thumbnail used to FEATURE this video will be
            // different than if we were using shadowbox.
            // Here is the opening A tag to add navigation to nivo gallery
            $opening_a_tag = '<a href="#" class="viewport_trigger video" rel="' . $img_index . '" title="' . $media_caption . '" onclick="return false;">';
          break;
          case 'shadowbox':
          // VIDEO IN SHADOWBOX
            // Here is the opening A tag used to play this video inside of a
            // shadowbox.
            $opening_a_tag = '<a href="" /' . drupal_get_path('module', 'cb_gallery') .'/include/player.php?embed_host=' . $embed_host . '&height=' . $vid_height . '&width=' . $vid_width . '&src=' . $src . '">';
          break;
        }
      }
    }
    
    // PREPROCESS IMAGE
    if($media_type == 'image') {
      switch($media_feature_type){
        case 'viewport':
          // IMAGE IN VIEWPORT
          $viewport_content .= '<li data-title="' . $media_name . '" data-caption="' . $media_caption . '">';
          $viewport_content .= '<img src="' . $media_content . '" alt="' . $media_caption . 'boosh" />';
          $viewport_content .= '</li>';
          
          // Here is the opening A tag used to feature this this image inside
          // of the nivo-gallery.
          $opening_a_tag = '<a href="' . $media_content . '" class="viewport_trigger" rel="' . $img_index . '" title="' . $media_caption . '" onclick="return false;">';
        break;
        case 'shadowbox':
        // IMAGE IN SHADOWBOX
          $opening_a_tag = '<a href="'.$media['media_content'].'" rel="shadowbox['.$node->nid.'];" title="'.$media['media_caption'].'" onclick="return false;">';
        break;
      }
    }
    
    // PREPROCESS THUMBNAIL IMAGE
    // Add the thumbnail image to the thumbport.
    $thumbport_content .= '<li>';
    $thumbport_content .= '<p style="height:'.$cb_gallery['gallery_info']['thumbnail_height'].'px;">';
    $thumbport_content .= $opening_a_tag;
    $thumbport_content .= '<img src="' . $thumbnail_path . '" style="width:' . $cb_gallery['gallery_info']['thumbnail_width'] . 'px;"/>';
    $thumbport_content .= '</a>';
    $thumbport_content .= '</p>';
    $thumbport_content .= '</li>';
    $img_index++;
  }
}

$css = ' ' . $cb_gallery['gallery_info']['unique_css_block_class'];
$render ='<div class="cb_gallery_node' . $css . '">'; 
if(isset($viewport_content)) {
  $render .= '<div class="nivoGallery"><ul>'; 
  $render .= $viewport_content;
  $render .= '</ul></div>';
}
  $render .= '<ul class="thumbport clearfix">'; 
  $render .= $thumbport_content;
  $render .= '</ul><!-- end thumbport -->';
  
$render .= '</div> <!-- end cb_gallery_node -->'; //end cb_gallery_node
print $render;