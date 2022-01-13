import { renderHook } from "@testing-library/react-hooks";
import React, { useCallback, useContext, useState } from "react";

const CounterStepContext = React.createContext(1);

const CounterStepProvider = ({ step, children }) => (
  <CounterStepContext.Provider value={step}>
    {children}
  </CounterStepContext.Provider>
);

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(CounterStepContext);
  const increment = useCallback(() => setCount(x => x + step), [step]);
  const incrementAsync = useCallback(
    () => setTimeout(increment, 100),
    [increment]
  );
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, incrementAsync, reset };
}

test("should increment counter after delay", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter());

  result.current.incrementAsync();

  await waitForNextUpdate();

  expect(result.current.count).toBe(1);
});
