import { FormSelectContainer } from "./formselect.styles";

interface Props {
  setFormType: React.Dispatch<React.SetStateAction<"task" | "routine" | "">>;
}

const FormSelect = ({ setFormType }: Props) => {
  return (
    <FormSelectContainer>
      <button onClick={() => setFormType("task")}>New Task</button>
      <button onClick={() => setFormType("routine")}>New Routine</button>
    </FormSelectContainer>
  );
};

export default FormSelect;
