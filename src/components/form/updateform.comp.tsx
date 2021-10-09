import dayjs, { Dayjs } from "dayjs";
import DateInput from "./dateinput.comp";
import PriorityForm from "./priority.comp";
import ReminderForm from "./reminder.comp";

interface Props {
  routine: any;
}

const UpdateForm = ({ routine }: Props) => {
  const updateStartDate = (date: Dayjs) => {
    // TODO: custom dispatch logic
  };

  const updateEndDate = (date: Dayjs) => {
    // TODO: custom dispatch logic
  };

  const updateReminder = () => {
    // TODO: custom dispatch logic
  };

  const updatePriority = () => {
    // TODO: custom dispatch logic
  };
  return (
    <div>
      <h4>this is a updateForm for {routine.name}</h4>
      <div>
        {routine.name} <button>Edit</button>
      </div>
      <DateInput
        value={routine.startdate}
        handleChange={updateStartDate}
        label="Start date"
      />
      <DateInput
        value={routine.enddate}
        handleChange={updateEndDate}
        label="End date (optional)"
        minDate={dayjs(routine.startdate)}
      />
      <ReminderForm
        reminders={routine.reminders}
        setReminders={updateReminder}
      />
      <PriorityForm obj={routine} setObj={updatePriority} />
      <div>restart record</div>
      <div>delete routine</div>
    </div>
  );
};

export default UpdateForm;
