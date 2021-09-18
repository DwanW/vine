import styled from "styled-components";
import { DialogContainer } from "../container/common.styles";

export const TaskFormContainer = styled(DialogContainer)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  @media (min-width: 640px) {
    width: 600px;
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 1rem 0;
`;
