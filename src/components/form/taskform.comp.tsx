import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { TaskFormContainer } from "./taskform.styles";
import ReminderForm from "./reminder.comp";
import PriorityForm from "./priority.comp";
import DateInput from "./dateinput.comp";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

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
    let id = v4();
    let submitTask = {
      id,
      ...task,
      createdAt: new Date(),
    };
    console.log(submitTask);
    closeForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask[e.target.name] = e.target.value;
    setTask(updatedTask as TaskObj);
  };

  const handleRequireCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.required = event.target.checked;
    setTask(updatedTask as TaskObj);
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.date = date;
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
        <DateInput
          value={task.date}
          handleChange={handleDateChange}
          label="Start Date"
        />
        <ReminderForm obj={task} setObj={setTask} />
        <PriorityForm obj={task} setObj={setTask} />
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
