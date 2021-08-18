import { ReactElement } from "react";
import AuthComp from "../auth/auth.comp";
import DateCard from "../date/date-card.comp";
import { MainNav, LogoContainer } from "./nav.styles";

export default function Nav(): ReactElement {
  return (
    <MainNav>
      <LogoContainer to="/">
        <img src="assets/logo/logo_transparent.png" alt="site-logo" />
      </LogoContainer>
      <DateCard />
      <AuthComp />
    </MainNav>
  );
}
