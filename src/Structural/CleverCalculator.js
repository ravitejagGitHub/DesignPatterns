
//Proxy: The interface of the Proxy object is the same as the original object and clients may not even be aware they are dealing with a proxy rather than the real object
// To speed things up caches frequently requested from  UltimateCalculator. If arguments & operations already cached it goes out of re caliculating the same operation.

// C)	Create a CleverCalculator, that would let you cache results of the UltimateCalculator calculation depending on arguments and type of operation.

const  UltimateCalculator = require('./UltimateCalculator');

class CleverCalculator extends UltimateCalculator {
    
    constructor(){
        super();
        this.cache = new Map();       
    }
    getKey(term1,term2, operator) {
        return `${operator}:$${term1}&$${term2}`;
    }

    getFromCache(key, oper){
        if(this.cache.has(oper) && this.cache.get(oper).has(key)) {
            return this.cache.get(oper).get(key);
        }
        return null;
    }

    addToCache(key, oper, result){
        if(!this.cache.has(oper)) {
            this.cache.set(oper, new Map());
        }
        this.cache.get(oper).set(key, result);
    }
    
    add(term1, term2){
        const oper = '+';
        const key = this.getKey(term1,term2, oper);
        let result = this.getFromCache(key , oper);
        if(result!==null) {
            return result;
        }
        result = super.add(term1,term2);
        this.addToCache(key, oper, result);
        return result;
    }
    sub(term1, term2){
        const oper = '-';
        const key = this.getKey(term1,term2, oper);
        let result = this.getFromCache(key , oper);
        if(result!==null) {
            return result;
        }
        result = super.sub(term1,term2);
        this.addToCache(key, oper, result);
        return result;
    }
    multiply(term1, term2) {
        const oper = '*';
        const key = this.getKey(term1,term2, oper);
        let result = this.getFromCache(key , oper);
        if(result!==null) {
            return result;
        }
        result = super.multiply(term1,term2);
        this.addToCache(key, oper, result);
        return result;
    }
    divide(term1, term2) {
        const oper = '/';
        const key = this.getKey(term1,term2, oper);
        let result = this.getFromCache(key , oper);
        if(result!==null) {
            return result;
        }
        result = super.divide(term1,term2);
        this.addToCache(key, oper, result);
        return result;
    }
}
let cc = new CleverCalculator();

console.log('-------------- Add ----------------');
console.log(cc.add(2,3));
console.log(cc.add(1,5));
console.log(cc.add(2,3));


console.log('-------------- Sub ----------------');
console.log(cc.sub(2,3));
console.log(cc.sub(1,5));
console.log(cc.sub(2,3));


console.log('-------------- Multiply ----------------');
console.log(cc.multiply(2,3));
console.log(cc.multiply(1,5));
console.log(cc.multiply(2,3));


console.log('-------------- Devide ----------------');
console.log(cc.divide(2,3));
console.log(cc.divide(1,5));
console.log(cc.divide(2,3));
console.log(cc.cache);

module.exports = CleverCalculator;