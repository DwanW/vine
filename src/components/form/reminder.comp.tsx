import Dialog from "@material-ui/core/Dialog";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { TimePicker } from "@material-ui/pickers";

interface Props {
  obj: any;
  setObj: (props: any) => void;
}

const ReminderForm = ({ obj, setObj }: Props) => {
  const [isReminderDialogOpen, setReminderDialog] = useState(false);
  const [isUpdateReminderOpen, setUpdateReminder] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<null | number>(null);
  const [time, setTime] = useState<Date | null | Dayjs>(null);

  const addReminder = (time: Date) => {
    let updatedObj = { ...obj };
    updatedObj.reminders = [...updatedObj.reminders, time];
    setObj(updatedObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  const updateReminder = (time: Date, index: number) => {
    let updatedObj: { [key: string]: any } = { ...obj };
    updatedObj.reminders[index] = time;
    setObj(updatedObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  const deleteReminder = (idx: number) => {
    let updatedObj: { [key: string]: any } = { ...obj };
    updatedObj.reminders = updatedObj.reminders.filter(
      (reminder: any, index: number) => idx !== index
    );
    setObj(updatedObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  return (
    <div>
      <span>Reminder {obj.reminders.length}</span>
      <button type="button" onClick={() => setReminderDialog(true)}>
        Set Reminder
      </button>
      <Dialog
        open={isReminderDialogOpen}
        onClose={() => setReminderDialog(false)}
      >
        {obj.reminders.map((date: Date, idx: number) => (
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
