import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ReactElement } from "react";
import {
  InputContainer,
  InputWithSelectContainer,
  InputWithTextContainer,
} from "../container/common.styles";
import { RoutineObj } from "../../util/types";

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
    <>
      <InputContainer>
        <TextField
          variant="outlined"
          label="Routine"
          name="name"
          value={routine.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </InputContainer>

      {isNumeric && (
        <>
          <InputWithSelectContainer>
            <TextField
              className="first"
              select
              label="Condition"
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
          </InputWithSelectContainer>
          <InputWithTextContainer>
            <TextField
              variant="outlined"
              label="Unit"
              name="unit"
              value={routine.unit !== undefined ? routine.unit : ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <span>a day.</span>
          </InputWithTextContainer>
        </>
      )}
    </>
  );
}

export default RoutineSecondStep;
