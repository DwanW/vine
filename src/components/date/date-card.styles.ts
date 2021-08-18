import styled from "styled-components";

export const DateCardContainer = styled.div`
  flex: 1;
  padding: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  @media (min-width: 640px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

export const MainDate = styled.div`
  font-size: 2.25rem;
  line-height: 2.5rem;
`;

export const SubDate = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #616161;
`;
