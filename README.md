# node-phpfpm
node.js run php scripts via phpfpm

[![NPM](https://nodei.co/npm/node-phpfpm.png?downloads=true&stars=true)](https://www.npmjs.com/package/node-phpfpm)

```
npm install node-phpfpm
```

## Usage

```js
var PHPFPM = require('node-phpfpm');

var phpfpm = new PHPFPM(
{
	host: '127.0.0.1',
	port: 9000,
	documentRoot: __dirname
});

phpfpm.run('test.php', function(err, output, phpErrors)
{
	if (err == 99) console.error('PHPFPM server error');
	console.log(output);
	if (phpErrors) console.error(phpErrors);
});
```

## Configuration

```js
var phpfpm = new PHPFPM(configObject);
```

configObject may have the following keys:


* `documentRoot` optional [string] the document root folder of PHP scripts. must ends with /
* `host` optional [string] the ip or host name of php-fpm server (default: 127.0.0.1)
* `port` optional [int] the port of php-fpm server ( default: 9000 )
* `sockFile` optional [string] use the unix sock file instead of 127.0.0.1:9000 to connect php-fpm server 


## APIs

### run(options, callback)

available keys in options object


* `uri` [string] path to your phpfile
* `url` <optinal> [string] alias of uri
* `method` optional [string] GET or POST (default: GET)
* `form` optional [object] form_data that will be send with content-type: application/x-www-form-urlencoded 
* `json` optional [object] json data that will be send with content-type: application/json 
* `body` optional [string] raw post body data
* `contentType` optional [string] the content-type header
* `contentLength` optional [string] the content-length header


if you send a string as `options`, it will be converted to:

```js
{ uri: "the string value", method: 'GET' }
```

callback

```js
function(err, output, phpErrors)
{
	// if err === 99, means php-fpm error 
	// it may be lost php-fpm connection or too many connections
	// otherwise it will always equal to false
	
	// output is the stdout of php scripts
	
	// phpErrors is the php errors detail string
	// php will output some errors, but that does not mean the request fails
	// if you turn on display_errors in your php.ini, the phpErrors content will also be found in the output string
	
	console.log(err, output, phpErrors); 
}
```

## Demo

Simple php request with no parameters
```js
phpfpm.run('test1.php', function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```

Send data via GET method
```js
phpfpm.run('test.php?a=b&c=d&e[0]=1&e[1]=2', function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```
```php
<?php
print_r($_GET);
// Array
// (
//     [a] => b
//     [c] => d
//     [e] => Array
//         (
//             [0] => 1
//             [1] => 2
//         )
// )
?>
```

Send form data via POST method
```js
phpfpm.run(
{
	uri: 'test.php',
	form: 
	{
		a:'a',
		b:'b'
	}
}, function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```
```php
<?php
print_r($_POST);
// Array
// (
//     [a] => a
//     [b] => b
// )
?>
```

Send json data with POST method
```js
phpfpm.run(
{
	uri: 'test.php',
	json: 
	{
		a:'a',
		b:'b'
	}
}, function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```
```php
<?php
echo file_get_contents('php://input');
// {"a":"a","b":"b"}
?>
```

Send form data with GET method
```js
phpfpm.run(
{
	uri: 'test2.php',
	method: 'GET',
	form: 
	{
		a:'a',
		b:'b'
	}
}, function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```
```php
<?php
print_r($_GET);
// Array
// (
//     [a] => a
//     [b] => b
// )
?>
```

Send form data and query string with GET method
```js
phpfpm.run(
{
	uri: 'test2.php?c=cc',
	method: 'GET',
	form: 
	{
		a:'a',
		b:'b'
	}
}, function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```
```php
<?php
print_r($_GET);
// Array
// (
//     [c] => cc
//     [a] => a
//     [b] => b
// )
?>
```

Send raw body data with POST method
```js
phpfpm.run(
{
	uri: 'test5.php',
	body: 'abc123'
}, function(err, output, phpErrors)
{
	console.log(err, output, phpErrors);
});
```
```php
<?php
echo file_get_contents('php://input');
// abc123
?>
```

## License
MIT

## Thanks

This project is based on the great work of `node-fastcgi-client` written by LastLeaf. [LastLeaf/node-fastcgi-client](https://github.com/LastLeaf/node-fastcgi-client)

## Links

[How to execute PHP scripts with Node.JS](http://jszen.com/how-to-execute-php-scripts-with-nodejs.8.html)
