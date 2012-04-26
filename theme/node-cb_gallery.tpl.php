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

// dsm($cb_gallery);

?>

<?php if (user_access('administer nodes')) { ?>
   		<a class="carousel-edit" href="node/<?php print $node->nid; ?>/edit">Edit</a>
    <?php } ?>
<?php if (isset($cb_gallery['gallery_info'])) : ?>
<div class="cb_gallery_node <?php print $cb_gallery['gallery_info']['unique_css_block_class']; ?>">
<?php if (!empty($cb_gallery['gallery_info']['display_title'])):?>
<h6><?php print $cb_gallery['gallery_info']['display_title']; ?></h6>
<?php endif; ?>
<?php print $cb_gallery['viewport']; ?>
<?php print $cb_gallery['thumbport']; ?>
<?php endif; ?>
</div> <!-- end cb_gallery_node -->
