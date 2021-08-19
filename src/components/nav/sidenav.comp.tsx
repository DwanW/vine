import { Link } from "react-router-dom";
import { SideNavContainer } from "./sidenav.styles";

interface Props {}

const SideNav = (props: Props) => {
  return (
    <SideNavContainer>
      <ul>
        <li>
          <Link to="/">Today</Link>
        </li>
        <li>
          <Link to="/routine">Routine</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
      </ul>
    </SideNavContainer>
  );
};

export default SideNav;
