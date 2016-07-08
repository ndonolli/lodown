var 
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');

describe('lodown', function() {
    // each()
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
   
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for(var key in customer) {
              expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
    // valueCount()
    describe('valueCount', function() {
        it('should iterate a collection and return an object with value counts as properties', function() {
            var action = sinon.spy();
            lodown.valueCount(customers, "gender");
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
    });
    describe('most', function() {
        it('should take array of objects and return object with largest value for numerical property', function() {
            var action = sinon.spy()
            lodown.most(customers);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
    });
    describe('least', function() {
        it('should take array of objects and return object with smallest value for numerical property', function() {
            var action = sinon.spy();
            lodown.least(customers);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
    });
     describe('average', function() {
        it('should return average value for array of values', function() {
            var action = sinon.spy();
            var array = [1,2,3];
            lodown.average(array);
            expect(action.callCount).to.equal(array.length);
        });
    });
    describe('allValues', function() {
        it('should array of all values of a specific property in a JSON object', function() {
            var action = sinon.spy();
            lodown.allValues(customers, "name");
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            expect  
            });
        });
    });
    describe('currencyToNum', function() {
        it('should take a currency formatted string and return a floating number', function() {
            var action = sinon.spy();
            lodown.currencyToNum();
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            expect  
            });
        });
    });
});