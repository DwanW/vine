import { Fragment, ReactElement } from "react";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import dayjs from "dayjs";
import { RoutineObj } from "./routineform.comp";

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
          Every Day
        </label>
      </div>
      <div>
        <div>
          <Radio
            checked={routine.schedule.length > 0 && routine.schedule[0] === "s"}
            onChange={handleChange}
            value="s"
            name="schedule"
            inputProps={{ "aria-label": "some days of the week" }}
          />
          <span>Some days of the week</span>
        </div>
        {routine.schedule.length > 0 && routine.schedule[0] === "s" && (
          <div>
            {"1234567".split("").map((num) => (
              <Fragment key={num}>
                <Checkbox
                  checked={routine.schedule.includes(num)}
                  value={num}
                  onChange={handleCheckBoxChange}
                  inputProps={{ "aria-label": `day checkboxes ${num}` }}
                />
                <span>
                  {dayjs()
                    .day(parseInt(num) - 1)
                    .format("dddd")}
                </span>
              </Fragment>
            ))}
          </div>
        )}
      </div>
      <div>
        <div>
          <Radio
            checked={
              routine.schedule.length > 0 && /[mw]/.test(routine.schedule)
            }
            onChange={handleChange}
            value="1w"
            name="schedule"
            inputProps={{ "aria-label": "some times per period" }}
          />
          <span>Some times per period</span>
        </div>
        {routine.schedule.length > 0 && /[mw]/.test(routine.schedule) && (
          <div>
            <TextField
              variant="filled"
              name="schedule"
              value={parseInt(
                routine.schedule.slice(0, routine.schedule.length - 1)
              )}
              onChange={handlePerPeriodChange}
              inputProps={{ inputMode: "numeric" }}
              autoComplete="off"
            />
            times per
            <TextField
              select
              value={routine.schedule[routine.schedule.length - 1]}
              onChange={handleSelectPerPeriod}
              variant="outlined"
            >
              <MenuItem value={"w"}>Week</MenuItem>
              <MenuItem value={"m"}>Month</MenuItem>
            </TextField>
          </div>
        )}
      </div>
      <div>
        <div>
          <Radio
            checked={routine.schedule.length > 0 && routine.schedule[0] === "e"}
            onChange={handleChange}
            value="e2"
            name="schedule"
            inputProps={{ "aria-label": "repeat over a period" }}
          />
          <span>Repeat</span>
        </div>
        {routine.schedule.length > 0 && routine.schedule[0] === "e" && (
          <div>
            every{" "}
            <TextField
              variant="filled"
              name="schedule"
              value={parseInt(routine.schedule.slice(1))}
              onChange={handleRepeat}
              inputProps={{ inputMode: "numeric" }}
              autoComplete="off"
            />{" "}
            days
          </div>
        )}
      </div>
    </div>
  );
}

export default RoutineThirdStep;
