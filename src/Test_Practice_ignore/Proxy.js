class OldCalculator {
    constructor() {
        this.operations = function(term1, term2, operation) {
            switch (operation) {
                case 'add':
                    return { res: term1 + term2 };
                case 'sub':
                    return { res: term1 - term2 };
                default:
                    return NaN;
            }
        };
    }
}

class NewCalculator {
    constructor() {
        this.multiply = function(term1, term2) {
            return term1 * term2;
        };
        this.divide = function(term1, term2) {
            return term1 / term2;
        };
    }
}

//Facade: 	A single class that represents an entire subsystem
// Create an UltimateCalculator, that would let you use all the operations at once with one interface, which should reuse OldCalculator and NewCalculator.


class UltimateCalculator {
    constructor() {
        this.oldCal = new OldCalculator();
        this.newCal = new NewCalculator();
    }

    add(term1, term2){
        return this.oldCal.operations(term1, term2, 'add').res;
    }
    sub(term1, term2){
        return this.oldCal.operations(term1, term2, 'sub').res;
    }
    multiply(term1, term2) {
        return this.newCal.multiply(term1,term2);
    }
    divide(term1, term2) {
        return this.newCal.divide(term1,term2);
    }
}

// let uc=  new UltimateCalculator();
// console.log('Add : ', uc.add(2,4));
// console.log('Sub : ', uc.sub(2,4));
// console.log('Multiply : ', uc.multiply(2,4));
// console.log('Divide : ', uc.divide(2,4));



//Proxy: The interface of the Proxy object is the same as the original object and clients may not even be aware they are dealing with a proxy rather than the real object
// To speed things up caches frequently requested from  UltimateCalculator. If arguments & operations already cached it goes out of re caliculating the same operation.

// C)	Create a CleverCalculator, that would let you cache results of the UltimateCalculator calculation depending on arguments and type of operation.


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
            console.log('from Cache: ');
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
        console.log('new Calc: ');
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
        console.log('new Calc: ');
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
        console.log('new Calc: ');
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
        console.log('new Calc: ');
        return result;
    }
}
let cc = new CleverCalculator();

console.log('-------------- Add ----------------');
console.log(cc.add(2,3));
console.log(cc.add(1,5));
console.log(cc.add(2,3));
console.log(cc.cache);

console.log('-------------- Sub ----------------');
console.log(cc.sub(2,3));
console.log(cc.sub(1,5));
console.log(cc.sub(2,3));
console.log(cc.cache);


console.log('-------------- Multiply ----------------');
console.log(cc.multiply(2,3));
console.log(cc.multiply(1,5));
console.log(cc.multiply(2,3));
console.log(cc.cache);

console.log('-------------- Devide ----------------');
console.log(cc.divide(2,3));
console.log(cc.divide(1,5));
console.log(cc.divide(2,3));
console.log(cc.cache);