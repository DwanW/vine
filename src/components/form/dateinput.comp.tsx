import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { ReactElement } from "react";
import { IconContainer } from "../container/common.styles";
import { DateInputContainer } from "./dateinput.styles";

interface Props {
  value: any;
  handleChange: (prop: any) => void;
  label: string;
  minDate?: Date | Dayjs;
}

function DateInput({
  value,
  handleChange,
  label,
  minDate,
}: Props): ReactElement {
  return (
    <DateInputContainer>
      <IconContainer>
        <img src="assets/icon/calendar.svg" alt="calendar icon" />
        <span>{label}</span>
      </IconContainer>
      <DatePicker
        value={value}
        onChange={handleChange}
        renderInput={(props) => <TextField {...props} label="Pick A Date" />}
        showTodayButton
        minDate={minDate ? minDate : dayjs()}
      />
    </DateInputContainer>
  );
}

export default DateInput;
