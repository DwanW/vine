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

export const ItemHeader = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`;

export const ItemSubInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #757575;
  text-transform: capitalize;
`;

export const StatsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

export const Bar = styled.div`
  width: 20px;
  height: auto;
  border-left: 12px solid #b2ebf2;
  border-bottom: 2px solid #b2ebf2;
`;

export const StatsInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #424242;
  text-transform: capitalize;
`;

export const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const MenuButton = styled.div`
  display: flex;
  align-items: center;

  & img {
    margin-right: 0.5rem;
  }
`;
