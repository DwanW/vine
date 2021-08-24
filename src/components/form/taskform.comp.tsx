import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import { TaskFormContainer } from "./taskform.styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Dialog from "@material-ui/core/Dialog";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  closeForm: Function;
}

interface TaskObj {
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

  const [isReminderDialogOpen, setReminderDialog] = useState(false);
  const [isUpdateReminderOpen, setUpdateReminder] = useState(false);

  const [isPriorityDialogOpen, setPriorityDialog] = useState(false);

  const [time, setTime] = useState<Date | null | Dayjs>(null);

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

  const changePriority = (value: number) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.priority = value;
    setTask(updatedTask as TaskObj);
    setPriorityDialog(false);
  };

  const addReminder = (time: Date) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.reminders = [...updatedTask.reminders, time];
    setTask(updatedTask as TaskObj);
    setUpdateReminder(false);
    setReminderDialog(true);
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
            name="date"
          />
        </div>
        <div>
          <span>Reminder {task.reminders.length}</span>
          <button type="button" onClick={() => setReminderDialog(true)}>
            Set Reminder
          </button>
          <Dialog
            open={isReminderDialogOpen}
            onClose={() => setReminderDialog(false)}
          >
            {task.reminders.map((date) => dayjs(date).format("HH:mm"))}
            <button
              onClick={() => {
                setReminderDialog(false);
                setUpdateReminder(true);
              }}
            >
              add reminders
            </button>
          </Dialog>
          <Dialog
            open={isUpdateReminderOpen}
            onClose={() => {
              setUpdateReminder(false);
              setReminderDialog(true);
            }}
          >
            <TimePicker
              autoOk
              label="12 hours"
              value={time}
              onChange={(date) => setTime(date)}
            />
            <button
              onClick={() => {
                setUpdateReminder(false);
                setReminderDialog(true);
              }}
            >
              cancel
            </button>
            <button onClick={() => addReminder(time as Date)}>confirm</button>
          </Dialog>
        </div>
        <div>
          <span>Priority: {task.priority}</span>
          <button type="button" onClick={() => setPriorityDialog(true)}>
            Set Priority
          </button>
          <Dialog
            open={isPriorityDialogOpen}
            onClose={() => setPriorityDialog(false)}
          >
            <button onClick={() => changePriority(2)}>high</button>
            <button onClick={() => changePriority(1)}>normal</button>
            <button onClick={() => changePriority(0)}>low</button>
          </Dialog>
        </div>
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
