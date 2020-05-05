class Robot {

    constructor(){
        if(typeof Robot.instanc === 'object') {
            return Robot.instanc;
        }
        val = 1;
        Robot.instanc = this;
        return this;
    }
}

let x = new Robot();
x.val = 2;
let y = new Robot();
y.val = 3;
console.log(x, y);