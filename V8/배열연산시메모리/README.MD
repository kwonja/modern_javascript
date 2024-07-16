# [V8] PUSH,POP,SHIFT 내부 연산

---

```jsx
arr=[1,2,3,4,5]

DebugPrint: 000001BF51C7DDC9: [JSArray]
 - map: 0x0148d0f094b1 <Map[32](PACKED_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x0148d0f08bd1 <JSArray[0]>
 - elements: 0x02c1fc8cf329 <FixedArray[5]> [PACKED_SMI_ELEMENTS (COW)]
 - length: 5
```

## push

```jsx
arr.push(6)
6
>  %DebugPrint(arr)
DebugPrint: 000000BEC4201411: [JSArray]
 - map: 0x0148d0f094b1 <Map[32](PACKED_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x0148d0f08bd1 <JSArray[0]>
 - elements: 0x01e6f6c57031 <FixedArray[25]> [PACKED_SMI_ELEMENTS]
 - length: 6
```

6 + 6/2 + 16 공식으로 25만큼의 크기를 차지한다

### pop

```jsx
> arr.pop()
6
>  %DebugPrint(arr)
DebugPrint: 000002A6BA959481: [JSArray] in OldSpace
 - map: 0x0148d0f094b1 <Map[32](PACKED_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x0148d0f08bd1 <JSArray[0]>
 - elements: 0x01bf51c51c59 <FixedArray[25]> [PACKED_SMI_ELEMENTS]
 - length: 5
```

25만큼 그대로 가지고 있다.

### shift

```jsx
 arr.shift()
1
>  %DebugPrint(arr)
DebugPrint: 000002A6BA959481: [JSArray] in OldSpace
 - map: 0x0148d0f094b1 <Map[32](PACKED_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x0148d0f08bd1 <JSArray[0]>
 - elements: 0x038bca6bfec1 <FixedArray[15]> [PACKED_SMI_ELEMENTS]
 - length: 4
```

15로 줄어든것을 확인할 수 있다.

https://github.com/nodejs/node/blob/49342fe6f2ca6cedd5219d835a0a810e6f03cdd7/deps/v8/src/objects/elements.cc#L717

해당 링크에 일정공간만 비워두게하는 공식이 있지만 해석은 못했다.

pop이나shift 연산을 통해서 데이터를 제거하다보면 일정 공간이 생기게 때문에 어느정도 너무 큰 낭비없게 최적화하려는 작업(그래도 일정공간 hole이 존재함)을 V8엔진이 자동으로 해준다

## 참고자료

https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc