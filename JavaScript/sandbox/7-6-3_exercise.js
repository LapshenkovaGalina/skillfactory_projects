const enteredNum = +prompt('Введите любое число');
let arr = [];

if(isNaN(enteredNum))
{
    alert('Введённое значение не является числом.');
}
else
{
    if(enteredNum > 0)
    {
        for(i = 0; i <= enteredNum; i++)
        {
            arr.push(i);
        }
    }
    else
    {
        for(i = 0; i >= enteredNum; i--)
        {
            arr.push(i);
        }
    }
}
        
alert(arr);