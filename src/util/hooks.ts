import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import dayjs from "dayjs";
import { useParams } from "react-router";

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

export const useRoutineFromRoute = () => {
  let { id } = useParams<{ id: string }>();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  let routine = currentUser.routines.find((routine: any) => routine.id === id);
  return routine;
};
