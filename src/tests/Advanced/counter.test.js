import { act, renderHook } from "@testing-library/react-hooks";
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
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, reset };
}

test("should use custom step when incrementing", () => {
  const wrapper = ({ children }) => (
    <CounterStepProvider step={2}>{children}</CounterStepProvider>
  );
  const { result } = renderHook(() => useCounter(), { wrapper });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);
});
