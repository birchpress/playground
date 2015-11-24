<?php
class DependencdyAndProviderTest extends PHPUnit_Framework_TestCase{
	public function provider() {
		return array( array( 'provider1' ) , array( 'provider2' ) );
	}

	public function testFirst() {
		$this -> assertTrue( true );
		return 'first';
	}

	public function testSecond() {
		$this -> assertTrue( true );
		return 'second';
	}

	/**
	 *
	 *
	 * @depends testFirst
	 * @depends testSecond
	 * @dataProvider provider
	 */
	public function testConsumer() {
		$this->assertEquals( array( 'provider1', 'first' , 'second' ) , func_get_args() );
	}
}
?>
