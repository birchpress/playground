<?php
class OutputTest extends PHPUnit_FrameWork_TestCase{
	public function testOutput1() {
		$this -> expectOutputString( 'hello' );
		print( 'hello' );
	}
	public function testOutput2() {
		$this -> expectOutputString( 'bye' );
		print( 'bbb' );
	}
}
?>
