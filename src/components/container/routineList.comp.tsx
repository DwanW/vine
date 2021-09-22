import RoutineItem from "./routineItem.comp";
import { RoutineListContainer } from "./routineList.styles";

interface Props {
  routines: any[];
}

const RoutineList = ({ routines }: Props) => {
  return (
    <RoutineListContainer>
      {routines.map((routine: any) => (
        <RoutineItem key={routine.id} routine={routine} />
      ))}
    </RoutineListContainer>
  );
};

export default RoutineList;
