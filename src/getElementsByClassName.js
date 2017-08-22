// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
// var getElementsByClassName = function(className) {
//   var elements = [];

//   var recusiveNodeSearch = function(node) {
//     if (node.classList && node.classList.contains(className))
//       elements.push(node);
    
//     Array.from(node.childNodes).forEach(recusiveNodeSearch);
//   };

//   recusiveNodeSearch(document.body);
  
//   return elements;
// };


// Noninner recursion solution
var getElementsByClassName = function(className, node) {
  var nodes = [];
  node = node || document.body;

  // compare node's classname with className
  var parts = node.className.split(' ');
  if (parts.indexOf(className) >= 0) {
    // if matched, save node
    nodes.push(node);
  }

  // iterate over children
  for (var i = 0; i < node.children.length; i++) {
    // for each child, invoke getElementsByClassName
    var childResults = getElementsByClassName(className, node.children[i]);
    nodes = nodes.concat(childResults);
  }

  return nodes;
};