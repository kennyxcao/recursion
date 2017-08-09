// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // Case: String
  if (typeof(obj) === 'string')
    return '"' + obj + '"';

  // Case: Array
  if (Array.isArray(obj)) {
    arrStr = obj.map(function(ele) {
      return stringifyJSON(ele);
    })
    return '[' + arrStr.join() + ']';
  }

  // Case: Object
  if (obj && typeof(obj) === 'object') {
    var objStr = [];
    for (var key in obj) {
      if (obj[key] === undefined || typeof(obj[key]) === 'function')
        continue;
      objStr.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
    }
    return '{' + objStr.join() + '}';
  }

  // Case: Number, Null, Boolean
  return '' + obj;
};
