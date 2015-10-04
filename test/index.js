'use strict';

var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should();
var _ = require('lodash');
var util = require('util');

var BinarySearchTree = require('./../index');

describe('Testing Setup', function() {
	it('true is true', function() {
		expect(true).to.be.true;
	});
});


describe('Binary Search Tree', function() {

	var testTree;

	before(function() {
		testTree = new BinarySearchTree();
		testTree.push(7);
		testTree.push(8);
		testTree.push(20);
		testTree.push(2);
		testTree.push(6);
		testTree.push(1);
		testTree.push(13);
		testTree.push(16);
		testTree.push(25);
		testTree.push(18);
		// console.log(util.inspect(testTree, { 'depth': null }));
		console.log(testTree.prettyPrint());
	});

	it('exists', function() {
		expect(testTree).to.be.ok;
		expect(testTree).to.be.defined;
	});

	it('walks', function() {
		var walk = testTree.walk();
		expect(testTree).to.be.defined;
		expect(testTree.walk).to.be.a.function;
		console.log(walk);
		expect(walk).to.deep.equal([ 1, 2, 6, 7, 8, 13, 16, 18, 20, 25 ]);
	});

	it('pre order walks', function() {
		var walk = testTree.preOrderWalk();
		expect(testTree).to.be.defined;
		expect(testTree.preOrderWalk).to.be.a.function;
		console.log(walk);
		expect(walk).to.deep.equal([ 7, 2, 1, 6, 8, 20, 13, 16, 18, 25 ]);
	})

	it('works with objects', function() {
		var objTree = new BinarySearchTree();
		objTree.push({ 'key': 7, 'value': ['hi'] });
		objTree.push({ 'key': 8, 'value': ['world'] });
		objTree.push({ 'key': 20, 'value': ['goodbye'] });
		var objTreeInOrder = objTree.walk();
		var message = (_.map(objTreeInOrder, function(node) {
			return node.value[0];
		})).join(' ');
		expect(message).to.equal("hi world goodbye");
	});

});


/*
console.log("");
console.log("Tree -------------------");
console.log(util.inspect(testTree, { 'depth': null }));
console.log("end Tree -------------------");

console.log("");
console.log("walking -------------------");
testTree.walk(testTree.root);
console.log("end walking -------------------");

console.log("");
console.log("pre order -------------------");
testTree.preOrderWalk(testTree.root);
console.log("end pre order -------------------");

console.log("");
console.log("post order -------------------");
testTree.postOrderWalk(testTree.root);
console.log("end post order -------------------");

console.log("");
console.log("depth first search -------------");
console.log(" RESULT *** ", testTree.depthFirstSearch(testTree.root, 16));
console.log("end depth first search -------------");

console.log("");
console.log("breadth first search --------------");
console.log(" RESULT *** ", testTree.breadthFirstSearch(testTree.root, 13));
console.log("end breadth first search --------------");

console.log("")
console.log("min: ", testTree.min(testTree.root));

console.log("");
console.log("max: ", testTree.max(testTree.root));

console.log("");
console.log("height: ", testTree.getHeight(testTree.root));

console.log("");
console.log("balanced: ", testTree.checkBalanced(testTree.root));

console.log("");
console.log("LCA: ", testTree.lowestCommonAncestor(testTree.root, 16, 18));

console.log("");
console.log("Check BST: ", testTree.checkBSTTraversalMethod(testTree.root));
*/