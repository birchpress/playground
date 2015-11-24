<?php
class StackTest extends PHPUnit_Framework_TestCase{
	protected $stack;
	protected function setUp() {
		$this -> stack = array();
	}
	public function testEmptyStack() {
		$this -> assertEmpty( $this -> stack );
	}
	public function testStackPush() {
		array_push( $this -> stack, 'hello' );
		$this -> assertEquals( 'hello', $this -> stack[count( $this -> stack ) - 1] );
		$this -> assertFalse( empty( $this -> stack ), 'message' );
	}
	public function testStackPop() {
		array_push( $this -> stack, 'hello' );
		$this -> assertEquals( 'hello', array_pop( $this -> stack ) );
		$this -> assertEmpty( $this -> stack );
	}
}
?>
