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
		// console.log(testTree.prettyPrint());
	});

	it('exists', function() {
		expect(testTree).to.be.ok;
		expect(testTree).to.be.defined;
	});

	it('walks', function() {
		var walk = testTree.walk();
		expect(testTree).to.be.defined;
		expect(testTree.walk).to.be.a.function;
		// console.log(walk);
		expect(walk).to.deep.equal([ 1, 2, 6, 7, 8, 13, 16, 18, 20, 25 ]);
	});

	it('pre order walks', function() {
		var walk = testTree.preOrderWalk();
		expect(testTree).to.be.defined;
		expect(testTree.preOrderWalk).to.be.a.function;
		// console.log(walk);
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

	it('depth first searches', function() {
		var result = testTree.depthFirstSearch(16);
		expect(result).to.be.ok;
		expect(result.value).to.equal(16);
	}); /* How do I verify that it is using depth first searching compared to something else */

	it('breadth first searches', function() {
		var result = testTree.breadthFirstSearch(13);
		expect(result).to.be.ok;
		expect(result.value).to.equal(13);
	});

	it('min value', function() {
		var min = testTree.min();
		expect(min).to.be.ok;
		expect(min).to.equal(1);
	}); /* add a lower value and re-run */

	it('max value', function() {
		var max = testTree.max();
		expect(max).to.be.ok;
		expect(max).to.equal(25);
	}); /* add a higher value and re-run */

	it('check height', function() {
		var height = testTree.getHeight();
		expect(height).to.be.ok;
		expect(height).to.equal(6);
	});

	it('check balanced - unbalanced', function() {
		var checkBalanced = testTree.checkBalanced();
		expect(checkBalanced).to.be.false;
	}); /* have balanced test */

	it('check balanced - balanced', function() {
		var balancedTree = new BinarySearchTree();
		balancedTree.push(7);
		balancedTree.push(8);
		balancedTree.push(2);
		balancedTree.push(6);
		balancedTree.push(1);
		var checkBalanced = balancedTree.checkBalanced();
	});

	it('lowest common ancestor', function() {
		var lca = testTree.lowestCommonAncestor(13, 20);
		console.log(lca);
	});

	it('check validate', function() {
		var isValid = testTree.checkBSTTraversalMethod();
		expect(isValid).to.be.ok;
		expect(isValid).to.be.true;
	});

	it('stress', function() {
		var stressedTree = new BinarySearchTree();
		var timeStart = process.hrtime();
		for (var i = 0; i < 100000; i++) {
			// if (i === 5000) {
			// 	stressedTree.push(156789);
			// }
			// else {
				stressedTree.push(randomInt());
			// }
		}
		logTimeTook(timeStart);
		var timeSearchStart = process.hrtime();
		var searchResult = stressedTree.breadthFirstSearch(156789);
		console.log("search result for 156788: " , searchResult);
		logTimeTook(timeSearchStart);
		var timeSearchStartDepth = process.hrtime();
		var searchResultDepth = stressedTree.depthFirstSearch(156789);
		console.log("search result (depth) for 156788: " , searchResultDepth);
		logTimeTook(timeSearchStartDepth);
	});

	after(function () {
		var memoryUsage = process.memoryUsage();
		var convertedrss = convertMemUsage(memoryUsage.rss);
		var convertedHeapTotal = convertMemUsage(memoryUsage.heapTotal);
		var convertedHeapUsed = convertMemUsage(memoryUsage.heapUsed);
		console.log("resident set size: " + convertedrss.kb + "kb, " + convertedrss.mb + "mb.");
		console.log("heap total: " + convertedHeapTotal.kb + "kb, " + convertedHeapTotal.mb + "mb.");
		console.log("heap used: " + convertedHeapUsed.kb + "kb, " + convertedHeapUsed.mb + "mb.");
	});
});

function convertMemUsage(value) {
	var bytesToKiloByte = 1024;
	var bytesToMegaByte = 1048576;
	return { 'kb': value / bytesToKiloByte, 'mb': value / bytesToMegaByte };
}

function randomInt () {
	var low = 0;
	var high = 2000000;
    return Math.floor(Math.random() * (high - low) + low);
}

function logTimeTook(timeStart) {
	var timeDiff = process.hrtime(timeStart);
	var responseTime = (timeDiff[0] / 1e3) + (timeDiff[1] / 1e6);
	console.log("duration: " + responseTime + "ms.");
}
/*
console.log("");
console.log("Tree -------------------");
console.log(util.inspect(testTree, { 'depth': null }));
console.log("end Tree -------------------");

console.log("");
console.log("LCA: ", testTree.lowestCommonAncestor(testTree.root, 16, 18));

*/