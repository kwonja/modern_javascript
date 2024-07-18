# [JS]배열은 메모리 관리를 어떻게 할까?

자바스크립트의 배열은 일반적인 배열과는 다르다

- 일반적인 배열
    - 크기가 정해져 있다
- 자바스크립트의 배열
    - **객체이다**
    - 배열의 크기를 늘리거나 줄일수 있다.

처음은 지인의 물음으로 시작했다

<aside>
💡 자바스크립트 배열은 push를 하게되면 LinkedList처럼 이어지는거야?

</aside>

“그냥 그렇구나” 하고 사용하고 있었는데 

개발자로서 배열이 메모리에 어떻게 존재하는지 모르는것에 대한 안타까움을 스스로 느끼고 정리를 하게 되었다. ~~이게 3일이나 걸릴줄 몰랐지..~~

그렇게 V8엔진을 분석하게 되었다.

Node가 깔려있는 상태에서 `node --allow-natives-syntax`를 입력하면 아래 결과를 볼 수 있다.

```jsx
> let arr=[1,2,3]
> %DebugPrint(array);
```

```jsx
DebugPrint: 000001B177C47491: [JSArray]
 - map: 0x00c280ec94b1 <Map[32](PACKED_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x00c280ec8bd1 <JSArray[0]>
 - elements: 0x00c280ec4151 <FixedArray[3]> [PACKED_SMI_ELEMENTS (COW)]
 - length: 3
 - properties: 0x007265b40259 <FixedArray[0]>
 - All own properties (excluding elements): {
    0000007265B44791: [String] in ReadOnlySpace: #length: 0x011d27eefd39 <AccessorInfo name= 0x007265b44791 <String[6]: #length>, data= 0x007265b404e9 <undefined>> (const accessor descriptor), location: descriptor
```

여기서 주목할 점은 elements이다

**FixedArray[3]**라는 것은 요소를 저장하기 위해 **고정된 크기의 배열**을 사용한다는 의미다.

https://github.com/nodejs/node/blob/49342fe6f2ca6cedd5219d835a0a810e6f03cdd7/deps/v8/src/objects/fixed-array.h#L99

// FixedArray describes fixed-sized arrays with element type Object.

v8공식 깃허브에서는 FixedArray 는 크기가 고정된 배열인데 타입은 객체라고 정의하고 있다.

크기를 고정한다 → 우리가 생각하는 일반적인 배열의 메모리를 가진다

우리가 배열을 사용하면 고정된 크기로 할당 하는걸 알 수 있다.

그러면 어떻게 크기를 할당하지?

아래에 값을 더 추가해 보겠다.

 `arr.push(4.3)`

```jsx
DebugPrint: 0000004907982C59: [JSArray]
 - map: 0x00c280ec9421 <Map[32](PACKED_DOUBLE_ELEMENTS)> [FastProperties]
 - prototype: 0x00c280ec8bd1 <JSArray[0]>
 - elements: 0x03856f88f381 <FixedDoubleArray[22]> [PACKED_DOUBLE_ELEMENTS]
 - length: 4
 - properties: 0x007265b40259 <FixedArray[0]>
 - All own properties (excluding elements): {
    0000007265B44791: [String] in ReadOnlySpace: #length: 0x011d27eefd39 <AccessorInfo name= 0x007265b44791 <String[6]: #length>, data= 0x007265b404e9 <undefined>> (const accessor descriptor), location: descriptor
```

배열의 크기가 3→4가 되어야하는데 22가 된걸 볼 수 있다.

```jsx
new capacity=old_capacity + (old_capacity >> 1) + 16
```

새로운공간 = 4 + 2 + 16 = 22 가 된 것이다.

V8에서는 위 공식을 통해 고정크기를 재할당한다

이때, elements 타입이 `PACKED_DOUBLE_ELEMENTS` 으로 바뀐걸 볼 수 있다

`arr.push('x')`

```jsx
> %DebugPrint(array);
DebugPrint: 0xad33ffc67a9: [JSArray] in OldSpace
 - map: 0x0ad37a9c4ef9 <Map(PACKED_ELEMENTS)> [FastProperties]
 - prototype: 0x0ad33b7210b9 <JSArray[0]>
 - elements: 0x0ad3576a3839 <FixedArray[22]> [PACKED_ELEMENTS]
```

또한 문자열을 넣으면  `[PACKED_ELEMENTS]` 으로 바뀌었다.

형식은 SMI → DOUBLE → 기본 ELEMENTS 순이다.

여기서 주의할점은 한번 특정화하는 방법이 바뀌면 다시 돌아갈수 없다.

### Packed vs Holey

```jsx
elements: 0x0200ded82891 <FixedArray[22]> {
           0: 0x0200ded82981 <HeapNumber 1.0>
           1: 0x0200ded82971 <HeapNumber 2.0>
           2: 0x0200ded82961 <HeapNumber 3.0>
           3: 0x0200ded82951 <HeapNumber 4.3>
           4: 0x007265b438c1 <String[1]: #x>
        5-21: 0x007265b405b9 <the_hole>
 }
```

<the_hole>이라는 부분이 있는데 채워지지 않은 부분을 나타낸다.

 V8에서 'Hole'은 할당되지 않은 요소나 삭제된 배열 요소를 마크하기 위해 사용된다.

보통 element kind가 더 구체적일 수록 더 세밀한 최적화를 받을 수 있다. 반대로 element kind가 더 일반화 될 수록 배열에 대한 연산이 더 느려질 수 있다. **최적의 성능을 위해서는 아무 이유 없이 element kind를 변경하지 않고 가장 구체적인 element kind를 사용해야 한다.**

```jsx
> let holearr=[];
> holearr[10]=10;
> %DebugPrint(holearr);
```

```jsx
...
map: 0x00c280ec9469 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x00c280ec8bd1 <JSArray[0]>
 - elements: 0x004907982249 <FixedArray[32]> [HOLEY_SMI_ELEMENTS]
 - length: 11
...
elements: 0x004907982249 <FixedArray[32]> {
         0-9: 0x007265b405b9 <the_hole>
          10: 2
       11-31: 0x007265b405b9 <the_hole>
 }
```

packed는 holey가 될 수 있다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a858fa0d-64c8-4449-950c-9b47a942d816/b0f5f275-969a-4105-84ac-49a835d93409/Untitled.png)

### Large/Sparse Array

배열의 hole이 엄청나게 커지면 특이한 일이 벌어진다

```jsx
 array[32 << 20] = 0;
0
> %DebugPrint(array)
DebugPrint: 0xad33ffc67a9: [JSArray] in OldSpace
 - map: 0x0ad365ac1119 <Map(DICTIONARY_ELEMENTS)> [FastProperties]
 - prototype: 0x0ad33b7210b9 <JSArray[0]>
 - elements: 0x0ad3c17422f9 <NumberDictionary[52]> [DICTIONARY_ELEMENTS]
 - length: 33554433
```

배열의 hole이 엄청 커지면 V8은 요소를 저장할 때 **`FixedArray`**가 아닌 **`NumberDictionary`**를 사용한다. **`NumberDictionary`**는 해시 테이블 기반 콜렉션으로 숫자 키에 특화돼있다.

Element kind 역시 **`DICTIONARY_ELEMENTS`**로 변경된 것을 알 수 있다.

V8은 hole이 많은 배열은 메모리를 아끼기 위해 해쉬 테이블로 저장한다. 해쉬 테이블에 대한 연산은 해시 코드 계산, 엔트리 룩업, 리해싱 때문에 배열에 대한 연산보다 느리다.

배열의 크기가 엄청 커졌을 때도 **`NumberDictionary`**를 사용한다.

같은 크기로 크기를 지정했을때는 FixedArray 형태로 나온다

```jsx
> let test = new Array(33554433).fill(0)
> %DebugPrint(test);

> %DebugPrint(test);
DebugPrint: 00000366764C1189: [JSArray] in OldSpace
 - map: 0x0105ef739189 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x00c280ec8bd1 <JSArray[0]>
 - elements: 0x02171a0c1149 <FixedArray[33554433]> [HOLEY_SMI_ELEMENTS]
 - length: 33554433
```

그러면 크기가 작은 희소배열은 어떻게 저장될까?

```jsx
> let sparse =[,,,,,,,,,,,7]
DebugPrint: 0000009690C83821: [JSArray]
 - map: 0x00c280ec9469 <Map[32](HOLEY_SMI_ELEMENTS)> [FastProperties]
 - prototype: 0x00c280ec8bd1 <JSArray[0]>
 - elements: 0x0105ef7332e1 <FixedArray[12]> [HOLEY_SMI_ELEMENTS (COW)]
 - length: 12
```

HOLEY SMI 타입에 FixedArray를 가진다.

## 결론

- FixedArray
    - 배열의 크기가 꽉차면 공식에 맞춰 크기를 재할당
    - 크기가 작은 희소배열
    - 일반 배열
- NumberDictionary
    - 해쉬 테이블로 관리
    - 빈곳이 많은 희소배열

## 참고자료

https://www.woong-jae.com/post/v8-array-internals

https://itnext.io/v8-deep-dives-understanding-array-internals-5b17d7a28ecc