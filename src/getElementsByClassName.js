// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var elements = [];

  var recusiveNodeSearch = function(node) {
    if (node.classList && node.classList.contains(className))
      elements.push(node);
    
    Array.from(node.childNodes).forEach(recusiveNodeSearch);
  };

  recusiveNodeSearch(document.body);
  
  return elements;
};
