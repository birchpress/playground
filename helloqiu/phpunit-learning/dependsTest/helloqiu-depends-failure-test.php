<?php
class Depends_Failure_Test extends PHPUnit_Framework_TestCase{
	public function testFirst() {
		$this->assertTrue( false );
	}

	/**
	 *
	 *
	 * @depends testFirst
	 */
	public function testSecond() {

	}
}
?>
