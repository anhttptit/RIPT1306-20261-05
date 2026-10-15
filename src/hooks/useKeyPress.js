import { useEffect } from "react";

// Custom hook: lắng nghe phím trên toàn trang, nhớ cleanup
export function useKeyPress(onKey) {
  useEffect(() => {
    function handler(e) {
      if (e.repeat) return;
      onKey(e.key);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey]);
}
