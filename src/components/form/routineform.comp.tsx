import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { useState } from "react";
import { AltStepLabel } from "./routineform.styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";

const steps = [
  "Select Type of Progress",
  "Name your Routine",
  "Select frequency of Routine",
  "Detailed info",
];

const conditions = [
  { name: "At least", value: ">" },
  { name: "Less than", value: "<" },
  { name: "Exactly", value: "=" },
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
  goal?: string | undefined; //'<3' less than three a day, '=3' exactly 3, '>3' at least 3.
  unit?: string;
  schedule: string; // everyday is '1234567', somedays of a week is eg: weekends's17', times per period is eg: 3times per week '3w', per month '3m', repeat eg: every 10 days is 'e10'
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
    schedule: "1234567",
    startdate: undefined,
    enddate: undefined,
    reminders: [],
    priority: 1,
    record: [],
  });

  const [isNumeric, setIsNumeric] = useState<boolean | undefined>(undefined);

  const handleBack = () => {
    if (activeStep === 1) {
      setIsNumeric(undefined);
    }
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit routine form here");
    closeForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    updatedRoutine[e.target.name] = e.target.value;
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleSelectCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    if (updatedRoutine.goal === undefined || updatedRoutine.goal.length < 2) {
      updatedRoutine.goal = e.target.value;
    } else {
      updatedRoutine.goal = `${e.target.value}${updatedRoutine.goal.slice(1)}`;
    }
    console.log(updatedRoutine.goal);
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    if (updatedRoutine.goal === undefined) {
      // set default condition with initial change
      updatedRoutine.goal = `>${e.target.value}`;
    } else {
      updatedRoutine.goal = `${updatedRoutine.goal[0]}${e.target.value}`;
    }
    console.log(updatedRoutine.goal);
    setRoutine(updatedRoutine as RoutineObj);
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
          <button
            onClick={() => {
              setIsNumeric(false);
              setActiveStep(activeStep + 1);
            }}
          >
            With A Yes Or No
          </button>
          <button
            onClick={() => {
              setIsNumeric(true);
              setActiveStep(activeStep + 1);
            }}
          >
            With A Numeric Value
          </button>
        </div>
      )}

      {activeStep === 1 && (
        <div>
          <div>
            <TextField
              variant="outlined"
              label="Routine"
              name="name"
              value={routine.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {isNumeric && (
            <>
              <div>
                <TextField
                  select
                  value={routine.goal !== undefined ? routine.goal[0] : ">"}
                  onChange={handleSelectCondition}
                  variant="outlined"
                >
                  {conditions.map((condition) => (
                    <MenuItem key={condition.name} value={condition.value}>
                      {condition.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  label="Goal"
                  name="goal"
                  type="number"
                  value={
                    routine.goal === undefined || routine.goal.length === 1
                      ? 0
                      : Number(routine.goal.slice(1))
                  }
                  onChange={handleGoalChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="Unit"
                  name="unit"
                  value={routine.unit}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span>a day</span>
              </div>
            </>
          )}
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <div>
            <Radio
              checked={routine.schedule === "1234567"}
              onChange={handleChange}
              value="1234567"
              name="step3"
              inputProps={{ "aria-label": "everyday" }}
            />
            <span>EveryDay</span>
          </div>
          <div>
            <Radio
              checked={
                routine.schedule.length > 0 && routine.schedule[0] === "s"
              }
              onChange={handleChange}
              value="s"
              name="step3"
              inputProps={{ "aria-label": "some days of the week" }}
            />
            <span>Some days of the week</span>
          </div>
          <div>
            <Radio
              checked={
                routine.schedule.length > 0 && /[mn]/.test(routine.schedule)
              }
              onChange={handleChange}
              value="1w"
              name="step3"
              inputProps={{ "aria-label": "some times per period" }}
            />
            <span>Some times per period</span>
          </div>
          <div>
            <Radio
              checked={
                routine.schedule.length > 0 && routine.schedule[0] === "e"
              }
              onChange={handleChange}
              value="e2"
              name="step3"
              inputProps={{ "aria-label": "repeat over a period" }}
            />
            <span>Repeat</span>
          </div>
        </div>
      )}

      {activeStep === 3 && <div>forth step</div>}

      {activeStep !== 0 && (
        <div>
          <button
            type="button"
            onClick={handleBack}
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
      )}
    </form>
  );
};

export default RoutineForm;
