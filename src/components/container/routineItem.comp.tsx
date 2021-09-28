import { NavLink } from "react-router-dom";
import {
  calculateCompletion,
  calculateStreak,
  scheduleToString,
} from "../../util/validation";
import { RoutineItemContainer } from "./routineItem.styles";

interface Props {
  routine: any;
}

const RoutineItem = ({ routine }: Props) => {
  return (
    <RoutineItemContainer>
      <div>{routine.name}</div>
      <div>{scheduleToString(routine.schedule)}</div>
      <div>
        <span>
          streak:{" "}
          {
            calculateStreak(
              routine.records,
              routine.schedule,
              routine.startdate
            ).maxStreak
          }
        </span>{" "}
        <span>
          completion:{" "}
          {calculateCompletion(
            routine.records,
            routine.schedule,
            routine.startdate
          ) * 100}{" "}
          %
        </span>{" "}
        <NavLink to={`/light/${routine.id}`}>light graph</NavLink>
        <NavLink to={`/stats/${routine.id}`}>statistics</NavLink>
        <span>menu button (delete) (edit)</span>
      </div>
    </RoutineItemContainer>
  );
};

export default RoutineItem;
