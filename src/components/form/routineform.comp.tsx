import Step from "@material-ui/core/Step";
import { useState } from "react";
import { AltStepLabel, RoutineStepperContainer } from "./routineform.styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import RoutineFirstStep from "./routinefirst.comp";
import RoutineSecondStep from "./routinesecond.com";
import RoutineThirdStep from "./routinethird.comp";
import RoutineLastStep from "./routinelast.comp";
import {
  DialogContainer,
  FormBottomButtonGroup,
  FormFlatButton,
  FormFlatSubmit,
} from "../container/common.styles";
import Stepper from "@material-ui/core/Stepper";
import { useAppDispatch } from "../../util/hooks";
import { openSnackBar } from "../../redux/feedback/feedback.slice";
import dayjs, { Dayjs } from "dayjs";
import { addRoutine } from "../../redux/user/user.slice";
import { v4 } from "uuid";

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
  goal?: string | undefined; //'<3' less than three a day, '=3' exactly 3, '>3' at least 3.
  unit?: string;
  schedule: string; // everyday is '1234567', somedays of a week is eg: weekends's17', times per period is eg: 3times per week '3w', per month '3m', repeat eg: every 10 days is 'e10'
  startdate: Date | Dayjs | null;
  enddate: Date | null;
  reminders: Date[];
  priority: number;
  record: RecordObj[];
}

const RoutineForm = ({ closeForm }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [routine, setRoutine] = useState<RoutineObj>({
    name: "",
    schedule: "1234567",
    startdate: dayjs(),
    enddate: null,
    reminders: [],
    priority: 1,
    record: [],
  });

  const dispatch = useAppDispatch();

  const [isNumeric, setIsNumeric] = useState<boolean | undefined>(undefined);

  const handleBack = () => {
    if (activeStep === 1) {
      setIsNumeric(undefined);
    }
    setActiveStep(activeStep - 1);
  };

  const handleForward = () => {
    if (activeStep === 1 && routine.name === "") {
      dispatch(openSnackBar("Please choose a name"));
      return;
    }
    if (
      activeStep === 1 &&
      isNumeric &&
      (routine.goal === undefined ||
        (routine.goal.length === 2 && routine.goal[1] === "0"))
    ) {
      dispatch(openSnackBar("Please set a goal"));
      return;
    }

    if (activeStep === 2 && routine.schedule === "s") {
      dispatch(openSnackBar("Please select at least one day"));
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let id = v4();
    let newRoutine = {
      id,
      ...routine,
      createdAt: new Date(),
    };
    dispatch(addRoutine(newRoutine));
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
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) < 0) {
      return;
    }

    let updatedRoutine: { [key: string]: any } = { ...routine };

    if (updatedRoutine.goal === undefined) {
      // set default condition with initial change
      updatedRoutine.goal = `>${e.target.value}`;
    } else {
      updatedRoutine.goal = `${updatedRoutine.goal[0]}${e.target.value}`;
    }
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    if (!e.target.checked) {
      updatedRoutine.schedule = updatedRoutine.schedule
        .split("")
        .filter((value: string) => value !== e.target.value)
        .join("");
    } else {
      updatedRoutine.schedule = `${updatedRoutine.schedule}${e.target.value}`;
    }
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handlePerPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value))) return;
    let updatedRoutine: { [key: string]: any } = { ...routine };
    updatedRoutine.schedule = `${e.target.value}${
      updatedRoutine.schedule[updatedRoutine.schedule.length - 1]
    }`;
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleSelectPerPeriod = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    if (updatedRoutine.schedule.includes(e.target.value)) {
      return;
    }
    updatedRoutine.schedule = `${updatedRoutine.schedule.slice(
      0,
      updatedRoutine.schedule.length - 1
    )}${e.target.value}`;
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 2 || isNaN(parseInt(e.target.value))) return;
    let updatedRoutine: { [key: string]: any } = { ...routine };
    updatedRoutine.schedule = `e${e.target.value}`;
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    if (
      date &&
      routine.enddate &&
      date?.startOf("date").valueOf() >
        dayjs(routine.enddate).startOf("date").valueOf()
    ) {
      updatedRoutine.enddate = null;
    }
    updatedRoutine.startdate = date;
    setRoutine(updatedRoutine as RoutineObj);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    let updatedRoutine: { [key: string]: any } = { ...routine };
    updatedRoutine.enddate = date;
    setRoutine(updatedRoutine as RoutineObj);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogContainer>
        <RoutineStepperContainer>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <AltStepLabel>{label}</AltStepLabel>
              </Step>
            ))}
          </Stepper>
        </RoutineStepperContainer>

        {activeStep === 0 && (
          <RoutineFirstStep
            setActiveStep={setActiveStep}
            setIsNumeric={setIsNumeric}
            activeStep={activeStep}
          />
        )}

        {activeStep === 1 && (
          <RoutineSecondStep
            routine={routine}
            isNumeric={isNumeric}
            handleSelectCondition={handleSelectCondition}
            handleGoalChange={handleGoalChange}
            handleChange={handleChange}
          />
        )}

        {activeStep === 2 && (
          <RoutineThirdStep
            routine={routine}
            handleChange={handleChange}
            handleCheckBoxChange={handleCheckBoxChange}
            handlePerPeriodChange={handlePerPeriodChange}
            handleSelectPerPeriod={handleSelectPerPeriod}
            handleRepeat={handleRepeat}
          />
        )}

        {activeStep === 3 && (
          <RoutineLastStep
            routine={routine}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            setRoutine={setRoutine}
          />
        )}

        {activeStep !== 0 && (
          <FormBottomButtonGroup>
            <FormFlatButton
              type="button"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              back
            </FormFlatButton>
            {activeStep === steps.length - 1 ? (
              <FormFlatSubmit type="submit" value="save" />
            ) : (
              <FormFlatButton type="button" onClick={handleForward}>
                next
              </FormFlatButton>
            )}
          </FormBottomButtonGroup>
        )}
      </DialogContainer>
    </form>
  );
};

export default RoutineForm;
