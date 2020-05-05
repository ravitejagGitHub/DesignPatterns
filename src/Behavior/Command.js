class SpecialMath {
    constructor(num) {
        this._num = num;
    }

    square() {
        return this._num ** 2;
    }

    cube() {
        return this._num ** 3;
    }

    squareRoot() {
        return Math.sqrt(this._num);
    }
}

// Command objects allow you to centralize the processing of actions, one for each operation.
// B)	Given class SpecialMath create a new instance Command, which would store all the commands given to the SpecialMath 

class Command {
    mathRef;
    commandsExecuted;
    constructor(mathRef){
        this.mathRef = mathRef;
        this.commandsExecuted = []
    }

    execute(cmdName) {
        let output = null
        switch(cmdName){
            case  'square':
                output = this.mathRef.square();
            break;

            case  'cube':
                output = this.mathRef.cube();
            break;

            case  'squareRoot':
                output = this.mathRef.squareRoot();
            break;

            default:
                throw Error(`Unknown Command : '${cmdName}'`);
        }
        if(output!==null){
            this.commandsExecuted.push(cmdName);
        }
        return output;
    }
}

const x = new Command(new SpecialMath(5));
console.log(x.execute('square'));
console.log(x.execute('cube'));
console.log(x.execute('squareRoot'));
try {
    x.execute('cub');
} catch(e) {
    console.log('Error: ' , e.message);
}


console.log(x.commandsExecuted); 
