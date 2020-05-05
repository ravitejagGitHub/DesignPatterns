
// Decorator : Attach additional responsibilities to an object dynamically. 
//D)	Wrap CleverCalculator so on any function call it would log its arguments and type of operation

const CleverCalculator = require('./CleverCalculator');

class Logger {
    static log(oper, term1, term2, result) {
        console.log(`${oper}(${term1}, ${term2}) = ${result}`);
    }
}
class MonitorCleverCalculator extends CleverCalculator {
      
    add(term1, term2){
        const result = super.add(term1, term2);
        Logger.log('Add', term1,term2, result)
        return result;
    }
    sub(term1, term2){
        const result = super.sub(term1, term2);
        Logger.log('Sub', term1,term2, result)
        return result;
    }
    multiply(term1, term2) {
        const result = super.multiply(term1, term2);
        Logger.log('Multiply', term1,term2, result)
        return result;
    }
    divide(term1, term2) {
        const result = super.divide(term1, term2);
        Logger.log('Divide', term1,term2, result)
        return result;
    }
}

let mcc=  new MonitorCleverCalculator();
mcc.add(2,4);
mcc.sub(2,4);
mcc.multiply(2,4);
mcc.divide(2,4);