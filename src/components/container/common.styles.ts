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
  min-width: 100px;
`;

export const FormFlatSubmit = styled.input`
  border: darkslateblue 2px solid;
  background-color: darkslateblue;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  min-width: 100px;
  color: white;
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

export const FormBottomButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 1rem 0;

  @media (min-width: 640px) {
    justify-content: center;

    & input,
    button {
      margin: 0 1rem;
    }
  }
`;

export const DialogContainer = styled.div`
  width: 95vw;
  min-height: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    width: 600px;
  }
`;

export const DialogHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  margin: 0.5rem 0;

  & .MuiTextField-root {
    width: 100%;
  }
`;

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWithSelectContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;

  & .MuiTextField-root {
    flex: 1;
  }

  & .first {
    margin-right: 0.5rem;
  }
`;

export const InputWithTextContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;

  & .MuiTextField-root {
    width: 40%;
    margin-right: 0.5rem;
  }
`;
