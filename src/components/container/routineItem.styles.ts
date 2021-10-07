import styled from "styled-components";

export const RoutineItemContainer = styled.div`
  min-height: 100px;
  padding: 1rem;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const LightBar = styled.div`
  border: 3px solid skyblue;
  border-radius: 3px;
  margin: 0 0 0.5rem 0;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
