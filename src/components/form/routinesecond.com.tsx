import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { ReactElement } from "react";
import { RoutineObj } from "./routineform.comp";

const conditions = [
  { name: "At least", value: ">" },
  { name: "Less than", value: "<" },
  { name: "Exactly", value: "=" },
];

interface Props {
  routine: RoutineObj;
  isNumeric: boolean | undefined;
  handleSelectCondition: (props: any) => void;
  handleGoalChange: (props: any) => void;
  handleChange: (props: any) => void;
}

function RoutineSecondStep({
  routine,
  isNumeric,
  handleSelectCondition,
  handleGoalChange,
  handleChange,
}: Props): ReactElement {
  return (
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
              value={routine.unit !== undefined ? routine.unit : ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <span>a day</span>
          </div>
        </>
      )}
    </div>
  );
}

export default RoutineSecondStep;
