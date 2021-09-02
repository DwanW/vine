import styled from "styled-components";

export const TaskFormContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 80vw;

  @media (min-width: 640px) {
    width: 600px;
  }
`;

export const InputContainer = styled.div`
  & .MuiTextField-root {
    width: 100%;
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 1rem 0;

  & .PrivateSwitchBase-root-5 {
    padding: 0;
  }
  & .MuiCheckbox-colorSecondary.Mui-checked {
    color: darkslateblue;
  }
`;
