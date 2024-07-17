const someArr = [1, 2, 3, 1, 5, 4, 2, 3, 5, 'they', 'don\'t', 'know', 'that', 'we', 'know', 'that', 'they', 'know' ];
const someSet = new Set(someArr);
const uniqueArr = Array.from(someSet);

alert(uniqueArr);