const mathOperationObj = {
    a: 2,
    b: 3,
    operator: '+'
};


function calculate(a, b, operator)
{
    if (operator === '+') {
        return a + b;
    } 
    else if (operator === '-') {
        return a - b;
    } 
    else if (operator === '*') {
        return a * b;
    }
    else if (operator === '/') {
        return a / b;
    }
    return 0;
}

console.log(calculate.apply(null, Object.values(mathOperationObj)));