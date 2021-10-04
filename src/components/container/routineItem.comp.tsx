import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  calculateCompletion,
  calculateStreak,
  scheduleToString,
} from "../../util/validation";
import { IconButton } from "./common.styles";
import { RoutineItemContainer } from "./routineItem.styles";

interface Props {
  routine: any;
}

const RoutineItem = ({ routine }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <RoutineItemContainer>
      <div>{routine.name}</div>
      <div>{scheduleToString(routine.schedule)}</div>
      <div>
        <span>
          Highest Streak:{" "}
          {
            calculateStreak(
              routine.records,
              routine.schedule,
              routine.startdate
            ).maxStreak
          }
        </span>{" "}
        <span>
          Completion:{" "}
          {calculateCompletion(
            routine.records,
            routine.schedule,
            routine.startdate
          ) * 100}{" "}
          %
        </span>{" "}
        <div>
          <NavLink to={`/light/${routine.id}`}>
            <img src="assets/icon/light.svg" alt="lightgraph button" />
          </NavLink>
          <NavLink to={`/stats/${routine.id}`}>
            <img src="assets/icon/stats.svg" alt="stats button" />
          </NavLink>
          <IconButton onClick={handleClick}>
            <img src="assets/icon/vert.svg" alt="stats button" />
          </IconButton>
        </div>
        <Menu
          id="menu"
          aria-labelledby="menu-list"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>
            <IconButton>
              <img src="assets/icon/edit.svg" alt="edit button" />
              <span>Edit</span>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton>
              <img src="assets/icon/delete.svg" alt="delete button" />
              <span>Delete</span>
            </IconButton>
          </MenuItem>
        </Menu>
      </div>
    </RoutineItemContainer>
  );
};

export default RoutineItem;
