import { Dispatch, ReactElement, SetStateAction } from "react";

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
    <div>
      <div>
        <button
          onClick={() => {
            if (value > 1) {
              setValue(value - 1);
            } else {
              setValue(0);
            }
          }}
        >
          -
        </button>
        <input type="number" onChange={handleValueChange} value={value} />
        <button onClick={() => setValue(value + 1)}>+</button>
      </div>
      <div>
        <h4>Goal</h4>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default GoalInput;
