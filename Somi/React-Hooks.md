> re-render는 state와 context가 바뀌었을 때만 일어난다. props가 변한다고 리렌더 되지는 않는다.

# `useState`

-   함수 컴포넌트 안에서 local state 를 추가할 때 호출한다. React는 re-renders 가 되어도 이 state를 보존한다. `useState`는 현재 state value 와 이 값을 update하는데 사용되는 함수를 리턴한다. 이 함수를 이벤트 핸들러나 다른 곳에서 호출해서 사용할 수 있다.

```js
 1:  import React, { useState } from 'react';
 2:	// useState를 React에 import 해서 function 컴포넌트에서 local state를 갖도록 한다.
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:		// Example 컴포넌트에서 useState Hook을 이용해서 새로운 state 변수를 선언. useState 인자로 0을 넘겨줌으로써 count를 초기화시키고, 두번째로 반환되는 것은 count를 업데이트 할 수 있는 setCount 함수이다.
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
						// 유저가 클릭할 때, 새로운 값으로 setCount 함수 호출. React는 count의 state가 새로운 값으로 변경되었으니 Example 컴포넌트를 re-render 한다.
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

# `useEffect`

-   React 컴포넌트 안에서 데이터를 가져오거나 구독하고 DOM을 직접 조작하는 등의 모든 동작을 (side) effects라고 하고 `useEffect`를 사용하면 React는 DOM을 바꾼 뒤에 “effect” 함수를 실행한다. Effects는 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근할 수 있다. 기본적으로 React는 첫 번째 렌더링 포함 re-render마다 effects를 실행한다. Effect를 “해제”할 필요가 있다면, 해제하는 함수를 반환해주면 되는데 이는 선택적이다.

-   `useEffect` 호출에 대한 두 번째 인수로 종속 배열을 지정하면 React는 불필요한 effects 실행을 건너 뛸 수 있다. 마지막 렌더 이후 종속 배열 중 어느 것이 변경된 경우에만 effects를 실행한다.

```js
import React, { useState, useEffect } from "react";

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);

	// componentDidMount, componentDidUpdate, componentWillUnmount 의 조합이라고 생각하면 됨
	useEffect(() => {
    document.title = `You clicked ${count} times`;
		// // browser API를 이용해서 document title을 업데이트
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

# `useContext`

-   앱 안에서 전역적으로 사용되는 데이터들을 여러 컴포넌트들이 쉽게 공유할 수 있도록 해준다. 상위 컴포넌트가 데이터를 가지고 있으면 하위 트리 어디에 있든 그 데이터를 사용할 수 있다.

-   그러나 Context는 꼭 필요할 때만 사용하는 것이 좋다. 이는 컴포넌트 재사용을 어렵게 만들 수도 있다.

```js
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

const ThemeContext = React.createContext(themes.light);

function App() {
    return (
        // useContext를 Context.Provider와 같이 사용
        <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>I am styled by theme context!</button>
    );
}
```

# `useReducer`

-   `useState`의 대체 함수이다. 다수의 하윗값을 포함하는 정적 로직을 만드는 경우나 다음 state가 이전 state에 의존적인 경우에 보통 `useState`보다 `useReducer`를 선호한다.

```js
// reducer - state를 업데이트 하는 역할
// dispatch - state 업데이트를 위한 요구
// action - 요구의 내용

import React, { useState, useReducer } from "react";

const ACTION_TYPES = {
    deposit: "deposit",
    withdraw: "withdraw",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.deposit:
            return state + action.payload;
        case ACTION_TYPES.withdraw:
            return state - action.payload;
        default:
            return state;
    }
}

function Balance() {
    const [number, setNumber] = useState(0);
    const [state, dispatch] = useReducer(reducer, 0);

    return (
        <>
            잔고: {money}원<button onClick={() => dispatch({ type: "deposit", payload: number })}>예금</button>
            <button onClick={() => dispatch({ type: "withdraw", payload: number })}>출금</button>
        </>
    );
}
```

# `useRef`

```js
const refContainer = useRef(initialValue);
```

-   `useRef`는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환하고 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지된다. 컴포넌트가 계속해서 렌더링이 되어도 컴포넌트가 언마운트 되기 전까지는 값을 유지할 수 있다.

-   가장 대표적인 사용 예
    -   1. 저장: State가 변화하면 렌더링이 되고 함수 컴포넌트가 다시 불리면서 내부 변수들이 초기화되는데 Ref가 변화하면 렌더링이 되지 않아 변수들의 값이 유지 된다.

```js
import React, { useState } from "react";

export default function App() {
    // count는 state이기 때문에 'State 올려'가 눌릴 때마다 함수 컴포넌트 App은 렌더링되고 브라우저에 바로 반영된다.
    const [count, setCount] = useState(0);
    // 그러나 useRef를 쓴 countRef는 'Ref 올려'가 눌릴 때 콘솔 창을 보면 알 수 있듯이 값이 변화를 주시하고 있지만 렌더링을 하지 않아 브라우저에 숫자가 올라가지 않다가 'State 올려'가 눌려서 리렌더링이 일어나야만 갑자기 변화가 보이게 된다.
    const countRef = useRef(0);

    console.log("rendering...");

    const increaseCountState = () => {
        setCount(count + 1);
        console.log("Ref: ", countRef.current);
    };

    const increaseCountRef = () => {
        countRef.current += 1;
    };

    return (
        <div>
            <p>State: {count}</p>
            <p>Ref: {countRef.current}</p>
            <button onClick={increaseCountState}>State 올려</button>
            <button onClick={increaseCountRef}>Ref 올려</button>
        </div>
    );
}
```

-   2. DOM 요소에 접근: ex) 아이디 Input 창을 클릭하지 않아도 자동으로 포커스가 되는 것

```js
import React, { useEffect, useRef } from "react";

export default function App() {
    const inputRef = useRef();

    useEffect(() => {
        console.log(inputRef); // { current: ____ } input 태그에 ref={inputRef}를 걸어놓지 않으면 current의 value로 undefined가 들어있고, ref를 걸면 input이 들어간다.
        inputRef.current.focus();
    }, []);

    const search = () => {
        alert(`${inputRef.current.value}를 찾을 수 없습니다.`);
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Search here" />
            <button onClick={search}>Search</button>
        </div>
    );
}
```

# `useMemo`

-   “생성(create)” 함수와 그것의 의존성 값의 배열을 전달하여 의존성이 변경되었을 때에만 메모이제이션된 값을 다시 계산한다. 이 최적화는 모든 렌더링 시의 고비용 계산을 방지한다. `useCallback`과의 차이점은 `useMemo`는 값을 memoize하고 `useCallback`은 함수를 memoize 한다는 것이다.

```js
// useMemo 예시 1: 쉬운 계산 함수 불릴 때 어려운 계산 함수는 불리지 않게 하기
import React, { useMemo, useState } from "react";

const computeSthExpensive = (number) => {
    console.log("어려운 계산!");
    for (let i = 0; i < 999999999; i++) {}
    return number + 10000;
};
const computeSthEasy = (number) => {
    console.log("쉬운 계산!");
    return number + 1;
};

export default function App() {
    const [bigNumber, setBigNumber] = useState(1);
    const [smallNumber, setSmallNumber] = useState(1);

    const sumBigNumbers = useMemo(() => {
        return computeSthExpensive(bigNumber);
    }, [bigNumber]);

    const sumEasyNumbers = computeSthEasy(smallNumber);

    return (
        <div>
            <h3>어려운 계산</h3>
            <input type="number" value={bigNumber} onChange={(e) => setBigNumber(parseInt(e.target.value))} />
            <span> + 10000 = {sumBigNumbers}</span>
            <h3>쉬운 계산</h3>
            <input type="number" value={smallNumber} onChange={(e) => setSmallNumber(parseInt(e.target.value))} />
            <span> + 1 = {sumEasyNumbers}</span>
        </div>
    );
}
```

```js
// useMemo 예시 2: 리렌더할때 원시타입이 아닌 객체가 들어있는 변수가 계속 새로운 주소값으로 초기화 되어 useEffect가 호출되는 것을 방지하기
import React, { useEffect, useMemo, useState } from "react";

export default function App() {
    const [age, setAge] = useState(1);
    const [isInKorea, setIsInKorea] = useState(true);

    const locaiton = useMemo(() => {
        return {
            country: isInKorea ? "한국" : "캐나다",
        };
    }, [isInKorea]);

    useEffect(() => {
        console.log("useEffect 호출");
    }, [isInKorea]);

    return (
        <div>
            <h2>나이가 몇 살입니까?</h2>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <hr />
            <h2>어느 나라에 있습니까?</h2>
            <p>나라: {locaiton.country}</p>
            <button onClick={() => setIsInKorea(!isInKorea)}>나라 변경</button>
        </div>
    );
}
```

# `useCallback`

-   함수도 객체이다. state가 변경되어서 리렌더 할때마다 상관없는 함수가 재생성되어 다른 주소값으로 변수에 할당되면 매우 비효율적이다. 함수를 memoize 해두면 필요할 때만 메모리에서 전에 할당받은 함수를 가져와 재사용할 수 있다.

```js
import React, { useEffect, useCallback, useState } from "react";

export default function App() {
    const [year, setYear] = useState(0);
    const [age, setAge] = useState(0);
    const [toggle, setToggle] = useState(true);

    // 토글을 눌러 state가 변경 되어 리렌더해도 calculate 함수는 새로 할당되지 않고 전의 것을 가지고 있다가 year 가 바뀌었을 때만 불린다.
    const calculateAge = useCallback(() => {
        setAge(2023 - year);
    }, [year]);

    useEffect(() => {
        console.log("calculateAge가 변경됨");
    }, [calculateAge]);

    return (
        <div>
            <input
                type="text"
                value={year || ""}
                placeholder="태어난 연도를 입력하세요"
                onChange={(e) => setYear(e.target.value)}
            />
            <button onClick={calculateAge}>계산</button>
            <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
            <h2>당신의 나이는 {age}세 입니다.</h2>
        </div>
    );
}
```
