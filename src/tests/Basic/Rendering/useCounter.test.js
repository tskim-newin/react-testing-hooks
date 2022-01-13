import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(x => x + 1), []);
  return { count, increment };
}

// Rendering
test("should use counter", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe("function");
});

// Updates
test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
