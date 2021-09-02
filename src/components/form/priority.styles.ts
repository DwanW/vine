import styled from "styled-components";
import { FormFlatButton } from "../container/common.styles";

export const PriorityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const PriorityButton = styled(FormFlatButton)`
  min-width: 120px;
`;

export const PriorityButtonGroup = styled.div`
  display: flex;
  margin-top: 50px;
  height: 50px;
  justify-content: space-around;
  align-items: center;

  & button {
    width: 80px;
    height: 80px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    background-color: lightsteelblue;
    border-radius: 9999px;
  }
`;
