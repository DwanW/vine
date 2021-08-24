import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import { TaskFormContainer } from "./taskform.styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import ReminderForm from "./reminder.comp";
import PriorityForm from "./priority.comp";

interface Props {
  closeForm: Function;
}

export interface TaskObj {
  name: string;
  date: Date | undefined;
  reminders: Date[];
  priority: number;
  required: boolean;
}

const TaskForm = ({ closeForm }: Props) => {
  const [task, setTask] = useState<TaskObj>({
    name: "",
    date: undefined,
    reminders: [],
    priority: 1,
    required: true,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("this submit task form");
    let id = v4();
    let submitTask = {
      id,
      ...task,
    };
    console.log(submitTask);
    closeForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask[e.target.name] = e.target.value;
    setTask(updatedTask as TaskObj);
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.date = date;
    setTask(updatedTask as TaskObj);
  };

  const handleRequireCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.required = event.target.checked;
    setTask(updatedTask as TaskObj);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TaskFormContainer>
        <div>
          <TextField
            variant="outlined"
            label="Task"
            name="name"
            value={task.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div>
          <span>Start Date</span>
          <DatePicker
            value={task.date}
            onChange={handleDateChange}
            showTodayButton
          />
        </div>
        <ReminderForm task={task} setTask={setTask} />
        <PriorityForm task={task} setTask={setTask} />
        <div>
          <label>
            Required
            <Checkbox
              checked={task.required}
              onChange={handleRequireCheckBox}
              name="required"
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={() => closeForm()}>
            cancel
          </button>
          <input type="submit" value="Save" />
        </div>
      </TaskFormContainer>
    </form>
  );
};

export default TaskForm;
