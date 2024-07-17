const promoСode = 'скидка';
const enteredCode = prompt('Введите промокод');

if(enteredCode.toLowerCase() == promoСode)
{
    alert('Промокод применён');
}
else
{
    alert('Промокод не работает');
}