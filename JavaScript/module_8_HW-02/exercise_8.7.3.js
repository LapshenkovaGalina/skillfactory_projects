const personsArr = [{name: 'Anna', age: 15, hairColor: 'black'}, 
    {name: 'Leonid', age: 27, hairColor: 'black'},
    {name: 'Sergey', age: 17, hairColor: 'white'},
    {name: 'Vera', age: 24, hairColor: 'black'},
    {name: 'Alexander', age: 33, hairColor: 'brown'},
    {name: 'Mihail', age: 18, hairColor: 'brown'},
    {name: 'Stepan', age: 42, hairColor: 'black'}
];

const filteredPersonsArr = personsArr.filter((person) => person.age >= 18);

const personsNamesArr = personsArr.map((person) => ({name: person.name}));

console.log(filteredPersonsArr);
console.log(personsNamesArr);
