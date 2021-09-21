import styled from "styled-components";

export const GoalInputContainer = styled.div``;

export const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const GoalInputControl = styled.button`
  height: 75px;
  width: 75px;
  border-radius: ${(props: { direction: string }) =>
    props.direction === "left" ? "9999px 0 0 9999px" : "0 9999px 9999px 0"};
  border: none;
  background-color: #17c7a1;
  cursor: pointer;
  font-size: 3.75rem;
  line-height: 1;
  color: white;
  display: flex;
  align-items: center;
`;

export const GoalNumInput = styled.input`
  font-size: 3.75rem;
  line-height: 1;
  text-align: center;
  width: 180px;
  -moz-appearance: textfield;
  border: none;
  outline: none;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GoalDescriptionContainer = styled.div`
  margin-top: 2rem;
`;

export const GoalDescriptionTitle = styled.div`
  text-align: center;
  font-weight: 600;
  color: gray;
`;

export const GoalDescription = styled.div`
  text-transform: capitalize;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
