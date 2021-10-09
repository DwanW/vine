import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { CheckboxContainer, TaskFormContainer } from "./taskform.styles";
import ReminderForm from "./reminder.comp";
import PriorityForm from "./priority.comp";
import DateInput from "./dateinput.comp";
import dayjs, { Dayjs } from "dayjs";
import {
  FormBottomButtonGroup,
  FormFlatButton,
  FormFlatSubmit,
  IconContainer,
  InputContainer,
} from "../container/common.styles";
import { useAppDispatch } from "../../util/hooks";
import { openSnackBar } from "../../redux/feedback/feedback.slice";
import { addTask } from "../../redux/user/user.slice";

interface Props {
  closeForm: Function;
}

export interface TaskObj {
  name: string;
  date: Date | Dayjs | null;
  reminders: Date[];
  priority: number;
  required: boolean;
  isCompleted: boolean;
  completionDate: undefined | Dayjs | Date;
}

const TaskForm = ({ closeForm }: Props) => {
  const [task, setTask] = useState<TaskObj>({
    name: "",
    date: dayjs(),
    reminders: [],
    priority: 1,
    required: true,
    isCompleted: false,
    completionDate: undefined,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.name.length === 0) {
      dispatch(openSnackBar("Please name your task"));
      return;
    }

    let id = v4();
    let newTask = {
      id,
      ...task,
      createdAt: new Date(),
    };
    dispatch(addTask(newTask));
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

  const handleDateChange = (date: Dayjs) => {
    const now = dayjs().startOf("date");
    if (date && date.startOf("date").valueOf() < now.valueOf()) {
      dispatch(openSnackBar("Please select a valid date"));
      return;
    }

    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.date = date;
    setTask(updatedTask as TaskObj);
  };

  const handleRemindersChange = (reminders: any[]) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.reminders = reminders;
    setTask(updatedTask as TaskObj);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <ReminderForm
          reminders={task.reminders}
          setReminders={handleRemindersChange}
        />
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
        <FormBottomButtonGroup>
          <FormFlatButton type="button" onClick={() => closeForm()}>
            cancel
          </FormFlatButton>
          <FormFlatSubmit type="submit" value="Save" />
        </FormBottomButtonGroup>
      </TaskFormContainer>
    </form>
  );
};

export default TaskForm;
