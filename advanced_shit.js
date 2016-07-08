'use strict';
var customers = require('./test/fixtures/customers.json');
// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * valueCount: Designed to return object containing total occurances 
 * of property values in a JSON object.
 * 
 * @param {Array or Object} collection The JSON object over which to iterate.
 * @param {String} property Key value to get value count from
 */
function valueCount(collection, property) {
    var output = {};
    each(collection, function(object, i) {
        if(output[object[property]] === undefined) {
            output[object[property]] = 1;
        } else {
            output[object[property]]++
        }
    })
    return output;
}
module.exports.valueCount = valueCount;
console.log(valueCount(customers, "tags"));
/**
 * most: Returns object with the greatest value of a numerical property
 * in a JSON formatted dataset
 * 
 * @param {Array or Object} collection The JSON object over which to iterate.
 * @param {String} property Numerical key string to evaluate value
 */
function most(collection, property) {
    var output = collection[0];
    each(collection, function(object, i) {
        if(object[property] > output[property]) {
            output = object;
        }
    })
    return output;
}
module.exports.most = most;

/**
 * least: Returns object with the smallest value of a numerical property
 * in a JSON formatted dataset
 * 
 * @param {Array or Object} collection The JSON object over which to iterate.
 * @param {String} property Numerical key string to evaluate value
 */
function least(collection, property) {
    var output = collection[0];
    each(collection, function(object, i) {
        if(object[property] < output[property]) {
            output = object;
        }
    })
    return output;
}
module.exports.least = least;

/**
 * average: Returns the average value of an array as a number
 * 
 * @param {Array} array The array to be iterated
 */
function average(array) {
    var total = 0;
    each(array, function(element, i) {
        total += element;
    })
    return (total / (array.length));
}
module.exports.average = average;

/**
 * allValues: Returns array of all values of a specific property in a
 * JSON formatted dataset
 * 
 * @param {Array or Object} collection The JSON object over which to iterate.
 * @param {String} property Key string to evaluate value
 */
function allValues(collection, property) {
    var output = [];
    each(collection, function(object, i) {
        output.push(object[property]);
    })
    return output;
}
module.exports.allValues = allValues;
console.log(allValues(customers,"name"));

/**
 * currenctToNum: Takes a currency formatted string and returns it as a 
 * floating point number fixed to two decimal places.
 * 
 * @param {String} currency Currency formatted string to be converted
 */
function currencyToNum(currency) {
    var number = Number(currency.replace(/[^0-9\.]+/g,""));
    return number;
}
module.exports.currencyToNum = currencyToNum;

/**
 * beginsWith: Takes a string and a letter and returns true if string
 * begins with said letter.
 * 
 * @param {String} string String to be checked
 * @param {String} letter Letter to check
 */
function beginsWith(string, letter) {
    if(string[0].toUpperCase === letter.toUpperCase) {
        return true;
    }
}
module.exports.beginsWith = beginsWith;

/**
 * returnObject: Takes a name and JSON object, searches for name property,
 * and returns object containing it.
 * 
 * @param {String} name Person's name to search
 * @param {Array or Object} collection JSON object to be searched
 */
function returnObject(name, collection) {
    each(collection, function(object, i) {
        if(object.name === name) {
            return object;
        }
    })
}
module.exports.returnObject = returnObject;

/**
 * getFriends: Searches a customer's friend list and returns an array of
 * those customer's objects
 * 
 * @param {Object} person Customer object to parse
 * @param {Array or Object} collection JSON object to be searched
 */
function getFriends(person, collection) {
    var output = [];
    var friends = person.friends;
    each(friends, function(object, i) {
        var name = object.name;
        output.push(returnObject(name, collection));
    })
    return output;
}
module.exports.getFriends = getFriends;