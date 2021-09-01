import SelectButton from "../button/select-button.comp";
import { FormSelectContainer } from "./formselect.styles";

interface Props {
  setFormType: React.Dispatch<React.SetStateAction<"task" | "routine" | "">>;
}

const FormSelect = ({ setFormType }: Props) => {
  return (
    <FormSelectContainer>
      <SelectButton
        onClick={() => setFormType("task")}
        mainText="New Task"
        description="Individual task that you would like to track the completion only."
        src="/assets/icon/task.svg"
      />
      <SelectButton
        onClick={() => setFormType("routine")}
        mainText="New Routine"
        description="Routine you would like to track the progress over some period of time."
        src="/assets/icon/routine.svg"
      />
    </FormSelectContainer>
  );
};

export default FormSelect;
