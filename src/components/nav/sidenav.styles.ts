import styled from "styled-components";

export const SideNavContainer = styled.aside`
  position: fixed;
  max-width: 100vw;
  bottom: 0;
  border-top: 1px aqua solid;

  @media (min-width: 640px) {
    max-width: 144px;
    padding: 1.5rem;
    left: 10px;
    bottom: auto;
    border-right: 1px aqua solid;
    border-top: none;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100vw;
  display: flex;
  font-size: 0.75rem;
  line-height: 1rem;
  justify-content: space-around;

  @media (min-width: 640px) {
    width: auto;
    min-height: 100vh;
    flex-direction: column;
    justify-content: start;
  }
`;

export const NavListItem = styled.li`
  padding: 0.5rem 1rem;
`;
