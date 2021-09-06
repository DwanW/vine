import { Fragment, ReactElement } from "react";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import dayjs from "dayjs";
import { RoutineObj } from "./routineform.comp";
import {
  ExpandContainer,
  WeekDayCheckBoxContainer,
} from "./routinethird.styles";
import {
  TwoInputWithTextContainer,
  TwoTextWithInputContainer,
} from "../container/common.styles";

interface Props {
  routine: RoutineObj;
  handleChange: (props: any) => void;
  handleCheckBoxChange: (props: any) => void;
  handlePerPeriodChange: (props: any) => void;
  handleSelectPerPeriod: (props: any) => void;
  handleRepeat: (props: any) => void;
}

function RoutineThirdStep({
  routine,
  handleChange,
  handleCheckBoxChange,
  handlePerPeriodChange,
  handleSelectPerPeriod,
  handleRepeat,
}: Props): ReactElement {
  return (
    <div>
      <div>
        <label>
          <Radio
            checked={routine.schedule === "1234567"}
            onChange={handleChange}
            value="1234567"
            name="schedule"
            inputProps={{ "aria-label": "everyday" }}
          />
          EveryDay
        </label>
      </div>
      <div>
        <label>
          <Radio
            checked={routine.schedule.length > 0 && routine.schedule[0] === "s"}
            onChange={handleChange}
            value="s"
            name="schedule"
            inputProps={{ "aria-label": "some days of the week" }}
          />
          Some days of the week
        </label>
        <ExpandContainer
          show={routine.schedule.length > 0 && routine.schedule[0] === "s"}
          maxHeight="150px"
        >
          <WeekDayCheckBoxContainer>
            {"1234567".split("").map((num) => (
              <Fragment key={num}>
                <label>
                  <Checkbox
                    checked={routine.schedule.includes(num)}
                    value={num}
                    onChange={handleCheckBoxChange}
                    inputProps={{ "aria-label": `day checkboxes ${num}` }}
                  />
                  {dayjs()
                    .day(parseInt(num) - 1)
                    .format("dddd")}
                </label>
              </Fragment>
            ))}
          </WeekDayCheckBoxContainer>
        </ExpandContainer>
      </div>

      <div>
        <label>
          <Radio
            checked={
              routine.schedule.length > 0 && /[mw]/.test(routine.schedule)
            }
            onChange={handleChange}
            value="1w"
            name="schedule"
            inputProps={{ "aria-label": "some times per period" }}
          />
          Some times per period
        </label>
        <ExpandContainer
          show={routine.schedule.length > 0 && /[mw]/.test(routine.schedule)}
          maxHeight="150px"
        >
          <TwoInputWithTextContainer>
            <TextField
              variant="filled"
              name="schedule"
              value={
                routine.schedule.length > 0 && /[mw]/.test(routine.schedule)
                  ? parseInt(
                      routine.schedule.slice(0, routine.schedule.length - 1)
                    )
                  : 1
              }
              onChange={handlePerPeriodChange}
              inputProps={{ inputMode: "numeric" }}
              autoComplete="off"
            />
            <span>times per</span>
            <TextField
              select
              value={
                routine.schedule.length > 0 && /[mw]/.test(routine.schedule)
                  ? routine.schedule[routine.schedule.length - 1]
                  : "w"
              }
              onChange={handleSelectPerPeriod}
              variant="outlined"
            >
              <MenuItem value={"w"}>Week</MenuItem>
              <MenuItem value={"m"}>Month</MenuItem>
            </TextField>
          </TwoInputWithTextContainer>
        </ExpandContainer>
      </div>
      <div>
        <label>
          <Radio
            checked={routine.schedule.length > 0 && routine.schedule[0] === "e"}
            onChange={handleChange}
            value="e2"
            name="schedule"
            inputProps={{ "aria-label": "repeat over a period" }}
          />
          Repeat
        </label>
        <ExpandContainer
          show={routine.schedule.length > 0 && routine.schedule[0] === "e"}
          maxHeight="150px"
        >
          <TwoTextWithInputContainer>
            <span>Every</span>
            <TextField
              variant="filled"
              name="schedule"
              value={
                routine.schedule.length > 0 && routine.schedule[0] === "e"
                  ? parseInt(routine.schedule.slice(1))
                  : 2
              }
              onChange={handleRepeat}
              inputProps={{ inputMode: "numeric" }}
              autoComplete="off"
            />
            <span>days.</span>
          </TwoTextWithInputContainer>
        </ExpandContainer>
      </div>
    </div>
  );
}

export default RoutineThirdStep;
