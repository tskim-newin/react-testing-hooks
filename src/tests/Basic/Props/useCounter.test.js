import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount(x => x + 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, reset };
}

test("should reset counter to updated initial value", () => {
  let initialValue = 0;
  const { result, rerender } = renderHook(() => useCounter(initialValue));

  initialValue = 10;
  rerender();

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

test("should reset counter to updated initial value2", () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    {
      initialProps: { initialValue: 0 },
    }
  );

  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

// test("should clean up side effect", () => {
//   let id = "first";
//   const { rerender } = renderHook(() => {
//     useEffect(() => {
//       sideEffect.start(id);
//       return () => {
//         sideEffect.stop(id); // this id will get the new value when the effect is cleaned up
//       };
//     }, [id]);
//   });

//   id = "second";
//   rerender();

//   expect(sideEffect.get("first")).toBe(false);
//   expect(sideEffect.get("second")).toBe(true);
// });
