
const person = {
    name: 'John',
    age: 30
};


function setFullName(fullNameStr)
{
   return this.fullName = fullNameStr;
}

const setPersonFullName = setFullName.bind(person, 'John Smith');

setPersonFullName();
console.log(person);