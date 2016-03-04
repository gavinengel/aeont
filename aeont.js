// quick and dirty aeon parser
var inputName = process.argv[2]

fs = require('fs')
fs.readFile(inputName, 'utf8', function (err, raw) {
  if (err) {
    return console.log(err);
  }

  // version 0.0.1
  // accept: aeon string ...
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
  		token = ': [ "~QUOTE~' + op1 + '~QUOTE~", '
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
  jsonString = jsonString.replace(/~QUOTE~/g, '"')
  jsonString = jsonString.replace(/:""/g, '":"')
  jsonString = jsonString.replace(/,}/g, '}')
  jsonString = jsonString.replace(/"''"/g, '""')


	var newObj = JSON.parse(jsonString)
  // return : json obj

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