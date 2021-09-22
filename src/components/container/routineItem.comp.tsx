import { RoutineItemContainer } from "./routineItem.styles";

interface Props {
  routine: any;
}

const RoutineItem = ({ routine }: Props) => {
  return <RoutineItemContainer>{routine.name}</RoutineItemContainer>;
};

export default RoutineItem;
