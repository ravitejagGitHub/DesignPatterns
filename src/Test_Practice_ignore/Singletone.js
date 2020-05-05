class Robot {
    val = 1;
    constructor(){
        if(typeof Robot.instanc === 'object') {
            return Robot.instanc;
        }

        Robot.instanc = this;
        return this;
    }
}

let x = new Robot();
x.val = 2;
let y = new Robot();
y.val = 3;
console.log(x, y);