<?php
require './wp-load.php';
global $wpdb;
$sql = $wpdb -> prepare( "SELECT domain, path FROM $wpdb->blogs WHERE archived='0' AND deleted ='0' LIMIT 0,300" );

$blogs = $wpdb -> get_results( $sql );

foreach ( $blogs as $blog ) {
	$url = $protocol_to_use . $blog -> domain . ( $blog -> path ? $blog -> path : '/' ) . 'wp-cron.php';
	wp_remote_get( $url );
}

die();
