const numbers = [4, 4, 6, 17, 3, 996, 55, 3, 56, 707, 1, 707, 1];

function uniqNumbersSort(arr){
    const uniqArray = Array.from(new Set(arr));
    return uniqArray.sort(( a, b ) =>  a - b);
}
console.log(uniqNumbersSort(numbers));