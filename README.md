# Binary Search Tree
### Version 1.0.0

Supports simple values (used as keys) or objects that have a 'key' property that is used for sorting and searching.

example: { 'key': 1, 'otherfield': ['hi'], 'nextfield': 'Bob' }

## To Run:

npm test

## To Use:

	var BinarySearchTree = require('./../index');
	BinarySearchTree.push(16);
	BinarySearchTree.depthFirstSearch(16);
	etc.

## Todo:

1) Test speed (depth vs breadth)
2) Generic Search Function
3) Test memory usage
