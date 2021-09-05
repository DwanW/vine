import Dialog from "@material-ui/core/Dialog";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import SnackBar from "@material-ui/core/Snackbar";
import { TimePicker } from "@material-ui/pickers";
import {
  ButtonGroupContainer,
  ReminderContainer,
  ReminderDialogContainer,
  ReminderItemContainer,
  ReminderPickerContainer,
} from "./reminder.styles";
import {
  DialogHeader,
  FormCircleButton,
  FormFlatButton,
  IconContainer,
} from "../container/common.styles";

interface Props {
  obj: any;
  setObj: (props: any) => void;
}

const ReminderForm = ({ obj, setObj }: Props) => {
  const [isReminderDialogOpen, setReminderDialog] = useState(false);
  const [isUpdateReminderOpen, setUpdateReminder] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<null | number>(null);
  const [time, setTime] = useState<Date | null | Dayjs>(null);
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState("");

  const addReminder = (time: Date) => {
    let updatedObj = { ...obj };
    let isRepeat = updatedObj.reminders
      .map((reminder: Date) => dayjs(reminder).format("HH:mm"))
      .includes(dayjs(time).format("HH:mm"));

    if (time === null) {
      setSnackMessage("Please select a time");
      setSnackBarOpen(true);
      return;
    }
    if (isRepeat) {
      setSnackMessage("Selected time already exist");
      setSnackBarOpen(true);
      return;
    }
    updatedObj.reminders = [...updatedObj.reminders, time];
    setObj(updatedObj);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  const updateReminder = (time: Date, index: number) => {
    let updatedObj: { [key: string]: any } = { ...obj };
    let isRepeat = updatedObj.reminders
      .map((reminder: Date) => dayjs(reminder).format("HH:mm"))
      .includes(dayjs(time).format("HH:mm"));
    if (isRepeat) {
      setSnackMessage("Selected time already exist");
      setSnackBarOpen(true);
      return;
    }

    updatedObj.reminders[index] = time;
    setObj(updatedObj);
    setUpdateReminder(false);
    setReminderDialog(true);
    setUpdateIndex(null);
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
    <ReminderContainer>
      <IconContainer>
        <img src="assets/icon/bell.svg" alt="notification bell" />
        <span>Reminder</span>
      </IconContainer>
      <FormCircleButton type="button" onClick={() => setReminderDialog(true)}>
        {obj.reminders.length}
      </FormCircleButton>
      <Dialog
        open={isReminderDialogOpen}
        onClose={() => {
          setReminderDialog(false);
          setUpdateIndex(null);
        }}
      >
        <ReminderDialogContainer>
          <DialogHeader>Reminder Notifications</DialogHeader>
          {obj.reminders.map((date: Date, idx: number) => (
            <ReminderItemContainer key={idx}>
              <FormCircleButton
                onClick={() => {
                  setUpdateIndex(idx);
                  setTime(new Date(date));
                  setReminderDialog(false);
                  setUpdateReminder(true);
                }}
              >
                <img src="assets/icon/edit.svg" alt="edit button" />
              </FormCircleButton>
              <span>{dayjs(date).format("HH:mm")}</span>
              <FormCircleButton onClick={() => deleteReminder(idx)}>
                <img src="assets/icon/delete.svg" alt="delete button" />
              </FormCircleButton>
            </ReminderItemContainer>
          ))}
          <ButtonGroupContainer>
            <FormFlatButton
              onClick={() => {
                setReminderDialog(false);
                setUpdateReminder(true);
                setUpdateIndex(null);
              }}
            >
              New reminder
            </FormFlatButton>
          </ButtonGroupContainer>
        </ReminderDialogContainer>
      </Dialog>
      <Dialog
        open={isUpdateReminderOpen}
        onClose={() => {
          setUpdateReminder(false);
          setReminderDialog(true);
        }}
      >
        <ReminderPickerContainer>
          <DialogHeader>
            {updateIndex !== null ? "Update" : "New"} Reminder
          </DialogHeader>
          <SnackBar
            open={snackBarOpen}
            onClose={() => setSnackBarOpen(false)}
            message={snackMessage}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            autoHideDuration={2000}
          />
          <TimePicker
            autoOk
            label="12 hours"
            value={time}
            onChange={(date) => setTime(date)}
          />
          <ButtonGroupContainer>
            <FormFlatButton
              onClick={() => {
                setUpdateReminder(false);
                setReminderDialog(true);
              }}
            >
              cancel
            </FormFlatButton>
            <FormFlatButton
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
            </FormFlatButton>
          </ButtonGroupContainer>
        </ReminderPickerContainer>
      </Dialog>
    </ReminderContainer>
  );
};

export default ReminderForm;
