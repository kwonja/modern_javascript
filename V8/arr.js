arr=[];

console.time("arr")
for(let i=0;i<10000000;i++)
{
    arr[i]=0;
}
console.timeEnd("arr") //


let newarr = new Array(10000000);
console.time("newarr")
for(let i=0;i<10000000;i++)
{
    newarr[i]=0;
}
console.timeEnd("newarr") 