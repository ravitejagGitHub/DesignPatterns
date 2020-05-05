
// Observer : Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

// C)	You have a list of users. Add functionality to subscribe to the changes on it (e.g. after calling push, pop). 

class ObservableUsers {

    constructor(users) {
        this.users = users || [];
        this.subscribers = [];
    }

    subscribe(subscriber){
        this.subscribers.push(subscriber);
        return  {
            unsubscribe: this._unsubscribe.bind(this, subscriber)
        };
    }

    _unsubscribe(subscriber){
        this.subscribers = this.subscribers.filter( s=> s!=subscriber);
    }

    push(user) {
        this.users.push(user);
        this.notifySubscriber();
        return this.users.length;
    }

    pop() {
        const user = this.users.pop();
        this.notifySubscriber();
        return user;
    }

    notifySubscriber() {
        this.subscribers.forEach(subscribe => {
            subscribe.call(null, this.users);
        });       
    }
}

const users= new ObservableUsers(['Ravi','Teja']);
const sub1 = users.subscribe((users)=>{
    console.log('subsriber 1 : ', users);
});
const sub2 = users.subscribe((users)=>{
    console.log('subsriber 2 : ', users);
});

users.push('Giduturi');
users.pop();

sub2.unsubscribe();
users.push('Raviteja');
users.pop();
