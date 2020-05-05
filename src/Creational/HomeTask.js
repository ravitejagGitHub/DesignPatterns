class Person {

    constructor(name='unnamed person')  {
        this.name = name;
    }
}

class Shopper extends Person {

    constructor(name, money=0) {
        super(name);
        this.money = money;
        this.employed = false;
    }
}


class Employee extends Shopper {

    constructor(name, money=0, employer='') {
        super(name, money);
        this.employerName = employer;
        this.employed = true;
    }
}

const PersonTypes = Object.freeze({
    Employee:   Symbol('Employee'),
    Shopper:    Symbol('Shopper')
});

class SingletoneEmployee extends Employee {

    constructor(name, money=0, employer='') {
        if(typeof SingletoneEmployee.empInstance === 'object'){
            console.log('Warning: Employee object is already created');
            return SingletoneEmployee.empInstance;
        }
        super(name, money, employer); 
        SingletoneEmployee.empInstance = this;
        return SingletoneEmployee.empInstance;
    }
}

class PersonFactory {
    static create(type, config){
        switch(type) {
            case PersonTypes.Employee:
                return new SingletoneEmployee(config.name,config.money, config.employer);
            case PersonTypes.Shopper:
                return new Shopper(config.name,config.money);
        }
    }
}

const emp1 = PersonFactory.create(PersonTypes.Employee, {
    name: 'raviteja',
    money: 100,
    employer: 'epam'
});
console.log(emp1);

const emp2 = PersonFactory.create(PersonTypes.Employee, {
    name: 'Teja',
    money: 100,
    employer: 'refi'
});


console.log(emp2);
const shp = PersonFactory.create(PersonTypes.Shopper, {
    name: 'raviteja',
    money: 100
});
console.log(shp);
