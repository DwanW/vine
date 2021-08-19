import { Link } from "react-router-dom";
import { SideNavContainer, NavList,NavListItem } from "./sidenav.styles";

interface Props {}

const SideNav = (props: Props) => {
  return (
    <SideNavContainer>
      <NavList>
        <NavListItem>
          <Link to="/">Today</Link>
        </NavListItem>
        <NavListItem>
          <Link to="/routine">Routine</Link>
        </NavListItem>
        <NavListItem>
          <Link to="/setting">Setting</Link>
        </NavListItem>
      </NavList>
    </SideNavContainer>
  );
};

export default SideNav;
