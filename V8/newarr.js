console.time("arr")
let arr = new Array(10000000);
for(let i=0;i<10000000;i++)
{
    arr[i]=0;
}
console.timeEnd("arr")