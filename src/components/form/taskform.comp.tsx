import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import {
  CheckboxContainer,
  InputContainer,
  TaskFormContainer,
} from "./taskform.styles";
import ReminderForm from "./reminder.comp";
import PriorityForm from "./priority.comp";
import DateInput from "./dateinput.comp";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs, { Dayjs } from "dayjs";
import SnackBar from "@material-ui/core/Snackbar";
import { IconContainer } from "../container/common.styles";

interface Props {
  closeForm: Function;
}

export interface TaskObj {
  name: string;
  date: Date | Dayjs | undefined;
  reminders: Date[];
  priority: number;
  required: boolean;
}

const TaskForm = ({ closeForm }: Props) => {
  const [task, setTask] = useState<TaskObj>({
    name: "",
    date: dayjs(),
    reminders: [],
    priority: 1,
    required: true,
  });

  // snackbar state
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.name.length === 0) {
      setSnackBarOpen(true);
      setSnackMessage("Please name your task");
      return;
    }

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
      <SnackBar
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        message={snackMessage}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
      <TaskFormContainer>
        <InputContainer>
          <TextField
            variant="outlined"
            label="Task"
            name="name"
            value={task.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </InputContainer>
        <DateInput
          value={task.date}
          handleChange={handleDateChange}
          label="Start Date"
        />
        <ReminderForm obj={task} setObj={setTask} />
        <PriorityForm obj={task} setObj={setTask} />

        <CheckboxContainer>
          <IconContainer>
            <img src="assets/icon/required.svg" alt="required" />
            <span>Required</span>
          </IconContainer>
          <Checkbox
            checked={task.required}
            onChange={handleRequireCheckBox}
            name="required"
          />
        </CheckboxContainer>
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
