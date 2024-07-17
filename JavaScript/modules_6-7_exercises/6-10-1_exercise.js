const number = +prompt('Введите любое число');

if(isNaN(number))
{
    alert('Введённые данные не являются числом!');
}
else
{
    alert(`Вы ввели число: ${number};\nКвадрат числа: ${number ** 2};\nКуб числа: ${Math.pow(number,3)}.`);
}