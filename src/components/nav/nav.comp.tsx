import { ReactElement } from "react";
import { MainNav, LogoContainer } from "./nav.styles";


interface Props {}

export default function Nav({}: Props): ReactElement {
  return (
    <MainNav>
      <LogoContainer to="/">
        <img src="assets/logo/logo_transparent.png" alt="site-logo" />
      </LogoContainer>
      <div>date info</div>
      <div>acc info</div>
    </MainNav>
  );
}
