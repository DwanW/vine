import styled from "styled-components";

export const FormSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80vw;
  min-height: 200px;
  padding: 1rem;

  @media (min-width: 640px) {
    width: 600px;
  }
`;
