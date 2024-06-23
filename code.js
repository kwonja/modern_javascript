


//1. 입력값이 한개일때(한 줄)

// const fs = require('fs');
// var input = fs.readFileSync("/dev/stdin").toString().trim();

//2. 입력값이 여러개일때(한 줄에 공백으로 구분)
// 110 78 158
const fs = require('fs');
var [n,input] = fs.readFileSync("./input.txt").toString().trim().split("\n");
console.log(n);
console.log(input);
