import DateInput from "./dateinput.comp";
import PriorityForm from "./priority.comp";
import ReminderForm from "./reminder.comp";
import { RoutineObj } from "./routineform.comp";

interface Props {
  routine: RoutineObj;
  handleStartDateChange: (props: any) => void;
  handleEndDateChange: (props: any) => void;
  setRoutine: (props: any) => void;
}

const RoutineLastStep = ({
  routine,
  handleStartDateChange,
  handleEndDateChange,
  setRoutine,
}: Props) => {
  return (
    <div>
      <DateInput
        value={routine.startdate}
        handleChange={handleStartDateChange}
        label="Start date"
      />
      <DateInput
        value={routine.enddate}
        handleChange={handleEndDateChange}
        label="End date"
      />
      <ReminderForm obj={routine} setObj={setRoutine} />
      <PriorityForm obj={routine} setObj={setRoutine} />
    </div>
  );
};

export default RoutineLastStep;