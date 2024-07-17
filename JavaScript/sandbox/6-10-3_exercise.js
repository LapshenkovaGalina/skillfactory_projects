const THIS_YEAR_0 = 2024;
const personName = prompt('Введите Ваше имя');
const yearOfBirth = +prompt('Введите год рождения');

if(isNaN(yearOfBirth))
{
    alert('Год должен быть числом!');
}
else if (yearOfBirth <= THIS_YEAR_0)
{ 
    if(yearOfBirth < 0)
    {
        alert(`Полагаем, что Вы родились до нашей эры.\n${personName}: ${THIS_YEAR_0 - yearOfBirth}`);

    }
    else
    {
        alert(`${personName}: ${THIS_YEAR_0 - yearOfBirth}`);
    }
}
else
{
    alert('Некорректное значение!');
}