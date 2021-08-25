import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { useState } from "react";
import { AltStepLabel } from "./routineform.styles";

const steps = [
  "Select Type of Progress",
  "Name your Routine",
  "Select frequency of Routine",
  "Detailed info",
];

interface Props {
  closeForm: Function;
}

export interface RecordObj {
  date: Date;
  value: boolean | number;
}

export interface RoutineObj {
  name: string;
  goal?: string; //'<3' less than three a day, '=3' exactly 3, '>3' at least 3.
  unit?: string;
  schedule: string; // everyday is '1234567', somedays of a week is eg: weekends'17', times per period is eg: 3times per week '3w', per month '3m', repeat eg: every 10 days is 'e10'
  startdate: Date | undefined;
  enddate: Date | undefined;
  reminders: Date[];
  priority: number;
  record: RecordObj[];
}

const RoutineForm = ({ closeForm }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [routine, setRoutine] = useState<RoutineObj>({
    name: "",
    schedule: "",
    startdate: undefined,
    enddate: undefined,
    reminders: [],
    priority: 1,
    record: [],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit routine form here");
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <AltStepLabel>{label}</AltStepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <div>
          <button>With A Yes Or No</button>
          <button>With A Numeric Value</button>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          back
        </button>
        {activeStep === steps.length - 1 ? (
          <input type="submit" value="save" />
        ) : (
          <button type="button" onClick={() => setActiveStep(activeStep + 1)}>
            next
          </button>
        )}
      </div>
    </form>
  );
};

export default RoutineForm;
