import styled from "styled-components";

export const WeekDayCheckBoxContainer = styled.div`
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  & label {
    font-size: 12px;
  }
`;

export const ExpandContainer = styled.div`
  max-height: ${(props: { show: boolean; maxHeight: string }) =>
    props.show ? props.maxHeight : "0px"};
  transition: max-height 0.3s;
  opacity: ${(props: { show: boolean; maxHeight: string }) =>
    props.show ? props.maxHeight : 0};
  transform-origin: top;
  overflow: hidden;
`;
