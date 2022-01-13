import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(x => x + 1), []);
  return { count, increment };
}

test("should increment counter from custom initial value", () => {
  const { result } = renderHook(() => useCounter(9000));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(9001);
});
