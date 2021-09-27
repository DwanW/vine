import { scheduleToString } from "../../util/validation";
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
        <span>streak:</span>
        <span>completion:</span>

        <span>light graph link</span>
        <span>statistics</span>
        <span>menu button (delete) (edit)</span>
      </div>
    </RoutineItemContainer>
  );
};

export default RoutineItem;
