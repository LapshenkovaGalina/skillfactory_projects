const enteredWordStr = prompt('Введите слово');
const enteredWordArr = Array.from(enteredWordStr);
let reversedWordArr = [];
        
for(let letter of enteredWordArr)
    {
        reversedWordArr.unshift(letter);
    }

    for (let i = 0; i <= enteredWordArr.length; i++)
    {
        if (enteredWordArr[i] !== reversedWordArr[i])
        {
            alert(`Слово ${enteredWordStr} не является палиндромом.`);
            break;
        }
        else if (i == enteredWordArr.length)
        {
            alert(`Слово ${enteredWordStr} является палиндромом.`);
        }
    }