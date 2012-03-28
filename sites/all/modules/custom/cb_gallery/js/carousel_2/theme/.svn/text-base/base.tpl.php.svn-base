<?php

function get_file_extension($file_name){
  return substr(strrchr($file_name,'.'),1);
}

function get_flickr($flickr_data){
	/*$photo_url_s = $f->buildPhotoURL($photo, $size = "Thumbnail");
	$photo_url_l = $f->buildPhotoURL($photo, $size = "Medium 640");
	$photo_url_xl = $f->buildPhotoURL($photo, $size = "Large");*/
	require_once(drupal_get_path('module', 'flickrapi').'/phpFlickr/phpFlickr.php');
	$f = new phpFlickr("e98b69ecfaa2aa3123027c201d7b5683");
	$f->photosets_getPhotos('72157622609185791', $extras = null, $privacy_filter = null, $per_page = null, $page = null, $media = null);
	$photo_url_s = $f->buildPhotoURL($photo, $size = "Thumbnail");
	$photo_url_l = $f->buildPhotoURL($photo, $size = "Medium 640");
	$photo_url_xl = $f->buildPhotoURL($photo, $size = "Large");
	//$user_id = photosets_getList('10881037@N03');
	return $recent;
}

$item_id = $node->id;
$item_nid = $node->nid;
// An unfortunate extra step (Also in carousel_2.module:carousel_2_form())
// Drupal seems to remove curlies on db insert/update
// Learned proper way to save, fix this asap
$image_json = '{'.$node->img.','.$node->img_tn.','.$node->link.','.$node->overlay_text.'}';
$data = json_decode($image_json);
if($data){
	$height = $node->height;
	$width = $node->width;
	$img_count = count($data->img);
	$pager = '';
	$page_count = 0;
	$pager_list_items = '';
	$item_number = 0;
	$rel = '';
	?>
	<?php if (user_access('administer nodes')) { ?>
   		<a class="carousel-edit" href="node/<?php print $item_nid; ?>/edit">Edit</a>
    <?php } ?>
	<div id="carousel">
	<div class="viewport">
	<ul class="overview">
	<?php
	
	if($node->flickr_set != '' && $node->flickr_api != ''){
		require_once(drupal_get_path('module', 'flickrapi').'/phpFlickr/phpFlickr.php');
		$f = new phpFlickr($node->flickr_api);
		$flickr = $f->photosets_getPhotos($node->flickr_set, $extras = null, $privacy_filter = null, $per_page = null, $page = null, $media = null);
		
		//$flickr = get_flickr($node->flickr_set);
		
		foreach ($flickr['photoset']['photo'] as $key => $photo) {
			$photo_title = $photo['title'];
			$photo_title = str_replace(' ', '_', $photo['title']);
			$photo_url = $photo['id'];
			$photo_url_s = $f->buildPhotoURL($photo, $size = "Thumbnail");
			$photo_url_l = $f->buildPhotoURL($photo, $size = "Medium 640");
			$photo_url_xl = $f->buildPhotoURL($photo, $size = "Large");
			
			list($img_actual_width, $img_actual_height) = getimagesize($photo_url_xl);
			// Effing idiot! do this math once outside the loop. Sorry to all programmers everywhere
			if($node->pager == '1'){
				if($key % $node->display == 0){
					$page_count++;
					$pager_list_items .= '<li><a rel="'.($page_count).'" class="pagenum" href="#">'.$page_count.'</a></li>';
				}  	
			}
			?>
			<li class="item_image" rel="<?php print $page_count; ?>">

					<?php if($node->shadowbox == '1'){ 
						$rel = 'shadowbox[carousel_'.$item_id.'];height='.$img_actual_height.';width='.$img_actual_width.';';
					}?>
					<a href="<?php print $link; ?>" rel="<?php print $rel; ?>">

				<a href="<?php print $photo_url_xl;?>" rel="">
					<?php if($node->overlay == '1' && !empty($overlay)){ ?>
						<div class="overlay"><?php print $overlay; ?></div>
					<?php } ?>
					<img title="<?=$photo_title?>" alt="<?=$photo_url_xl?>" src="<?=$photo_url_l?>"/>
				</a>
			</li>
			<?php 
		}	
	} else {

		foreach($data->img as $key => $val){
			$item_number++;
			$item = $data->img[$key];
			$item_tn = $data->img_tn[$key];
			$link = $data->link[$key] == '' ? $item : $data->link[$key];
			$overlay = $data->overlay_text[$key];
			if($item != ''){
				list($img_actual_width, $img_actual_height) = getimagesize($item);
				if($node->pager == '1'){
					if($key % $node->display == 0){
						$page_count++;
						$pager_list_items .= '<li><a rel="'.($page_count).'" class="pagenum" href="#">'.$page_count.'</a></li>';
					}  	
				}
				if(get_file_extension($item) == 'jpg' || get_file_extension($item) == 'png' || get_file_extension($item) == 'gif' || get_file_extension($item) == 'jpeg'){
					?>
						<li class="item_image" rel="<?php print $page_count; ?>">
						<?php if($link != ''){ 
								if($node->shadowbox == '1'){
									$rel = 'shadowbox[carousel_'.$item_id.'];height='.$img_actual_height.';width='.$img_actual_width.';';
								}?>
								<a href="<?php print $link; ?>" rel="<?php print $rel; ?>">
						<?php } ?>
						<?php if($node->overlay == '1' && !empty($overlay)){ ?>
							<div class="overlay"><?php print $overlay; ?></div>
						<?php } ?>
						<img  src="<?php print $item_tn; ?>" />
						<?php if($link != ''){ ?>
							</a>
						<?php } ?>
							</li>
					<?php 
					
				} else if(get_file_extension($item) == 'flv' || get_file_extension($item) == 'mp4'){
					?>
						<li class="item_video" rel="<?php print $page_count; ?>">
						<a href="#border-box-<?php print $item_id;?>" rel="shadowbox[carousel_<?php print $item_id; ?>];height=<?php print $img_actual_height; ?>;width=<?php print $img_actual_width; ?>">
						<?php if($node->overlay == '1'){ ?>
							<div class="overlay"><?php print $overlay; ?></div>
						<?php } ?>
						</a>
						<div class="border-box" id="border-box-<?php print $item_id;?>">
							<div class="videoContainer">
								<object type="application/x-shockwave-flash" id="swf-<?php print $item_id;?>" tabindex="0"
									data="http://<?php print $_SERVER['HTTP_HOST']; ?>/sites/all/modules/custom/flash_video/swf/homePlayer.swf"
									width="<?php print $width; ?>" height="<?php print $height; ?>">
									<param name="menu" value="false">
									<param name="scale" value="noScale">
									<param name="allowFullscreen" value="true">
									<param name="allowScriptAccess" value="always">
									<param name="bgcolor" value="#FFFFFF">
									<param name="quality" value="best">
									<param name="wmode" value="transparent">
									<param name="flashvars" value="videoSrc=<?php print $item; ?>&amp;posterSrc=<?php print $item_tn; ?>&amp;stopAndResetCallBack=stopAndResetVideo&amp;accessibleVideoId=accessibleVideoContent-<?php print $item_id;?>&amp;playVideoCallBack=playVideo&amp;videoStartCall=videoStart[<?php print $item_id;?>]&amp;videoStopCall=videoStop[<?php print $item_id;?>]&amp;showBigPlayBtn=true&amp;aSrcAccount=clgbcollegeboardcomprod">
								</object>
								<div id="accessibleVideoContent-<?php print $item_id;?>" class="onlyScreenReaderVisible">
									<a
										href="http://media.collegeboard.com/digitalServices/video-player/nosca/Come-to-NOSCA-2012-Destination-Equity-071211-final.mp4">Download
										Video</a>
						
								</div>
							</div>
						</div></li>
					<?php 
				}
			}
		}
	}
	?>
	</ul>
	</div>
	<div class="button-container"><?php 
		if($node->controls = '1'){
			?><a class="buttons prev"></a><a class="buttons next"></a><?php 
		}
	?></div>
	<?php 
	$pager = '<ul class="pager">'.$pager_list_items.'</ul>';
	print $pager;
	?>
	
	</div>
	<?php 
}
?>