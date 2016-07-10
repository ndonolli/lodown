'use strict';
// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the
 * action Function to each value in the collection.
 * 
 *      example => each(["a","b","c"], function(e,i,a){ console.log(e)}); 
*               -> should log "a" "b" "c" to the console
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection.
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
 * identity: Returns an argument unchanged. Simple!
 * 
 *      example => identity(5) === 5
 * 
 * @param {Value} value Any value.
 * @return {Value} will return argument.
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: Returns data type as stringfor any value passed as an argument.  
 * Function catches datatype exceptions within javascript, don't fret.
 * 
 *      example => typeOf("foo") -> "string"
 * 
 * @param {Value} value Any value. Function will return datatype of value
 * as string.
 */
function typeOf(value) {
    if(Array.isArray(value)) return 'array';
    if(value === null) return 'null';
    if(value instanceof Date) return 'date';
    return typeof value;
}
module.exports.typeOf = typeOf;

/**
 * first: Takes an <array> and <number> n as arguments and returns the first n
 * elements in <array>.  If n is not specified, the first element of <array>
 * will be returned. If <array> is not an array, an empty array will be
 * returned.
 * 
 *      example => first(["a","b","c"], 2) -> ["a", "b"]
 * 
 * @param {Array} array Array to be passed as an argument
 * @param {Number} n Will return new array with index [0-n] if given.
 * @return {Array} New array with first n elements of <array> argument
 */
function first(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if (n === undefined) return array[0];
    if(n > 0) {
        n = n > array.length ? array.length : n;
        return array.slice(0, n);
    }
}
module.exports.first = first;

/**
 * last: Takes an <array> and <number> n as arguments and returns the last n
 * elements in <array>.  If n is not specified, the last element of <array>
 * will be returned. If <array> is not an array, an empty array will be
 * returned.
 * 
 *      example => last(["a","b","c"], 2) -> ["b","c"]
 * 
 * @param {Array} array Array to be passed as an argument
 * @param {Number} n Will return new array with index [n-array.length] if given.
 * @return {Array} New array with last n elements of <array> argument
 */
function last(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if (n === undefined) return array[array.length - 1];
    if(n > 0) {
        n = n > array.length ? array.length : n;
        return array.slice(array.length - n , n + 1);
    }
}
module.exports.last = last;

/**
 * indexOf: Takes an <array> and a <value> as arguments and returns  the index 
 * of <array> that is the first occurrance of <value>.  If <value> is not in
 * <array>, function will return -1.
 * 
 *      example => indexOf(["a","b","c"], "b") -> 1
 * 
 * @param {Array} array Array to be passed as an argument
 * @param {Value} value Function iterates through array and returns index 
 * of first occurance of <value>
 * @return {Number} Index of first <value> in <array>, returns -1 if not found.
 */
function indexOf(array, value) {
    if(!Array.isArray(array)) return -1;
    for(var i = 0; i < array.length; i++) {
        if(array[i] === value) {
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * filter: Takes an <array> and a <function> as arguments and returns a new
 * array of elements in <array> for which <function> returns true for elements
 * passed into the function.  The function must be an expression that evaluates
 * to a boolean value, and can contain up to three parameters: the array 
 * element, the index, and the array itself.  The function loops through the
 * array and thus will relatively maintain the order of the original array.
 * 
 *      example => filter([1,2,3,4,5], function(x){return x%2 === 0}) 
 *              -> [2,4]
 * 
 * @param {Array} array Array to be passed as an argument
 * @param {Function} action Function that evaluates to a boolean value. Only 
 * array elements that return true will be pushed to the new array.
 * @return {Array} New array of filtered values.
 */
function filter(array, test) {
    let output = [];
    each(array, function(e, i, a) {
        if(test(array[i], i, array)) {
            output.push(array[i]);
        }
    })
    return output;
}
module.exports.filter = filter;

/**
 * reject: Takes an <array> and a <function> as arguments and returns a new
 * array of elements in <array> for which <function> returns false for elements
 * passed into the function.  The function must be an expression that evaluates
 * to a boolean value, and can contain up to three parameters: the array 
 * element, the index, and the array itself.  The function loops through the
 * array and thus will relatively maintain the order of the original array. 
 * 
 *      example => reject([1,2,3,4,5], function(e){return e%2 === 0}) 
 *              -> [1,3,5]
 * 
 * @param {Array} array Array to be passed as an argument
 * @param {Function} action Function that evaluates to a boolean value. Only 
 * array elements that return false will be pushed to the new array
 * @return {Array} New array of filtered values
 */
function reject(array, test) {
   let output = [];
    each(array, function(e, i, a) {
        if(!test(array[i], i, array)) {
            output.push(array[i]);
        }
    })
    return output;
}
module.exports.reject = reject;

/**
 * partition: Takes an <array> and a <function> as arguments and returns a new
 * array of 2 sub arrays. Array elements that evaluate truthy when passed thru
 * the function are contained in the first sub array and array elements that 
 * evaluate falsy are contained in the second sub-array. 
 * 
 *      example => partition([1,2,3,4,5], function(element,index,arr) {
 *                     return element % 2 === 0; });
 *              -> [[2,4],[1,3,5]]
 * 
 * @param {Array} array Array to be passed as an argument
 * @param {Function} action Function that evaluates to a boolean value. Will
 * input array elements as arguments and push truthy returns to one sub-array
 * and falsy returns to the second sub-array.
 * @return {Array} Contains truthy sub-array at index [0] and falsy
 * sub-array at index [1].
 */
function partition(array, action) {
    let output = [[],[]];
    each(array, function(e, i, a) {
         if(action(array[i], i, array)) {
             output[0].push(array[i]);
         } else {
             output[1].push(array[i]);
         }
    })
    return output;
}
module.exports.partition = partition;

/**
 * unique: Takes an <array> as an argument and returns a new array of elements
 * with duplicates removed.
 * 
 *      example => unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
 * 
 * @param {Array} array Array to be passed into the function.  Function checks
 * for unique index locations for values as it iterates through array elements.
 * @return {Array} New array with duplicate elements removed
 */
function unique(array) {
    let output = [];
    each(array, function(e, i, a) {
        if (indexOf(array, array[i]) === i) {
            output.push(array[i])
        }
    })
    return output;
}
module.exports.unique = unique;

/**
 * map: Takes an <array> or <object> and a <function> as arguments, calls the
 * function for each element, and returns the modified collection.  The
 * function can take up to three arguments: the element, the iteration, and
 * the collection itself (object or array).
 * 
 *      example => map([1,2,3,4], function(e){return e * 2}) 
 *              -> [2,4,6,8]
 * 
 * @param {Array or Object} collection Array or object to be modified by
 * a function.
 * @param {Function} action Function that inputs the elements of the
 * collection and returns to a new, modified collection.
 */
function map(collection, action) {
    let output = [];
    each(collection, function(e, i, a) {
        output.push(action(e, i, a))
    })
    return output;
}
module.exports.map = map;

/**
 * pluck: Takes an <array> of objects and a <property> as arguments. Returns
 * an array of all values of <property> for all objects in <array>
 * 
 *      example => pluck([{a: "one"}, {a: "two"}], "a") 
 *              -> ["one", "two"]
 * 
 * @param {Array} array Array of objects
 * @param {String} property Property of values to pluck from objects
 * @return {Array} Returns array of <property> values from all objects in <array>
 */
function pluck(array, property) {
    return map(array, function(elem) {
        return elem[property];
    })
}
module.exports.pluck = pluck;

/**
 * contains: Takes an <array> and a <value> as arguments. Returns true
 * if <value> exists as an element in <array>
 * 
 *      example => contains([1,"two", 3.14], "two") 
 *              -> true
 * 
 * @param {Array} array An array of elements
 * @param {Value} value A value of any type to search in <array> 
 * @return {Boolean} Returns true if <value> is in <array>, false otherwise
 */
function contains(array, value) {
    let output = (indexOf(array, value) === -1) ? false: true;
    return output;
}
module.exports.contains = contains;


/**
 * every: Takes a <collection> of elements, either an array or object, and a 
 * <test> function that returns a boolean value. Function will return true if 
 * all elements passed into <test> return true.  
 * 
 *      example => every([2,4,6], function(e){return e % 2 === 0}) 
 *              -> true
 * 
 * @param {Array or Object} collection Array or object to be passed into the
 * test function.
 * @param {Function} test Function that takes elements of <collection> as 
 * arguments and returns a boolean value.
 * @return {Boolean} Returns true if and only if all elements in <collection> 
 * return true for <test>
 */
function every(collection, test) {
    each(collection, function(value) {
        if (!(test(value))) return false;
    });
    return true;
}
module.exports.every = every;

/**
 * every: Takes a <collection> of elements, either an array or object, and a 
 * <test> function that returns a boolean value. Function will return true if 
 * at least one element passed into <test> returns true.  
 * 
 *      example => some([1,2,5], function(e){return e % 2 === 0}) 
 *              -> true
 * 
 * @param {Array or Object} collection Array or object to be passed into the
 * test function.
 * @param {Function} test Function that takes elements of <collection> as 
 * arguments and returns a boolean value.
 * @return {Boolean} Returns true if at least one element in <collection> 
 * returns true for <test>
 */
function some(collection, action) {
    var result;
    if (action) {
        var result = map(collection, action)
    } else {
        result = collection;
    }
    if(contains(result, true)){
        return true;
    }
    return false;
}
module.exports.some = some;

/**
 * reduce: Takes an <array>, <action>, and <seed> as parameters and calls action
 * for each element in the array, starting with the seed, and taking the
 * previous result and the current element as arguments.  If no seed is given,
 * <action> will take the first element of <array> as the seed.
 *      
 *      example => reduce([1,2,3], function(prev, curr){ return prev + curr}) 
 *              -> 6
 * 
 * @param {Array} Array of values that will be iterated and passed through
 * <action>
 * @param {Function} action Function that takes three parameters - the
 * previous result <prev>, the current element <array[i]>, and the iteration <i>.  
 * The function must return a value that can be passed as <prev> for the sake
 * of the next iteration.
 * @return {Value} Returns the last returned value of <action>, once the
 * iteration through the array is complete.
 */
function reduce(array, action, seed) {
    var prev = seed;
    for(var i = 0; i < array.length; i++) {
        if(prev === undefined) {
            prev = array[0];
        } else {
            var next = action(prev, array[i], i);
            prev = next;
        }
    }
    return prev;
        
}
module.exports.reduce = reduce;

/**
 * extend: Takes a <main_object> and any other number of objects as parameters 
 * and copies the properties of the other objects into <main_object>. Any
 * existing property values in <main_object> will be overwritten, and any
 * nonexistant properties in <main_object> will be created if they exist
 * in any of the other objects.
 *      
 *      example => var data = {a:"one"}
 *                 extend(data, {b:"two"}); 
 *                  -> data now equals {a:"one",b:"two"}
*                  extend(data, {a:"two"}); 
*                   -> data now equals {a:"two"}
 * 
 * @param {Object} main_object Object that will be extended by the other objects
 * @param {Object} object Any other number of objects whose properties will be
 * copied or overwritten to <main_object>
 * @return {Object} Returns the <main_object> after being extended by the
 * properties of the other objects passed as arguments.
 */
function extend(main_object, object ) {
    for(var i = 1; i < arguments.length; i++) {
        for(var key in arguments[i]) {
            main_object[key] = arguments[i][key];
        }
    }
    return main_object;
}
module.exports.extend = extend;

/********************
 * EXTRA SHIT ADDED *
 *      1.2.0       *
 * ******************
 * 
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