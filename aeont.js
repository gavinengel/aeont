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
	
  //console.log(jsonString);
  //var padded = raw.replace('{', ' { ').replace('}', ' } ')

  //console.log(raw);
  //for (var i = 0; i <= raw.length; i++ ) {
  //	console.log(raw.charAt(i))
  //}

	var object = JSON.parse(jsonString)
	var util = require('util')

	console.log(util.inspect(object, {depth: null}))

});