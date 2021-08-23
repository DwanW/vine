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

const RoutineForm = ({ closeForm }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit routine form here");
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      this is routine form
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <AltStepLabel>{label}</AltStepLabel>
          </Step>
        ))}
      </Stepper>
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
    </form>
  );
};

export default RoutineForm;
