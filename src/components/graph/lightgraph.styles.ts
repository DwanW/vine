import styled from "styled-components";

export const LightGraphContainer = styled.div`
  display: flex;
  font-size: 0.75rem;
  line-height: 1rem;
  justify-content: center;
  background-color: #eeeeee;
  color: black;
  padding: 2rem 0;
  border-radius: 10px;
  margin-bottom: 4rem;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.25rem;

  @media (min-width: 1280px) {
    margin: 0 1rem;
  }
`;

interface LightProps {
  lightOn: boolean;
}

export const Light = styled.div<LightProps>`
  height: 0.65rem;
  width: 0.65rem;
  border: ${(props) => (props.lightOn ? "none" : "1px solid #9e9e9e")};
  margin: 0.5rem 0;
  border-radius: 9999px;
  background: ${(props) =>
    props.lightOn ? "radial-gradient(#fff, #76ff03, #c5e1a5)" : "none"};
  box-shadow: ${(props) =>
    props.lightOn ? "0 0 4px 2px #76ff03, 0 0 6px 3px #c5e1a5" : "none"};

  @media (min-width: 1280px) {
    height: 1rem;
    width: 1rem;
    margin: 0.65rem 0;
    box-shadow: ${(props) =>
      props.lightOn ? "0 0 8px 4px #76ff03, 0 0 12px 6px #c5e1a5" : "none"};
  }
`;
