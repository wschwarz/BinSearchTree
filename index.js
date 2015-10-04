'use strict';
var util = require('util');

function Node (val) {

	this.value = val;
	this.left = null;
	this.right = null;

	this.getKey = function() {
		if (this.value instanceof Object) {
			return this.value.key;
		}
		return this.value;
	}

}


function BinarySearchTree () {
	this.root = null;
}

// Insert a new node
BinarySearchTree.prototype.push = function (val) {
	var root = this.root;

	// empty tree
	if (!root) {
		this.root = new Node(val);
		return;
	}

	var currentNode = root;
	var newNode = new Node(val);

	while (currentNode) {

		if (val <= currentNode.getKey()) {
			if (!currentNode.left) {
				 currentNode.left = newNode;
				 break;
			}
			else {
				currentNode = currentNode.left;
			}
		}
		else {
			if (!currentNode.right) {
				currentNode.right = newNode;
				break;
			}
			else {
				currentNode = currentNode.right;
			}
		}

	}
}

BinarySearchTree.prototype.prettyPrint = function(node) {
	if (!node) { node = this.root; }

	var spacer = " ";
	var sideAdjustment = this.getHeight(this.root) * 4;
	for (var i = 0; i < (sideAdjustment); i++) {
		spacer = spacer + " ";
	}

	var queue = new Array();
	queue.push({ 'adjustment': sideAdjustment, 'node': node, 'level': 1, 'type': 'root' });

	// console.log();

	//TODO: Figure out how to write the newlines and spacing

	var curNode;
	var currentLevel = 1;
	var currentOutput = spacer + node.value;
	while (queue.length > 0) {
		curNode = queue.shift();
		if (curNode.node.left) { queue.push({ 'adjustment': -(curNode.level * 4), 'node': curNode.node.left, 'level': curNode.level++, 'type': 'left' }); }
		if (curNode.node.right) { queue.push({ 'adjustment': (curNode.level * 4), 'node': curNode.node.right, 'level': curNode.level++, 'type': 'right' }); }

		if (curNode.level > currentLevel) {
			currentLevel += 1;
			console.log(currentOutput);
			currentOutput = '';
		} else {
			spacer = " ";
			var amount = sideAdjustment;
			if (curNode.type == 'left') { amount += curNode.adjustment; }
			if (curNode.type == 'right') { amount = 8; }
			for (var i = 0; i < amount; i++) {
				spacer = spacer + " ";
			}
			currentOutput += spacer + curNode.node.value;
		}
	}
}


BinarySearchTree.prototype.walk = function (node, output) {
	if (!node && !output) {
		node = this.root;
		output = new Array();
	}
	if (!output) { output = new Array(); }
	if (!node) { return output; }

	if (node.left) { output = this.walk(node.left, output); }
	output.push(node.value);
	if (node.right) { output = this.walk(node.right, output); }

	return output;
}

BinarySearchTree.prototype.preOrderWalk = function (node, output) {
	if (!node && !output) {
		node = this.root;
		output = new Array();
	}
	if (!output) { output = new Array(); }
	if (!node) { return; }

	output.push(node.value);
	if (node.left) { output = this.preOrderWalk(node.left, output); }
	if (node.right) { output = this.preOrderWalk(node.right, output); }

	return output;
}

BinarySearchTree.prototype.postOrderWalk = function (node, output) {
	if (!node && !output) {
		node = this.root;
		output = new Array();
	}
	if (!output) { output = new Array(); }
	if (!node) { return; }

	if (node.left) { output = this.postOrderWalk(node.left, output); }
	if (node.right) { output = this.postOrderWalk(node.right, output); }
	output.push(node.value);

	return output;
}

BinarySearchTree.prototype.min = function (node) {
	if (!node) { return false; }
	if (node.left) { return this.min(node.left); }
	return node.value;
}

BinarySearchTree.prototype.max = function (node) {
	if (!node) { return false; }
	if (node.right) { return this.max(node.right); }
	return node.value;

}

BinarySearchTree.prototype.getHeight = function(node) {
	if (!node) { return 0; }

	var leftHeight = this.getHeight(node.left);
	var rightHeight = this.getHeight(node.right);

	return Math.max(leftHeight, rightHeight) + 1;
}

BinarySearchTree.prototype.checkBalanced = function(node) {
	if (!node) { return false; }

	var heightDiff = Math.abs(this.getHeight(node.left) - this.getHeight(node.right));
	var leftBalanced = (node.left == null || this.checkBalanced(node.left));
	var rightBalanced = (node.right == null || this.checkBalanced(node.right));
	if ( heightDiff <= 1 && leftBalanced && rightBalanced) {
		return true;
	} else {
		return false;
	}
}

/* The idea here is to walk while checking if left less than node less than right */
BinarySearchTree.prototype.checkBSTTraversalMethod = function(node) {
	var prev = null;
	if (node) {
		if (!this.checkBSTTraversalMethod(node.left)) {
			return false;
		}

		if (prev != null && node.getKey() <= prev.getKey()) {
			return false;
		}

		prev = node;

		return this.checkBSTTraversalMethod(node.right);
	}

	return true; //Empty is BST (Also applies to leaf nodes)
}

BinarySearchTree.prototype.lowestCommonAncestor = function(node, val1, val2) {
	if (!node) { return false; }

	if (node.getKey() > val1 && node.getKey() > val2) {
		if (node.left) { return this.lowestCommonAncestor(node.left, val1, val2); }
	}

	if (node.getKey() < val1 && node.getKey() < val2) {
		if (node.right) { return this.lowestCommonAncestor(node.right, val1, val2); }
	}

	return node;
}

BinarySearchTree.prototype.depthFirstSearch = function (node, needle) {

	console.log(" cur node value: " + (node != null ? node.value : "null"));
	if (!node) { return false; }

	if (node.getKey() == needle) {
		return node;
	}

	var left = this.depthFirstSearch(node.left, needle);
	if (left.getKey() == needle) {
		return left;
	}
	var right = this.depthFirstSearch(node.right, needle);
	if (right.getKey() == needle) {
		return right;
	}

	return false;
}

BinarySearchTree.prototype.breadthFirstSearch = function (node, needle) {
	if (!node) { return false; }

	var queue = new Array();
	queue.push(node);
	var curNode;
	while (queue.length > 0) {
		curNode = queue.shift();
		console.log(curNode.value);
		if (curNode.getKey() == needle) { break; }
		else {
			if (curNode.left) { queue.push(curNode.left); }
			if (curNode.right) { queue.push(curNode.right); }
		}
	}
	return curNode;
}

module.exports = BinarySearchTree;


