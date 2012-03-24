<?php
/**
 * @file
 * This file is loaded via IFRAME and used to render video embeds, and players.
 * The reason we can not rely on Shadowbox's video ability, is that the current
 * version of shadowbox does not correctly load youtube URL's in an intuitive
 * way.
 *
 * To work correctly, users must use the OLD embed codes from youtube...
 * That's just not good enough. We're programmers. Let's think of a solution!
 *
 * The goal is to avoid training users, and present them with something that
 * just works. This file checks what kind of embed is being used and displays
 * the most compadiable video player possible.
 */
$args = array(
               'src'   => FILTER_SANITIZE_URL,
               'height'=> FILTER_SANITIZE_NUMBER_INT,
               'width' => FILTER_SANITIZE_NUMBER_INT,
               'thumbnail' => FILTER_SANITIZE_URL,
               'embed_host' => FILTER_SANITIZE_SPECIAL_CHARS,
               );
extract(filter_input_array(INPUT_GET, $args), EXTR_OVERWRITE);
switch($embed_host){
  case "vimeo":
    print '<iframe src="'.$src.'" width="'.$width.'" height="'.$height.'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
  break;

  case "youtube":
    print '<iframe width="'.$width.'" height="'.$height.'" src="'.$src.'" frameborder="0" allowfullscreen></iframe>';
  break;

  default:
    // CB.
    print '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'.$width.'" height="'.$height.'" id="swf-1332474088" align="left">
    <param name="movie" value="/sites/all/libraries/shadowbox/player.swf">
    <param name="play" value="true">
    <param name="menu" value="true">
    <param name="wmode" value="transparent">
    <param name="allowscriptaccess" value="always">
    <param name="flashvars" value="videoSrc='.$src.'&amp;posterSrc='.$thumbnail.'&amp;stopAndResetCallBack=stopAndResetVideo&amp;accessibleVideoId=accessibleVideoContent-1332474088&amp;playVideoCallBack=playVideo&amp;videoStartCall=videoStart[1332474088]&amp;videoStopCall=videoStop[1332474088]&amp;showBigPlayBtn=true&amp;aSrcAccount=clgbcollegeboardcomprod">
    <!--[if !IE]>-->
    <object type="application/x-shockwave-flash" data="/sites/all/libraries/shadowbox/player.swf" width="'.$width.'" height="'.$height.'" align="left">
    <param name="play" value="true">
    <param name="menu" value="true">
    <param name="wmode" value="transparent">
    <param name="allowscriptaccess" value="always">
    <param name="flashvars" value="videoSrc='.$src.'&amp;posterSrc='.$thumbnail.'&amp;stopAndResetCallBack=stopAndResetVideo&amp;accessibleVideoId=accessibleVideoContent-1332474088&amp;playVideoCallBack=playVideo&amp;videoStartCall=videoStart[1332474088]&amp;videoStopCall=videoStop[1332474088]&amp;showBigPlayBtn=true&amp;aSrcAccount=clgbcollegeboardcomprod">
    <!--<![endif]-->
    <!--[if !IE]>-->
    </object>
    <!--<![endif]-->
    </object>';
}
?>