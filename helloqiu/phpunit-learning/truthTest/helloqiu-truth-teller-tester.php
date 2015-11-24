<?php
require_once 'helloqiu-truth-teller.php';
class Helloqiu_Truth_Teller_Tester extends PHPUnit_Framework_TestCase{
	function testTruthTeller() {
		$tt = new Helloqiu_Truth_Teller();
		$this -> assertTrue( $tt -> tell_truth() );
	}
}
