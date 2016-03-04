// quick and dirty

// add "" around keys

// add "" around values?

fs = require('fs')
fs.readFile('./example/calculator.aeon', 'utf8', function (err, raw) {
  if (err) {
    return console.log(err);
  }

  var tokens = raw.match(/\S+/g)
  var op1 = ''
  var jsonString = ''
  for (var i = 0; i < tokens.length; i++ ) {
  	var token = tokens[i]

  	// wrap in quotes?
  	if (token == '{') {
  		token = ":" + token
  	}
  	else if	(token == '}') {

  		token = token + ','
  	}
  	else if	(token == ';') {

  		token = ","
  	}
  	else if	(token == '&') {

  		//token = ","
  	}
  	else if	(token == ':') {

  		//token = ","
  	}
  	else if	(token.length == 2 && token.charAt(1) == ':') {

  		var op1 = token.charAt(0)
  		token = ': [ "~' + op1 + '~", '
  	}
  	else {
  		token = '"' + token + '"'
  		if (op1.length) {
  			token = token + ']'
  			op1 = ''
  		}
  	}



  	jsonString = jsonString + token
  }

  // cheats: 
  jsonString = "{"+jsonString+"}" 
  jsonString = jsonString.replace(/"&"/g, ' & ')
  jsonString = jsonString.replace(/"~&~"/g, '"&"')
  jsonString = jsonString.replace(/:""/g, '":"')
  jsonString = jsonString.replace(/,}/g, '}')
  jsonString = jsonString.replace(/"''"/g, '""')


	var newObj = JSON.parse(jsonString)

	var outputFilename = '/tmp/my.json';

	fs.writeFile(outputFilename, JSON.stringify(newObj, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
			fs.readFile(outputFilename, 'utf8', function (err, newRaw) {
			  if (err) {
			    return console.log(err);
			  }

			  console.log(newRaw)

			});
	    }
	}); 


});