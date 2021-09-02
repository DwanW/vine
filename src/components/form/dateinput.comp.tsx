import { DatePicker } from "@material-ui/pickers";
import { ReactElement } from "react";
import { IconContainer } from "../container/common.styles";
import { DateInputContainer } from "./dateinput.styles";

interface Props {
  value: any;
  handleChange: (prop: any) => void;
  label: string;
}

function DateInput({ value, handleChange, label }: Props): ReactElement {
  return (
    <DateInputContainer>
      <IconContainer>
        <img src="assets/icon/calendar.svg" alt="calendar icon" />
        <span>{label}</span>
      </IconContainer>
      <DatePicker value={value} onChange={handleChange} showTodayButton />
    </DateInputContainer>
  );
}

export default DateInput;
