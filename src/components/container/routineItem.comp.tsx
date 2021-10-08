import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  calculateCompletion,
  calculateStreak,
  scheduleToString,
} from "../../util/validation";
import { IconButton } from "./common.styles";
import {
  ActionContainer,
  Bar,
  ItemHeader,
  ItemSubInfo,
  LightBar,
  MoreButton,
  RoutineItemContainer,
  StatsContainer,
  StatsInfo,
} from "./routineItem.styles";

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
      <div>
        <LightBar />
        <ItemHeader>{routine.name}</ItemHeader>
        <ItemSubInfo>{scheduleToString(routine.schedule)}</ItemSubInfo>
        <StatsContainer>
          <Bar />
          <div>
            <StatsInfo>
              Highest Streak:{" "}
              {
                calculateStreak(
                  routine.records,
                  routine.schedule,
                  routine.startdate
                ).maxStreak
              }
            </StatsInfo>{" "}
            <StatsInfo>
              Completion:{" "}
              {(
                calculateCompletion(
                  routine.records,
                  routine.schedule,
                  routine.startdate
                ) * 100
              ).toFixed(2)}{" "}
              %
            </StatsInfo>
          </div>
        </StatsContainer>
      </div>
      <ActionContainer>
        <Tooltip title="Light graph" arrow>
          <NavLink to={`/light/${routine.id}`}>
            <img src="assets/icon/light.svg" alt="lightgraph button" />
          </NavLink>
        </Tooltip>
        <Tooltip title="View Stats" arrow>
          <NavLink to={`/stats/${routine.id}`}>
            <img src="assets/icon/stats.svg" alt="stats button" />
          </NavLink>
        </Tooltip>
        <MoreButton onClick={handleClick}>
          <img src="assets/icon/vert.svg" alt="more button" />
        </MoreButton>
        <Menu
          id="menu"
          aria-labelledby="menu-list"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
      </ActionContainer>
    </RoutineItemContainer>
  );
};

export default RoutineItem;
