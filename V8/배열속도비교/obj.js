arr={};

console.time("obj")
for(let i=0;i<100000000;i++)
{
    arr[i]=0;
}
console.timeEnd("obj") //obj: 2.465s