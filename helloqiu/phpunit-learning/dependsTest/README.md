#PHPUnit test for depends  
The depends are insteresting:).  
##helloqiu-depends-failure-test
I find it's not the failure dependency is skipped.From the verbose information I know testFirst is passed and testSecond is skipped.  
Here is the verbose information from PHPUnit:
```shell
PHPUnit 4.8.6 by Sebastian Bergmann and contributors.

Runtime:	PHP 5.6.12

FS

Time: 107 ms, Memory: 11.50Mb

There was 1 failure:

1) Depends_Failure_Test::testFirst
Failed asserting that false is true.

/Users/helloqiu/birchpress/playground/helloqiu/phpunit-learning/dependsTest/helloqiu-depends-failure-test.php:4

--

There was 1 skipped test:

1) Depends_Failure_Test::testSecond
This test depends on "Depends_Failure_Test::testFirst" to pass.

FAILURES!
Tests: 1, Assertions: 1, Failures: 1, Skipped: 1.
```
