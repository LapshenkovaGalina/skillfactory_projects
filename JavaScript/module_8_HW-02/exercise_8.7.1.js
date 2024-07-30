function printInfo()
{
    return `Name: ${this.name}, Age: ${this.age}`
}

const person = {
    name: 'Alex',
    age: 30
};

console.log(printInfo.call(person));