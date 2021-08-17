import { ReactElement } from "react";
import { MainNav } from "./nav.styles";

interface Props {}

export default function Nav({}: Props): ReactElement {
  return (
    <MainNav>
      <div>logo</div>
      <div>date info</div>
      <div>acc info</div>
    </MainNav>
  );
}
