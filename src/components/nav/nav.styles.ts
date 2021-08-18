import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainNav = styled.nav`
  display: flex;
  padding: 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-family: "Open Sans", sans-serif;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #f5f5f5;
`;

export const LogoContainer = styled(Link)`
  width: 144px;
  height: 100px;
  overflow: hidden;
  display: inline-block;

  img {
    width: 230%;
    height: 120%;
    object-position: center;
    object-fit: cover;

    @media (min-width: 640px) {
      width: 135%;
    }
  }
`;
