var PHP = require('../');
var php = new PHP({documentRoot:__dirname+'/' });

var chai = require('chai');
var expect = chai.expect;

describe('node-phpfpm', function()
{
	it('test1.php should ouput ok', function(done)
	{
		php.run('test1.php', function(err, output)
		{
			expect(err).to.equal(false);
			expect(output).to.equal('ok');
			done();
		});
	});

	it('test2.php?a=b&c=d&e[0]=1&e[1]=2 should output a json string ', function(done)
	{
		php.run('test2.php?a=b&c=d&e[0]=1&e[1]=2', function(err, output)
		{
			expect(err).to.equal(false);
			expect(output).to.equal('{"a":"b","c":"d","e":["1","2"]}');
			done();
		});
	});

	it('test3.php: test form data with POST method', function(done)
	{
		php.run(
		{
			uri: 'test3.php',
			form: 
			{
				a:'a',
				b:'b'
			}
		}, function(err, output)
		{
			expect(err).to.equal(false);
			expect(output).to.equal('{"a":"a","b":"b"}');
			done();
		});
	});

	

	it('test4.php: test json data with POST method', function(done)
	{
		php.run(
		{
			uri: 'test4.php',
			json: 
			{
				a:'a',
				b:'b'
			}
		}, function(err, output)
		{
			expect(err).to.equal(false);
			expect(output.replace(/\n|\s/g,'')).to.equal('Array([a]=>a[b]=>b)');
			done();
		});
	});

	it('test2.php: test form data with GET method', function(done)
	{
		php.run(
		{
			uri: 'test2.php',
			method: 'GET',
			form: 
			{
				a:'a',
				b:'b'
			}
		}, function(err, output)
		{
			expect(err).to.equal(false);
			expect(output).to.equal('{"a":"a","b":"b"}');
			done();
		});
	});

	it('test2.php: test form data and query string with GET method', function(done)
	{
		php.run(
		{
			uri: 'test2.php?c=cc',
			method: 'GET',
			form: 
			{
				a:'a',
				b:'b'
			}
		}, function(err, output)
		{
			expect(err).to.equal(false);
			expect(output).to.equal('{"c":"cc","a":"a","b":"b"}');
			done();
		});
	});

	it('test5.php: send raw body data with POST method', function(done)
	{
		php.run(
		{
			uri: 'test5.php',
			body: 'abc123'
		}, function(err, output)
		{
			expect(err).to.equal(false);
			expect(output).to.equal('abc123');
			done();
		});
	});


	it('test_error.php: should output error information', function(done)
	{
		php.run('test_error.php', function(err, output, errors)
		{
			expect(err).to.equal(false);
			expect(errors).to.be.a('string');
			expect(!!errors.match(/zero/i)).to.equal(true);
			expect(output).to.equal('ok');
			done();
		});
	});

});
