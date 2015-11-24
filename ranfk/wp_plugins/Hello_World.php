<?php
/*
Plugin Name: Hello_World
Description:This is a small plugin for WordPress.It shows "HelloWorld!" in the center,at the top of every page you view.
Author:ranfk
*/

function Hello_text()
{
	$text="Hello World!";
	echo "<p id='test'>$text</p>";
}

add_filter('admin_notices','Hello_text');

function Hello_css()
{
	echo "
	<style type='text/css'>
	#test{
		text-align: center;
		padding-top: 10px;
		margin: 0;
		font-size: 20px;}
	</style>
	";
}
add_filter('admin_head','Hello_css');

?>
