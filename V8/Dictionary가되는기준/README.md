## **Fast or Dictionary Elements?**

V8 공식 블로그에 따르면 큰 희소배열/HOLEY배열이 존재한다면 Fast elements 

즉, FixedArray로 모든 공간을 할당하고 있으면 굉장히 낭비스럽다고 말한다.

그래서 속도는 느리지만?(내생각에는 해싱되는 연산속도가 있으니) 메모리를 절약하는 딕셔너리 방법을 소개한다고 합니다

```jsx
let arr=[]
arr[9998]=123
123
>  %DebugPrint(arr)
DebugPrint: 000000BEC4201471: [JSArray]
 - map: 0x02a6ba956ed9 <Map[32](DICTIONARY_ELEMENTS)> [FastProperties]
 - prototype: 0x0148d0f08bd1 <JSArray[0]>
 - elements: 0x01e6f6c53691 <NumberDictionary[16]> [DICTIONARY_ELEMENTS]
 - length: 9999
```

어떤 크기가 딕셔너리가 되는 기준인지는 찾지 못했지만 9999보다 큰 숫자로 hole만든채 접근하게되면 딕셔너리가 된다.

```jsx
let arr=[,,1];
undefined
> for(let i=0;i<10000;i++)arr[i]=0
0
> %DebugPrint(arr)
DebugPrint: 000001BD1E2F0AF1: [JSArray] in OldSpace
 - map: 0x00abb73c4ff9 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x01c6cf3ed9a9 <JSArray[0]>
 - elements: 0x00feb1501149 <FixedArray[10900]> [HOLEY_SMI_ELEMENTS]
 - length: 10000
```

희소배열이여도 초기에는 FixedArray가 됬었던걸 확인할수 있었다.

위 테스트를 통해 hole개수가 커야 딕셔너리로 간다는것을 알 수 있었다.

new Array로 크기를 지정해주게되면 hole의 개수와 상관없이 fixedArray형태이다 

```jsx
> let arr= new Array(9999)
> %DebugPrint(arr)

DebugPrint: 0000033C07941149: [JSArray]
 - map: 0x00abb73c4ff9 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x01c6cf3ed9a9 <JSArray[0]>
 - elements: 0x033c07941169 <FixedArray[9999]> [HOLEY_SMI_ELEMENTS]  
 - length: 9999
```

new Array(10000) 에서 arr[10001]=10 으로 접근하면 딕셔너리로 바뀐다.

```jsx
arr = new Array(9999)
> arr[10000]=1

> %DebugPrint(arr)
DebugPrint: 0000029961681709: [JSArray]
 - map: 0x034c0f039c71 <Map[32](DICTIONARY_ELEMENTS)> [FastProperties]
 - prototype: 0x01c6cf3ed9a9 <JSArray[0]>
 - elements: 0x029961681931 <NumberDictionary[16]> [DICTIONARY_ELEMENTS]
 - length: 10001
```

new Array(10000) 에서 push(9) 으로 접근하면 FixedArray의 크기가 늘어나고 형태가 바뀌지 않는다.

```jsx
> arr = new Array(9999)
> arr.push(9)

> %DebugPrint(arr)
DebugPrint: 0000020306854859: [JSArray] in OldSpace
 - map: 0x00abb73c4ff9 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x01c6cf3ed9a9 <JSArray[0]>
 - elements: 0x029961689149 <FixedArray[15016]> [HOLEY_SMI_ELEMENTS]
 - length: 10
```

push연산으로 메모리가 커지면 fixed 고정

고정메모리범위를 넘어가는곳에 동적으로 값을 할당하면 딕셔너리가 된다.

추가로 1000에 바로 값을 할당해봤는데 fixedArray형태이다.

어느정도 hole이 커져야 딕셔너리가 된다는것을 알 수 있다.

```jsx
> arr=[]
> arr[1000]=1000
1000
> %DebugPrint(arr)
DebugPrint: 00000299616812E9: [JSArray]
 - map: 0x00abb73c4ff9 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x01c6cf3ed9a9 <JSArray[0]>
 - elements: 0x03ea79ce55a1 <FixedArray[1517]> [HOLEY_SMI_ELEMENTS]
 - length: 1001
```

## 정리

new Array는 얼마만큼의 메모리를 추가하던 fixedArray형태로 연속적인 메모리를 가진다

push연산은 메모리밖의 범주에 접근하는게 아니라서 fixexArray형태를 유지한다

v8공식 블로그에서는 9999 : “foo”로 한번에 동적으로 할당하게되면 딕셔너리로 바뀌어 해쉬 테이블 자료구조로 동작한다.

## 참고자료

https://v8.dev/blog/fast-properties

https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc