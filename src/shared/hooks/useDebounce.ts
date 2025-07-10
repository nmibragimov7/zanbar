import {useCallback, useRef} from "react";

interface IArgs {
  cb: (arg: any) => void;
  delay: number;
}

export const useDebounce = ({cb, delay}: IArgs) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (arg: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        cb(arg);
      }, delay);
    },
    [timer, cb, delay],
  );
};
