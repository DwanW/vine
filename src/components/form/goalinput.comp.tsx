import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  ControlContainer,
  GoalDescription,
  GoalDescriptionContainer,
  GoalDescriptionTitle,
  GoalInputContainer,
  GoalInputControl,
  GoalNumInput,
} from "./goalinput.styles";

interface Props {
  handleValueChange: (e: any) => void;
  setValue: Dispatch<SetStateAction<number>>;
  description: string;
  value: number;
}

function GoalInput({
  handleValueChange,
  setValue,
  description,
  value,
}: Props): ReactElement {
  return (
    <GoalInputContainer>
      <ControlContainer>
        <GoalInputControl
          direction="left"
          onClick={() => {
            if (value > 1) {
              setValue(value - 1);
            } else {
              setValue(0);
            }
          }}
        >
          <img src="assets/icon/minus.svg" alt="minus" />
        </GoalInputControl>
        <GoalNumInput
          type="number"
          onChange={handleValueChange}
          value={value}
        />
        <GoalInputControl direction="right" onClick={() => setValue(value + 1)}>
          <img src="assets/icon/plus.svg" alt="plus" />
        </GoalInputControl>
      </ControlContainer>
      <GoalDescriptionContainer>
        <GoalDescriptionTitle>Goal</GoalDescriptionTitle>
        <GoalDescription>{description}</GoalDescription>
      </GoalDescriptionContainer>
    </GoalInputContainer>
  );
}

export default GoalInput;
