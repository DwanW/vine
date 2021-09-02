import { DatePicker } from "@material-ui/pickers";
import { ReactElement } from "react";
import { DateInputContainer } from "./dateinput.styles";

interface Props {
  value: any;
  handleChange: (prop: any) => void;
  label: string;
}

function DateInput({ value, handleChange, label }: Props): ReactElement {
  return (
    <DateInputContainer>
      <span>{label}</span>
      <DatePicker value={value} onChange={handleChange} showTodayButton />
    </DateInputContainer>
  );
}

export default DateInput;
