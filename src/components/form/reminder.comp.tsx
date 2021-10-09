import Dialog from "@mui/material/Dialog";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import TimePicker from "@mui/lab/TimePicker";
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
import { useAppDispatch } from "../../util/hooks";
import { openSnackBar } from "../../redux/feedback/feedback.slice";
import { TextField } from "@mui/material";

interface Props {
  reminders: any[];
  setReminders: (props: any) => void;
}

const ReminderForm = ({ reminders, setReminders }: Props) => {
  const [isReminderDialogOpen, setReminderDialog] = useState(false);
  const [isUpdateReminderOpen, setUpdateReminder] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<null | number>(null);
  const [time, setTime] = useState<Date | null | Dayjs>(null);

  const dispatch = useAppDispatch();

  const addReminder = (time: Date) => {
    let updatedReminders = [...reminders];
    let isRepeat = updatedReminders
      .map((reminder: Date) => dayjs(reminder).format("HH:mm"))
      .includes(dayjs(time).format("HH:mm"));

    if (time === null) {
      dispatch(openSnackBar("Please select a time"));
      return;
    }
    if (isRepeat) {
      dispatch(openSnackBar("Selected time already exist"));
      return;
    }
    updatedReminders = [...updatedReminders, time];
    setReminders(updatedReminders);
    setUpdateReminder(false);
    setReminderDialog(true);
  };

  const updateReminder = (time: Date, index: number) => {
    let updatedReminders = [...reminders];
    let isRepeat = updatedReminders
      .map((reminder: Date) => dayjs(reminder).format("HH:mm"))
      .includes(dayjs(time).format("HH:mm"));
    if (isRepeat) {
      dispatch(openSnackBar("Selected time already exist"));
      return;
    }

    updatedReminders[index] = time;
    setReminders(updatedReminders);
    setUpdateReminder(false);
    setReminderDialog(true);
    setUpdateIndex(null);
  };

  const deleteReminder = (idx: number) => {
    let updatedReminders = [...reminders];
    updatedReminders = updatedReminders.filter(
      (reminder: any, index: number) => idx !== index
    );
    setReminders(updatedReminders);
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
        {reminders.length}
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
          {reminders.map((date: Date, idx: number) => (
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
          <TimePicker
            label="12 hours"
            value={time}
            onChange={(date) => setTime(date)}
            renderInput={(props) => <TextField {...props} />}
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
