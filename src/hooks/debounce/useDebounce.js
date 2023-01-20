import { useEffect } from "react";
import { useState } from "react";

export function useDebounce(value, delayTime) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);
    // clean up callback function
    return () => {
      clearTimeout(handler);
    };
  },
  // call effect when the dependencies changes
  [value, delayTime]);

  return debouncedValue
}
