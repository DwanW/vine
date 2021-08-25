import { DatePicker } from "@material-ui/pickers";
import { ReactElement } from "react";

interface Props {
  value: any;
  handleChange: (prop: any) => void;
  label: string;
}

function DateInput({ value, handleChange, label }: Props): ReactElement {
  return (
    <div>
      <span>{label}</span>
      <DatePicker value={value} onChange={handleChange} showTodayButton />
    </div>
  );
}

export default DateInput;
