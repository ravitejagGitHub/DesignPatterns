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

let uc=  new UltimateCalculator();
console.log('Add : ', uc.add(2,4));
console.log('Sub : ', uc.sub(2,4));
console.log('Multiply : ', uc.multiply(2,4));
console.log('Divide : ', uc.divide(2,4));

