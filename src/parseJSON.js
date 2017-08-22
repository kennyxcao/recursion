// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  // initial index and char
  var index = 0;
  var char = json.charAt(index);

  // next() - get next char in json input string
  // also checks whether current char matches the input character
  var next = function(match) {
    if (match && match !== char)
      throw new SyntaxError('Expected: ' + match + ' Actual: ' + char);    
    index += 1;
    char = json.charAt(index);
    return char;
  };


  // whitespace() - skip whitespace chars until actual char is found
  var whitespace = function() {
    while(char && char <= ' ')
      next();
  };

  // parseString() - parse a string value
  var parseString = function() {
    var str = '';
    var escapeChars = {
      '"'   : '"',
      '\\'  : '\\',
      b     : '\b',
      f     : '\f',
      n     : '\n',
      r     : '\r',
      t     : '\t'
    };

    if(char === '"'){
      while(next()) {
        if (char === '"') {
          next();
          return str;
        } else if (char === '\\') {
          next();
          if (char in escapeChars)
            str += escapeChars[char];
          else
            break;
        } else {
          str += char;
        }
      }
    }

    throw new SyntaxError('String cannot be parsed')

  };

  // parseNumber() - parse numerical value
  var parseNumber = function() {
    var str = '';
    var num;

    if (char === '-') {
      str += '-';
      next();
    }

    while (char >= '0' && char <= '9') {
      str += char;
      next();
    }

    if (char === '.') {
      str += char;
      while(next() && char >= '0' && char <= '9')
        str += char;
    }

    num = Number(str);

    if (isNaN(num))
      throw new SyntaxError('Number cannot be parsed');

    return num;
  };


  // parseArray() - parse array object
  var parseArray = function() {
    var arr = [];

    if (char === '[') {
      next();
      whitespace();

      if (char === ']') {
        next();
        return arr;
      }

      while(char) {
        arr.push(parseSymbol());
        whitespace();
        if (char === ']') {
          next();
          return arr;        
        }
        next(',');
      }
    }

    throw new SyntaxError('Array cannot be parsed');
  };

  // parseObject() - parse object symbol
  var parseObject = function() {
    var obj = {}

    if (char === '{') {
      next();
      whitespace();

      if (char === '}') {
        next();
        return obj;
      }

      while (char) {
        var key  = parseString();
        whitespace();
        next(':');
        var value = parseSymbol();
        obj[key] = value;
        whitespace();
        if (char === '}') {
          next();
          return obj;
        }
        next(',');
        whitespace();
      }      
    }

    throw new SyntaxError('Object cannot be parsed');
  };

  // parseBooleanNull - parse boolean and null objects
  var parseBooleanNull = function() {
    if (char === 't') {
      next('t');
      next('r');
      next('u');
      next('e');
      return true;
    }

    if (char === 'f') {
      next('f');
      next('a');
      next('l');
      next('s');
      next('e');      
      return false;
    }

    if (char === 'n') {
      next('n');
      next('u');
      next('l');
      next('l');
      return null;
    }
  }

  // parseSymbol - starting parser selector, calls sub-parser functions accordingly
  var parseSymbol = function() {
    whitespace();
    if (char === '"')
      return parseString();
    
    if (char === '-' || char >= '0' &&  char <= '9')
      return parseNumber();
    
    if (char === '[')
      return parseArray();
    
    if (char === '{')
      return parseObject();

    return parseBooleanNull();
  }

  return parseSymbol(); 
};
