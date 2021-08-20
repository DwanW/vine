import styled from "styled-components";

export const TriggerContainer = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 50px;
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 640px) {
    width: 144px;
    height: 100vh;
    padding: 1.5rem;
    border-left: 1px aqua solid;
    right: 10px;
    bottom: auto;
  }
`;
