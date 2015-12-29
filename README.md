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

phpfpm.run('test.php', function(err, output, errors)
{
	if (!err) console.log(output);
	if (errors) console.error(errors);
});
```



## APIs

### run(options, callback)

available keys in options object

```
{
	uri: [string] 'path_to_your_php_file.php',
	url: <optinal> [string] alias of uri,
	method: <optional> [string] 'GET or POST' (default: GET),
	form: <optional> [object] { form_data that will be send with content-type: application/x-www-form-urlencoded },
	json: <optional> [object] { json data that will be send with content-type: application/json },
	body: <optional> [string] " raw post body data ",
	contentType: <optional> [string] " the content-type header ",
	contentLength: <optional> [string] " the content-length header"
}
```

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

## License
MIT
