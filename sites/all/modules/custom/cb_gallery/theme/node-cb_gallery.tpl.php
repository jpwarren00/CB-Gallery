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
dsm($cb_gallery);
?>

<div class="cb_gallery_node <?php print $cb_gallery['gallery_info']['unique_css_block_class']; ?>">
<?php print $cb_gallery['viewport']; ?>
<?php print $cb_gallery['thumbport']; ?>
</div> <!-- end cb_gallery_node -->