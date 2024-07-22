export default function useDebounce(wait: number = 500) {
  let updateTimer: NodeJS.Timeout | null = null;

  return { debounce };

  function debounce(fn: () => void) {
    if (updateTimer) {
      clearTimeout(updateTimer);
      updateTimer = null;
    }
    updateTimer = setTimeout(fn, wait);
  };
}
