import Dialog from "@material-ui/core/Dialog";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { TimePicker } from "@material-ui/pickers";
import { TaskObj } from "./taskform.comp";

interface Props {
  task: TaskObj;
  setTask: Dispatch<SetStateAction<TaskObj>>;
}

const ReminderForm = ({ task, setTask }: Props) => {
  const [isReminderDialogOpen, setReminderDialog] = useState(false);
  const [isUpdateReminderOpen, setUpdateReminder] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<null | number>(null);
  const [time, setTime] = useState<Date | null | Dayjs>(null);

  const addReminder = (time: Date) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.reminders = [...updatedTask.reminders, time];
    setTask(updatedTask as TaskObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  const updateReminder = (time: Date, index: number) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.reminders[index] = time;
    setTask(updatedTask as TaskObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  const deleteReminder = (idx: number) => {
    let updatedTask: { [key: string]: any } = { ...task };
    updatedTask.reminders = updatedTask.reminders.filter(
      (reminder: any, index: number) => idx !== index
    );
    setTask(updatedTask as TaskObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  return (
    <div>
      <span>Reminder {task.reminders.length}</span>
      <button type="button" onClick={() => setReminderDialog(true)}>
        Set Reminder
      </button>
      <Dialog
        open={isReminderDialogOpen}
        onClose={() => setReminderDialog(false)}
      >
        {task.reminders.map((date, idx) => (
          <div key={idx}>
            <div>
              {dayjs(date).format("HH:mm")}{" "}
              <span>
                <button
                  onClick={() => {
                    setUpdateIndex(idx);
                    setTime(new Date(date));
                    setReminderDialog(false);
                    setUpdateReminder(true);
                  }}
                >
                  update
                </button>
                <button onClick={() => deleteReminder(idx)}>delete</button>
              </span>
            </div>
          </div>
        ))}
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
        <button
          onClick={() => {
            if (updateIndex === null) {
              addReminder(time as Date);
            } else {
              updateReminder(time as Date, updateIndex);
              setUpdateIndex(null);
            }
          }}
        >
          confirm
        </button>
      </Dialog>
    </div>
  );
};

export default ReminderForm;
