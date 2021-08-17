import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainNav = styled.nav`
  display: flex;
  padding: 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-family: "Open Sans", sans-serif;
`;

export const LogoContainer = styled(Link)`
  width: 144px;

  img {
    width: 100%;
    height: 100%;
  }
`;
