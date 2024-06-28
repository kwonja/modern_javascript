

const arr = [1,3,2,5,9,7];

//return이 무조건 1 or 0 ror -1이어야한다
arr.sort(function(a, b) {
    return a < b ;
});

console.log(arr);