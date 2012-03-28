<?php
require_once(drupal_get_path('module', 'flickrapi').'/phpFlickr/phpFlickr.php');
$f = new phpFlickr($node->flickr_api);
$flickr = $f->photosets_getPhotos($node->flickr_set, $extras = null, $privacy_filter = null, $per_page = null, $page = null, $media = null);

//$flickr = get_flickr($node->flickr_set);
//apiKey = e98b69ecfaa2aa3123027c201d7b5683
//getPhotos = 72157622609185791
foreach ($flickr['photoset']['photo'] as $key => $photo) {
	$photo_title = $photo['title'];
	$photo_title = str_replace(' ', '_', $photo['title']);
	$photo_url = $photo['id'];
	$photo_url_s = $f->buildPhotoURL($photo, $size = "Thumbnail");
	$photo_url_l = $f->buildPhotoURL($photo, $size = "Medium 640");
	$photo_url_xl = $f->buildPhotoURL($photo, $size = "Large");
	$rel = '';
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
				print '<a href="'.$link.'" rel="shadowbox[carousel_'.$item_id.'];height='.$img_actual_height.';width='.$img_actual_width.';" >'; 
			}?>
			<?php if($node->overlay == '1' && $overlay != ''){ ?>
				<div class="overlay"><?php print $overlay; ?></div>
			<?php } ?>
			<img title="<?=$photo_title?>" alt="<?=$photo_url_xl?>" src="<?=$photo_url_l?>"/>
		<?php if($node->shadowbox == '1'){ print '</a>'; }?>
	</li>
	<?php 
}