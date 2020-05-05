// Chain of responsibility : 
// A)	Create a CumulativeSum class that would let you get the sum of the elements as follow:
// const sum1 = new CumulativeSum();
// console.log(sum1.add(10).add(2).add(50).sum);

class CumulativeSum {
    constructor(){
        this.sum = 0;
    }

    add(num){
        this.sum+=num;
        return this;
    }
}

const sum1 = new CumulativeSum();
console.log(sum1.add(10).add(2).add(50).sum);
