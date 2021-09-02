import styled from "styled-components";

export const IconContainer = styled.span`
  display: flex;
  align-items: center;

  & img {
    margin-right: 0.5rem;
  }
`;

export const FormFlatButton = styled.button`
  border: lightsteelblue 2px solid;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
`;

export const FormCircleButton = styled.button`
  color: darkblue;
  font-weight: 600;
  font-size: 14px;
  background-color: lightsteelblue;
  border: none;
  border-radius: 9999px;
  min-width: 24px;
  cursor: pointer;
`;

export const DialogContainer = styled.div`
  width: 80vw;
  min-height: 200px;
  padding: 1rem;

  @media (min-width: 640px) {
    width: 600px;
  }
`;

export const DialogHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;
