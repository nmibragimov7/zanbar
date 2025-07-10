import {useEffect, useRef, useState} from "react";

const queries = [
  "(max-width: 767px)",
  "(min-width: 768px) and (max-width: 1023px)",
  "(min-width: 1024px) and (max-width: 1239px)",
  "(min-width: 1240px)"
];
type TMedia = "isMobile" | "isTabletVertical" | "isTabletHorizontal" | "isDesktop";

export const useMatchMedia = (): Record<TMedia, boolean> => {
  const medias: TMedia[] = [
    "isMobile",
    "isTabletVertical",
    "isTabletHorizontal",
    "isDesktop"
  ];
  const mediaQueries = useRef<MediaQueryList[]>([]);
  const getValues: any = (): boolean[] => mediaQueries.current.map((mql: any) => mql?.matches);
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (typeof matchMedia !== "undefined") {
      mediaQueries.current = queries.map((query) => matchMedia(query));
      setValues(getValues);
    }
    const handler = () => {
      setValues(getValues);
    };
    mediaQueries.current.forEach((query) => query.addEventListener("change", handler));

    return () => {
      mediaQueries.current.forEach((query) => query.removeEventListener("change", handler));
    };
  }, []);

  return medias.reduce(
    (acc: Record<TMedia, boolean>, screen, idx) => {
      return {
        ...acc,
        [screen]: values[idx],
      };
    },
    {
      isMobile: false,
      isTabletVertical: false,
      isTabletHorizontal: false,
      isDesktop: false,
    },
  );
};
