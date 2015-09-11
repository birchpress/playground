<?php
require_once 'dosomething.php';
class StubTestSomething extends PHPUnit_Framework_TestCase{
	public function testStub() {
		$stub = $this->getMockBuilder( 'SomeClass' ) -> getMock();
		$stub->method( 'do_something' )->willReturn( 'hello' );
		$this->assertEquals( 'hello', $stub->do_something() );
	}
}
?>
