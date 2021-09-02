import styled from "styled-components";
import { DialogContainer } from "../container/common.styles";

export const ReminderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const ReminderItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.5rem;
  height: 36px;
`;

export const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ReminderPickerContainer = styled(DialogContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
