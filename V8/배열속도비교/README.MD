# [V8]arr=[] vs new Array vs object

---

- 배열과 객체에서 탐색의 속도는 배열이 우수하다

## obj vs arr

### obj

```jsx
arr={};

console.time("obj")
for(let i=0;i<100000000;i++)
{
    arr[i]=0;
}
console.timeEnd("obj") //obj: 2.465s
```

객체는 히든클래스라는 방법을 사용해서 자바스크립트의 배열과 탐색하는 방법이 다르다.

### arr

```jsx
arr=[];

console.time("arr")
for(let i=0;i<100000000;i++)
{
    arr[i]=0;
}
console.timeEnd("arr") //arr: 1.671s
```

1억을 기준으로 arr이 0.8초 정도 빠르게 실행된다.

## arr=[] vs new Array

### arr=[]

```jsx
arr=[];

console.time("arr")
for(let i=0;i<100000000;i++)
{
    arr[i]=0;
}
console.timeEnd("arr") //arr: 1.671s
```

### new Array

```jsx
console.time("newarr")
let arr = new Array(100000000);
for(let i=0;i<100000000;i++)
{
    arr[i]=0;
}
console.timeEnd("newarr") //newarr: 4.708s
```

1억을 기준으로 new Array가 2.9초늦게 실행된다

근데 이상한점이 하나 있다.

```jsx

arr=[];

console.time("arr")
for(let i=0;i<10000000;i++)
{
    arr[i]=0;
}
console.timeEnd("arr") //arr: 209.843ms

console.time("newarr")
let arr = new Array(10000000);
for(let i=0;i<10000000;i++)
{
    arr[i]=0;
}
console.timeEnd("newarr") //newarr: 64.637ms

```

천만으로 바꾸면 new Array가 더 빨리 실행된다.

여러 테스트 결과

3천만까지는 new Array가 빨랐고, 4천만부터 arr가 높은 성능을 보여줬다.

```jsx

//2천만
arr: 336.597ms
newarr: 211.843ms

//3천만
arr: 636.259ms
newarr: 148.964ms

//4천만
arr: 872.357ms
newarr: 2.112s
```

원인은 찾아봤지만 아직은 모르겠다…

추후에 알게되면 작성할 예정이다.

## 결론

3천만 크기 미만은 new Array를 통해 크기를 한번에 할당받는데 빠르지만 그 이후 크기는 한번에 할당받는것보다 arr=[]으로 크기를 재할당해가며 채우는것이 더 빠르다.