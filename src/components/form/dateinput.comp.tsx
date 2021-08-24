import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { TaskObj } from "./taskform.comp";

interface Props {
  task: TaskObj;
  setTask: Dispatch<SetStateAction<TaskObj>>;
}

function DateInput({ task, setTask }: Props): ReactElement {
  const handleDateChange = (date: MaterialUiPickersDate) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.date = date;
    setTask(updatedTask as TaskObj);
  };
  return (
    <div>
      <span>Start Date</span>
      <DatePicker
        value={task.date}
        onChange={handleDateChange}
        showTodayButton
      />
    </div>
  );
}

export default DateInput;
