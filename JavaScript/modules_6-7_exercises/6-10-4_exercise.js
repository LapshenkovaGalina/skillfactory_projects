const THIS_YEAR_1 = 2024;
        const personName = prompt('Введите Ваше имя');
        const personYearOfBirth = +prompt('Введите год рождения');

        if(isNaN(personYearOfBirth) || personName == "")
        {
            alert('Год не число или пустое имя!');
        }
        else if (personYearOfBirth <= THIS_YEAR_1)
        { 
            switch((THIS_YEAR_1 - personYearOfBirth) % 10)
            {
                case 1:
                    alert(`${personName}: ${THIS_YEAR_1 - personYearOfBirth} год`);
                break;

                case 2:
                    alert(`${personName}: ${THIS_YEAR_1 - personYearOfBirth} года`);
                break;

                case 3:
                    alert(`${personName}: ${THIS_YEAR_1 - personYearOfBirth} года`);
                break;

                case 4:
                    alert(`${personName}: ${THIS_YEAR_1 - personYearOfBirth} года`);
                break;

                default:
                    alert(`${personName}: ${THIS_YEAR_1 - personYearOfBirth} лет`);
                break;
            }
        }
        else
        {
            alert('Некорректное значение!');
        }