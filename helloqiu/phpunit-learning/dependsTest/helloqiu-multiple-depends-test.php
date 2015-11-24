<?php
class Muildtiple_Dependencies_Test extends PHPUnit_Framework_TestCase{
	public function testGiveFirst() {
		$this->assertTrue( true );
		return 'first test';
	}
	public function testGiveSecond() {
		$this->assertTrue( true );
		return 'second test';
	}

	/**
	 *
	 *
	 * @depends testGiveFirst
	 * @depends testGiveSecond
	 */
	public function testConsumer() {
		$this->assertEquals(
			array( 'first test' , 'second test' ),
		func_get_args() );
	}
}
?>
