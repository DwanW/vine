import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { RoutineObj } from "../../util/types";
import DateInput from "./dateinput.comp";
import PriorityForm from "./priority.comp";
import ReminderForm from "./reminder.comp";

interface Props {
  routine: any;
}

const UpdateForm = ({ routine }: Props) => {
  const [routineCopy, setRoutineCopy] = useState({
    ...routine,
    name: routine.name,
    schedule: routine.schedule,
    startdate: routine.startdate,
    enddate: routine.enddate,
    reminders: [...routine.reminders],
    priority: routine.priority,
    records: [...routine.records],
  });

  const handleStartDateChange = (date: Dayjs) => {
    let updatedRoutine: { [key: string]: any } = { ...routineCopy };
    if (
      date &&
      routineCopy.enddate &&
      date?.startOf("date").valueOf() >
        dayjs(routineCopy.enddate).startOf("date").valueOf()
    ) {
      updatedRoutine.enddate = null;
    }
    updatedRoutine.startdate = date;
    setRoutineCopy(updatedRoutine as RoutineObj);
  };

  const handleEndDateChange = (date: Dayjs) => {
    let updatedRoutine: { [key: string]: any } = { ...routineCopy };
    updatedRoutine.enddate = date;
    setRoutineCopy(updatedRoutine as RoutineObj);
  };
  return (
    <div>
      <h4>this is a updateForm for {routine.name}</h4>
      <div>
        {routine.name} <button>Edit</button>
      </div>
      <DateInput
        value={routine.startdate}
        handleChange={handleStartDateChange}
        label="Start date"
      />
      <DateInput
        value={routine.enddate}
        handleChange={handleEndDateChange}
        label="End date (optional)"
        minDate={dayjs(routine.startdate)}
      />
      <ReminderForm obj={routine} setObj={setRoutineCopy} />
      <PriorityForm obj={routine} setObj={setRoutineCopy} />
      <div>restart record</div>
      <div>delete routine</div>
    </div>
  );
};

export default UpdateForm;
