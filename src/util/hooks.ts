import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import dayjs from "dayjs";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentDate = () => {
  // default uses local time, dayjs.utc() uses utc time
  let dateObj = {
    year: dayjs().format("YYYY"),
    month: dayjs().format("MMM"),
    day: dayjs().format("DD"),
    weekday: dayjs().format("dddd"),
  };

  return dateObj;
};
