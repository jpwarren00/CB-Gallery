<?php
/**
 * Gallery Name Update 
 * This PHP file is used to update a gallery name in the database.
 * This pages is called by clientside javascript.
 */

$sql    = "UPDATE {cb_gallery_parent} SET name='%s' WHERE gallery_id = '%d';";
$args   = array($_POST['gallery_name'], $_POST['gallery_id']);

print ($result = db_query($sql,$args) ? true : false );
